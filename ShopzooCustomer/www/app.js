var custApp = angular.module('custApp',['ngRoute','ngMaterial']);

custApp.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('red');
});
    
custApp.config(function ($routeProvider) {
    
   $routeProvider
   
   .when('/',{
       templateUrl : 'pages/login.html',
       controller : 'defaultController'
   })
   
   .when('/login',{
       templateUrl : 'pages/login.html',
       controller : 'loginController'
   })
   
   .when('/signup',{
       templateUrl : 'pages/signup.html',
       controller : 'signupController'
   })
   
   .when('/fetchlocation',{
       templateUrl : 'pages/fetchlocation.html',
       controller : 'fetchlocationController'
   })
   
});

custApp.controller('defaultController',['$scope', '$location', '$log', function($scope, $location, $log){
    $scope.name = 'default';
    if($scope.islogedin)
        $location.path('/fetchlocation');
    else
        $location.path('/login')
}]);


custApp.controller('loginController',['$scope', '$log', function($scope, $log){
    $scope.name = 'login';
}]);

custApp.controller('signupController',['$scope', '$log', function($scope, $log){
    $scope.name = 'signup';
}]);

custApp.controller('fetchlocationController',['$scope', '$log', function($scope, $log){
    $scope.name = 'fetchlocation';
}]);

var Address = function (latitude, longitude, houseno, appartmane_name, street, city, state, landmark, pin){
    this.Latitude = latitude;
    this.Longitude = longitude;
    this.House_No = houseno;
    this.Appartment_Name = appartmane_name;
    this.State = state;
    this.Street = street;
    this.City = city;
    this.Landmark = landmark;
    this.PIN = pin;
};

var Customer = function(firstname, lastname, address, email, password, contact){
    this.Name = firstname+ " " + lastname;
    this.Address = address;
    this.Email = email;
    this.Password = password;
    this.Mobile = contact;
};

function signupCustomer(){
	var obj = new Customer();
	obj.Name = document.getElementById("first").value+" "+document.getElementById("last").value;
	obj.Mobile = document.getElementById("phone").value;
	obj.Email = document.getElementById("email").value;
	obj.Password = CryptoJS.SHA256(document.getElementById("pass").value);
	console.log(obj);	
    document.addEventListener("apiReady", function(){
        window.df.apis.dfmongo.createRecords({"table_name":"Customer", "body":obj}, function(response) {
            conslole.log(JSON.stringify(response));
        }, function(response) {
            console.log(window.app.getErrorString(response));
        });
    }, false);
}

function loginCustomer(){
    var loginid = document.getElementById('email').value;
    var passwd = CryptoJS.SHA256(document.getElementById('pass').value);
    document.addEventListener("apiReady", function(){
        window.df.apis.dfmongo.getRecordsByFilter({"table_name":"Customer", "filter":"Email = "+loginid}, function(response) {
            console.log(JSON.stringify(response));
        }, function(response) {
            console.log(window.app.getErrorString(response));
        });
    }, false);
}


//    document.getElementById("try-now-get").setAttribute("style", "display:block");
//    document.getElementById("get-results").innerHTML = "API Loaded";
//    document.getElementById("try-now-post").setAttribute("style", "display:block");
  //  document.getElementById("post-results").innerHTML = "API Loaded";
  /*  document.getElementById("try-now-delete").setAttribute("style", "display:block");
    document.getElementById("delete-results").innerHTML = "API Loaded";
    document.getElementById("try-now-update").setAttribute("style", "display:block");
    document.getElementById("update-results").innerHTML = "API Loaded";
*/
/*
    window.app.getTables = function () {
        window.df.apis.dfmongo.getTables(function (response) {
            //Here is your resource list

        });
    };*/
//get records from a table?  easy.  Just pass the path variable table_name
//A path variable simply gets tacked on to the endpoint, not as a query param.
/*    window.app.getTodos = function () {
        var obj,i=0;
     
        window.df.apis.dfmongo.getRecords({table_name: "Products"}, function (response) {
            //Do something with the data;
            var str=null;
            str+="<table><tr><th>Title</th><th>Company</th><th>Cost</th></tr>";
            for(var i in response.record)
                str+= "<tr><td>"+response.record[i].Title+"</td><td>"+response.record[i].Company+"</td><td>"+JSON.stringify(response.record[i].Cost)+"</td></tr>";
            str+="</table>";
            document.getElementById("get-results").innerHTML=str;
        }, function(response) {
            document.getElementById("get-results").innerHTML = window.app.getErrorString(response);
        });
    document.getElementById("get-results").innerHTML = "</table>";      
    };
//Insert a record
    window.app.addTodo = function () {
        var item = {"record":[{"name":"New Item","complete":false}]};
        window.df.apis.dfmongo.createRecords({"table_name":"Products", "body":item}, function(response) {
            document.getElementById("post-results").innerHTML = JSON.stringify(response);
        }, function(response) {
            document.getElementById("post-results").innerHTML = window.app.getErrorString(response);
        });
    };/*
//Delete a record
    window.app.deleteTodo = function () {
        var id= document.getElementById("delete-id").value;
        window.df.apis.dfmongo.deleteRecords({"table_name":"Products", "ids":id}, function(response) {
            document.getElementById("delete-results").innerHTML = JSON.stringify(response);
        }, function(response) {
            document.getElementById("delete-results").innerHTML = window.app.getErrorString(response);
        });
    };
//Update a record
    window.app.updateTodo = function () {
        var id= document.getElementById("update-id").value;
        var complete = true;
        var item = {"record":[{"id":id,"complete":complete}]};
        df.apis.dfmongo.updateRecords({"table_name":"Products", "body":item}, function(response) {
            document.getElementById("update-results").innerHTML = JSON.stringify(response);
        }, function(response) {
            document.getElementById("update-results").innerHTML = window.app.getErrorString(response);
        });
    };
    window.app.getErrorString = function(response){
        var msg = "An error occurred, but the server provided no additional information.";
        if (response.content && response.content.data && response.content.data.error) {
            msg = response.content.data.error[0].message;
        }
        msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
        return msg;
    };*/


