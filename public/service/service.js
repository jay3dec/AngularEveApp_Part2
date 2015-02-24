angular.module('myAppService',[]).service('CommonProp', function() {
    var user = '';
    var userAuth = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        },
	getUserAuth: function() {
            return userAuth;
        },
        setUserAuth: function(value) {
            userAuth = value;
        }
    };
});
