
/*
This methode is for the click on the favourite
*/
var saved = false;
function favClicked(btn) {
   var property = document.getElementById(btn);
   if (saved == true) {
      property.style.color = "#FFFFFF"
      saved = false;
   }
   else {
      property.style.color = "yellow"
      saved = true;
   }
}


/**
 * this Methode for the click on the Filter
 */
var clicked = false;
function clickFilter() {
   var property = document.getElementById("listFilter");

   if (clicked == true) {
      property.style.display = "block";
      clicked = false;
   }
   else {
      property.style.display = "none";
      clicked = true;
   }
}


function page() {
   location.href = "home.html";

}

