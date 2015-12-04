"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("StatisticsController", StatisticsController);

    function StatisticsController($cookies, $location, OrderService) {
        var model = this;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null || currentUser.group.indexOf('admin') == -1) {
            $location.url('/login');
            return;
        }
        model.updateTimeRange = updateTimeRange;
        model.replaceSpace = replaceSpace;

        var defaultTimeRange = {};
        var defaultEndTime = new Date();
        var defaultStartTime = new Date();

        defaultEndTime.setDate(defaultEndTime.getDate() + 1);
        defaultStartTime.setMonth(defaultStartTime.getMonth() - 5);
        defaultStartTime.setDate(1);

        defaultTimeRange.startTime = defaultStartTime;
        defaultTimeRange.endTime = defaultEndTime;

        OrderService.findOrderInTimeRange(defaultTimeRange).then(function(orders) {
            console.log(orders);
            initData(orders);
        });

        function initData(orders) {
            var monthAndTotalSold = {};
            var bookAndSold = {};
            var authorAndSold = {};
            var buyerAndBought = {};


            for (var i = 0; i < orders.length; i++) {
                // Processing data for graph
                var time = new Date(orders[i].time);
                var timeStr = time.getFullYear().toString() + "-" + time.getMonth().toString();
                if (monthAndTotalSold[timeStr] == null) monthAndTotalSold[timeStr] = 0;
                monthAndTotalSold[timeStr] = monthAndTotalSold[timeStr] + Number(orders[i].totalPrice);

                // Processing data for best buyer
                var user = orders[i].user;
                if (buyerAndBought[user._id] == null) {
                    buyerAndBought[user._id] = {
                        username: user.username,
                        bought: 0
                    }
                }
                buyerAndBought[user._id].bought = Number(buyerAndBought[user._id].bought) + Number(orders[i].totalPrice);

                var books = orders[i].books;
                for (var j = 0; j < books.length; j++) {

                    // Processing data for best book seller
                    var book = books[j].book;
                    if (bookAndSold[book._id] == null) {
                        bookAndSold[book._id] = {
                            title: book.title,
                            number : 0
                        };
                    }
                    bookAndSold[book._id].number = bookAndSold[book._id].number + books[j].quantity;

                    // Processing data for best author
                    var authors = book.author;
                    for (var k = 0; k < authors.length; k++) {
                        if (authorAndSold[authors[k]] == null) authorAndSold[authors[k]] = 0;
                        authorAndSold[authors[k]] = authorAndSold[authors[k]] + books[j].quantity;
                    }
                }

            }

            model.bestSeller = getBestSeller(bookAndSold);
            model.bestAuthor = getBestAuthor(authorAndSold);
            model.bestBuyer = getBestBuyer(buyerAndBought);
            drawGraphWithData(monthAndTotalSold);
        }

        function getBestSeller(bookAndSold) {
            var bestSeller = { number: 0 };
            for (var obj in bookAndSold) {
                if (bookAndSold[obj].number > bestSeller.number) {
                    bestSeller._id = obj;
                    bestSeller.title = bookAndSold[obj].title;
                    bestSeller.number = bookAndSold[obj].number;
                }
            }
            return bestSeller;
        }

        function getBestAuthor(authorAndSold) {
            var bestAuthor = "";
            var bookNumber = 0;
            for (var obj in authorAndSold) {
                if (authorAndSold[obj] > bookNumber) {
                    bestAuthor = obj;
                    bookNumber = authorAndSold[obj].bought;
                }
            }
            return bestAuthor;
        }

        function getBestBuyer(buyerAndBought) {
            console.log(buyerAndBought);
            var bestBuyer = "";
            var boughtPrice = 0;
            for (var obj in buyerAndBought) {
                if (buyerAndBought[obj].bought > boughtPrice) {
                    bestBuyer = buyerAndBought[obj].username;
                    boughtPrice = buyerAndBought[obj].bought;
                }
            }
            return bestBuyer;
        }

        function drawGraphWithData(monthAndTotalSold) {
            var dataSource = [];
            for (var obj in monthAndTotalSold) {
                var month = obj.split("-")[1];
                var year = obj.split("-")[0];
                var lineItem = [];
                var xAxis = {v: new Date(Number(year), Number(month)), f: obj};
                var yAxis = truncToTwoBits(monthAndTotalSold[obj]);
                lineItem.push(xAxis);
                lineItem.push(yAxis);
                dataSource.push(lineItem);
            }
            drawBasic(dataSource);
        }

        function drawBasic(dataSource) {
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Months');
            data.addColumn('number', 'Sales Amount');

            data.addRows(dataSource);

            var options = {
                width: 800,
                height: 500,
                title: 'Selling statistics',
                hAxis: {
                    title: 'Month',
                    format: 'yyyy/M'
                },
                vAxis: {
                    title: 'Sales Volume ($)'
                }
            };

            var chart = new google.visualization.ColumnChart(
                document.getElementById('statisCanvas'));
            chart.draw(data, options);
        }

        function updateTimeRange() {
            model.endTime.setMonth(model.endTime.getMonth() + 1);
            var timeRange = {};
            timeRange.startTime = model.startTime;
            timeRange.endTime = model.endTime;
            OrderService.findOrderInTimeRange(timeRange).then(function(orders) {
                initData(orders);
            })
        }

        function truncToTwoBits(number) {
            return Math.floor(number * 100) / 100
        }

        function replaceSpace(str) {
            return str.replace(" ", "%20");
        }
    }

})();
