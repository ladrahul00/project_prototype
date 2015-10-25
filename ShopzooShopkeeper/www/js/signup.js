function signupCustomer(){
	var obj = Object.create(null);
	obj.Name = document.getElementById("first").value+" "+document.getElementById("last").value;
	obj.Mobile = document.getElementById("phone").value;
	obj.Email = document.getElementById("email").value;
	obj.Password = document.getElementById("pass").value;
	console.log(obj);	
}