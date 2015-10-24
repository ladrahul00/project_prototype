window.app = {};
document.addEventListener("apiReady", function(){
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
    window.app.getTodos = function () {
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
    };*/
    window.app.getErrorString = function(response){
        var msg = "An error occurred, but the server provided no additional information.";
        if (response.content && response.content.data && response.content.data.error) {
            msg = response.content.data.error[0].message;
        }
        msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
        return msg;
    };
}, false);


