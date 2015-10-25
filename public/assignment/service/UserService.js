(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {username: "Tom", password: "123456", id: 1},
            {username: "Mike", password: "123456", id: 2},
            {username: "Jack", password: "654321", id: 3},
            {username: "Tom", password: "234567", id: 4},
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,

        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var user in users) {
                if (user.username === username && user.password === password)
                    callback(user);
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user.id = createGuid();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0, len = users.length; i < len; i++) {
                if (users[i].id === userId) users.splice(i, 1);
            }
            callback(users);
        }

        function updateUsers(userId, userInfo, callback) {
            for (var user in users) {
                if (user.id === userId) {
                    user.username = userInfo.username;
                    user.password = userInfo.password;
                    callback(user);
                }
            }
        }

        // Reference to http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
        function createGuid()
        {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    }
})();