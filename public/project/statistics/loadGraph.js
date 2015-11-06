drawBasic();

function drawBasic() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Months');
    data.addColumn('number', 'Sales Amount');

    data.addRows([
        [{v: new Date(2015, 4, 1), f: 'April 2015'}, 50351],
        [{v: new Date(2015, 5, 2), f: 'May 2015'}, 45812],
        [{v: new Date(2015, 6, 3), f:'June 2015'}, 30015],
        [{v: new Date(2015, 7), f: 'July 2015'}, 14652],
        [{v: new Date(2015, 8), f: 'August 2015'}, 35510],
        [{v: new Date(2015, 9), f: 'September 2015'}, 91500],
    ]);

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