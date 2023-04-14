// function showSnackbar(text, seconds)
// {
// 	console.log("in showSnackbar with seconds ",seconds);
// 	var snackBar = document.getElementById("snackbar");
// 	snackBar.innerHTML = text;

// 	// Add the "show" class to DIV
// 	snackBar.className = "show";
// 	snackBar.style.display = "block";

// 	if (seconds == null) seconds = 3;

// 	// After 3 seconds, remove the show class from DIV
// 	// setTimeout(function(){ x.className = x.className.replace("show", ""); x.style.display="none" }, seconds*1000);
// 	setTimeout(function(){console.log("in setTimeout");snackBar.innerHTML = ""; snackBar.style.display="none";snackBar.className=""; }, seconds*1000);

// }