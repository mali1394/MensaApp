
// Function to check Whether both passwords 
// is same or not. 

let mensaID;

// function chosenMensa() {

//  let x = document.getElementById("choseMensa").selectedIndex;
//    mensaID = document.getElementsByTagName("option")[x].value;
//    console.log(mensaID);
//    document.getElementById("menu").style.display = "block";
//    document.getElementById("container1").style.display = "none";
// // to get the current date everytime we change the Mensa
//    month = (d.getMonth() + 1);
//    day = d.getDate();
//    year = d.getFullYear();
   
//     menu();
// }

function getDateAndDay() {
   var date = new Date();
   var findDay = date.getDay();
   var dayNames = new Array("So", "Mo",
      "Di", "Mi", "Do", "Fr", "Sa");
   var day = dayNames[findDay];
   return document.getElementById('showDay').innerHTML = day;
}

let d = new Date();
let month = (d.getMonth() + 1);
let day = d.getDate();
let year = d.getFullYear();


function next() {
   day++;
   month;
   var daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
   if (daysInMonth < day) {
      day = 1;
      month++;
      if (month > 11) {
         month = 1;
         year++;
      }
   }
   console.log([year, month, day].join('-'));

}

function previous() {
   day--;
   if (day < 1) {
      month--;
      var daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
      day = daysInMonth;
      if (month < 1) {
         month = 12;
         year--;
      }
   }
   console.log([year, month, day].join('-'));
}

function dateToday() {

   if (month.length < 2) {
      month = '0' + month;
   }

   if (day.length < 2) {
      day = '0' + day;
   }

   return document.getElementById('showDay').innerHTML = getDateAndDay()
      + ", " + [year, month, day].join('-');
}



/*
it going to use the GPS to locate our position
@Quell : https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
*/

//Not finished Yet
function getLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
   }
}

function showPosition(position) {
   var locat = document.getElementById("entfernung").value;
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   if (locat != "") {

      fetch('https://openmensa.org/api/v2/canteens?near[lat]=' + latitude + '&near[lng]=' + longitude + '&near[dist]=' + locat)
         .then((response) => response.json())
         .then(function (data) {
            for (var i = 0; i < data.length; i++) {
               let option = document.createElement("option");
               // its going to write the Id name
               option.setAttribute("value", `${data[i].id}`);
               option.setAttribute("class", "mensaListNames");
               var city = `${data[i].city}`;
               option.innerHTML = `${data[i].name}`;
               if (city == "Berlin") {
                  var h = document.getElementById('choseMensa').appendChild(option);
                  console.log(h);
               }
            }
         });
   } else {
      nameMensa();
   }
}

// This function is going to show the name of the Mensa in a ComboBox 
//and its going to name them with there Id so we can use it later when 
//want to see its food Menu
function nameMensa() {
   fetch('https://openmensa.org/api/v2/canteens/')
      .then((response) => response.json())
      .then(function (data) {
         for (var i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            // its going to write the Id name
            option.setAttribute("Value", `${data[i].id}`);
            option.setAttribute("class", "mensaListNames");
            option.setAttribute("title", `${data[i].name}` );
            var city = `${data[i].city}`;
            option.innerHTML = `${data[i].name}`;
            if (city == "Berlin") {
               document.getElementById('choseMensa').appendChild(option);
               //   console.log(option);
            }
         }
      });
}



function createList(essen) {

   var essenType = document.createElement("div");

   essenType.setAttribute("id", "essenType");
   essenType.setAttribute("class", "essenType col-xs-12");
   essenType.innerHTML = essen;
   document.getElementById(essen + "-Liste").appendChild(essenType);

}

let counter_essen = 0;
let counter_Aktion = 0;
let counter_dessert = 0;
let counter_Beilagen = 0;
let counter_suppen = 0;
let counter_salat = 0;

//its going to filter the type of food 
function menuList(data) {

   if (`${data[i].category}` == "Essen") {
      if (counter_essen == 0) {
         createList("Essen")
         counter_essen++;
      
      categoryList("Essen-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   } else if (`${data[i].category}` == "Aktionen") {
      if (counter_Aktion == 0) {
         createList("Aktionen")
         counter_Aktion++;
      }
      categoryList("Aktionen-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   } else if (`${data[i].category}` == "Salate") {
      if (counter_salat == 0) {
         createList("Salate")
         counter_salat++;
      }
      categoryList("Salate-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   } else if (`${data[i].category}` == "Beilagen") {
      if (counter_Beilagen == 0) {
         createList("Beilagen")
         counter_Beilagen++;
      }
      categoryList("Beilagen-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   } else if (`${data[i].category}` == "Desserts") {
      if (counter_dessert == 0) {
         createList("Desserts")
         counter_dessert++;
      }
      categoryList("Desserts-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   } else if (`${data[i].category}` == "Suppen") {
      if (counter_suppen == 0) {
         createList("Suppen")
         counter_suppen++;
      }
      categoryList("Suppen-Liste", `${data[i].notes}`, `${data[i].name}`, `${data[i].prices["students"]}`);
   }
}


/**
 * we are going to fetch the link and get the data 
 */
let i;
function menu() {

   var test = mensaID;
   console.log(mensaID);
   dateToday();
   fetch('https://openmensa.org/api/v2/canteens/' + mensaID + '/days/' + year + '-' + month + '-' + day + '/meals')
      .then((response) => response.json())
      .then(function (data) {
         $(".bigRows").remove();
         for (i = 0; i < data.length; i++) {
            menuList(data);
         }
      });
}

//this should be saved in DB and we when we change the status 
//then it should be changed from the DB
function getStatus() {
   if (document.getElementById("student").checked) {
      var status = document.getElementById("student").value;
      return status;
   } else if (document.getElementById("employee").checked) {
      var status = document.getElementById("employee").value;
      return status;
   } else if (document.getElementById("pupils").checked) {
      var status = document.getElementById("pupils").value;
      return status;
   } else if (document.getElementById("others").checked) {
      var status = document.getElementById("others").value;
      return status;
   }
}


/*
this methode is going  to show us the 
Menu in the Monitor and its going to make tags for the menu 
*/
function categoryList(category, notes, name, price) {
   //  create Tags with name div
   var div = document.createElement("div");
   var div_2 = document.createElement("div");
   var div_firstRow = document.createElement("div");
   //  naming the id
   div.setAttribute("id", "r" + i);
   div.setAttribute("class", "organise row space bigRows r" + i);
   div_2.setAttribute("id", "foodName r" + i);
   div_2.setAttribute("class", "foodName nameAndIcon col-xs-12");
   div_2.innerHTML = name;
   div_firstRow.setAttribute("class", "row name-and-icon col-xs-10");
   div_firstRow.setAttribute("id", "row" + i);
   document.getElementById(category).appendChild(div);
   document.getElementById("r" + i).appendChild(div_firstRow);
   document.getElementById("row" + i).appendChild(div_2);

   // favourate function
   favourite();

   getFilter(notes);

   pruefenIcon(notes);
   // getPrices function
   getPrices(price);
}

/*
 This Method is goin to get the Icons and print them in the body
*/
function getIcons(notes, bild) {


   let div = document.createElement("div"),
      img = document.createElement("img");
   div.setAttribute("class", "Icons col-xs-1");
   //    img.setAttribute("id", " r" + i);
   img.setAttribute("class", "ampel nameAndIcon organise ");
   img.src = "/Icons/" + bild + ".png";
   //   document.getElementsById("r"+i).appendChild(div);
   document.getElementById("row" + i).appendChild(img);



}

/* 
In this Method we are going to check if the notes
 have a photo or not and .
*/
function pruefenIcon(notes) {
   var split = notes.split(",");
   let iconsArray = new Array(8);
   for (var i = 0; i < split.length; i++) {
      var bild = split[i];
      if (bild == "grün (Ampel)") {
         bild = "grün (Ampel)";
         getIcons(notes, bild);
      } else if (bild == "gelb (Ampel)") {
         bild = "gelb (Ampel)";
         getIcons(notes, bild);
      } else if (bild == "rot (Ampel)") {
         bild = "rot (Ampel)";
         getIcons(notes, bild);
      } else if (bild == "Klimaessen") {
         bild = "Klimaessen";
         getIcons(notes, bild);
      } else if (bild == "vegan") {
         bild = "vegan";
         getIcons(notes, bild);
      } else if (bild == "Fisch") {
         bild = "Fisch";
         getIcons(notes, bild);
      } else if (bild == "vegetarisch") {
         bild = "vegetarisch";
         getIcons(notes, bild);
      }


   }

}

function getFilter(notes) {
   var split = notes.split(",");
   let iconsArray = new Array(9);
   let span = document.createElement("span");

   for (var counter2 = 0; counter2 < split.length; counter2++) {
      var bild = split[counter2];
      if (bild != "bio" && bild != "grün (Ampel)" && bild != "gelb (Ampel)" && bild != "rot (Ampel)" && bild != "vegetarisch"
         && bild != "Klimaessen" && bild != "MSC" && bild != "vegan") {
         // console.log(bild);
         var getf = document.getElementById(bild).value;
         iconsArray[counter2] = getf;


      }
   }
   var ohneSpace = iconsArray.filter(function (el) {
      return el != null;
   });
   if (ohneSpace != "") {
      span.setAttribute("class", "col-xs-12");
      span.setAttribute("id", "numType" + i);
      span.setAttribute("title", ohneSpace.join(','));
      span.innerHTML = "(" + ohneSpace.join(',') + ")";
   } else {
      span.setAttribute("class", "col-xs-12");
      span.setAttribute("id", "numType" + i);
      span.setAttribute("title", "empty");
   }
   document.getElementById("row" + i).appendChild(span);

}

/*
this method is going to filter the food when check a boxes or 
uncheck them 
*/
function checkedBox(box) {
   var boxId = box.id;
   var checkBox = document.getElementById(boxId);
   if (checkBox.checked == true) {
      for (var counter = 0; counter < i; counter++) {
         //its the whole big row
         var speiseRow = document.getElementById("r" + counter);
         //its the numberTypes Row inside the big row
         var numType = document.getElementById("numType" + counter).title;
         //its going to split so we can find the number that we need
         var splitNumType = numType.split(",");
         if (splitNumType != "null") {
            for (var counter2 = 0; counter2 < splitNumType.length; counter2++) {
               if (box.value == splitNumType[counter2]) {
                  speiseRow.style.display = "none";
               }

            }
         }
      }
   } else {
      // es gibt noch ein Problem 
      for (var counter = 0; counter < i; counter++) {
         var speiseRow = document.getElementById("r" + counter);
         var numType = document.getElementById("numType" + counter).title;
         //its going to split so we can find the number that we need
         var splitNumType = numType.split(",");
         //if its null then it will ignore it 
         if (splitNumType != "null") {
            for (var counter2 = 0; counter2 < splitNumType.length; counter2++) {
               //its going to check if the unchecked box is equal to the number in row 
               if (box.value == splitNumType[counter2]) {
                  //its going to show the food 
                  speiseRow.style.display = "block";
                  //its going to check if there is any checked boxes 
                  //if there is any checked boxes then its going to keep the food hidden
                  for (var counter3 = 0; counter3 < splitNumType.length; counter3++) {
                     var input = document.getElementsByTagName("input");
                     for (var count = 0; count < input.length; count++) {
                        if (input[count].value == splitNumType[counter3]) {
                           if (input[count].checked) {
                              speiseRow.style.display = "none";
                           }
                        }

                     }
                  }
               }
            }
         }
      }
   }
}



// function getFoodIcon(name) {
//    var img = document.createElement("img");
//    img.src = "/Icons/" + name + ".jpg";
//    img.setAttribute("id", "r" + i);
//    img.setAttribute("alt", "");
//    img.setAttribute("class", "organise foodIcon img-rounded col-xs-2");
//    document.getElementById("r" + i).appendChild(img);
// }


/*
this methode is going to show us the prices
*/
function getPrices(price) {
   var list = ["students", "employees", "pupils", "others"]
   var div = document.createElement("div"),
      span_Student = document.createElement("span"),
      span_Employee = document.createElement("span"),
      span_Pupils = document.createElement("span"),
      span_Others = document.createElement("span");

   div.setAttribute("id", "prices");
   div.setAttribute("class", "organise");

   span_Student.setAttribute("id", "students");
   span_Student.setAttribute("class", "favAndPrice col-xs-12");

   if (price == "null") {
      span_Student.innerHTML = "";
   } else {
      var addZero = price.split(".");
      var withZero = 0;
      for (var counter = 0; counter < 10; counter++) {
         var nachKomma = addZero[1];
         if (counter == nachKomma) {
            withZero = price + "0";
            span_Student.innerHTML = withZero + "€";
            break;
         } else {
            withZero = price;
         }

      }
      span_Student.innerHTML = withZero + "€";
      span_Student.style.color = "black";
   }
   // span_Employee.setAttribute("id", "employees");
   // span_Pupils.setAttribute("id", "pupils");
   // span_Others.setAttribute("id", "others");
   document.getElementById("fav" + i).appendChild(span_Student);
   for (var counter = 0; counter < list.length; counter++) {
      //  console.log(d);
   }


}

/*
This methode is going to show us the star for the favourtie
*/
function favourite() {
   var div = document.createElement("div"),
      div_fav_Price = document.createElement("div");

   div_fav_Price.setAttribute("id", "fav" + i);
   div_fav_Price.setAttribute("class", "row fav_and_price col-xs-2");
   div.setAttribute("class", "fav organise favAndPrice col-xs-12");
   div.setAttribute("id", "fav r" + i);
   div.setAttribute("onClick", "favClicked('fav r" + i + "','#101010')");
   div.innerHTML = "★";
   document.getElementById("r" + i).appendChild(div_fav_Price);
   document.getElementById("fav" + i).appendChild(div);

}




//JQuery Methods
$(document).ready(function () {
   $(".btn-next-previous").click(function() {
      $.get('https://openmensa.org/api/v2/canteens/' + mensaID + '/days/' + year + '-' + month + '-' + day + '/meals', function (data) {


         $(".bigRows").remove();
         $(".essenType").remove();
         dateToday();
         counter_essen = 0;
         counter_Aktion = 0;
         counter_dessert = 0;
         counter_Beilagen = 0;
         counter_suppen = 0;
         counter_salat = 0;
         for (i = 0; i < data.length; i++) {
            menuList(data);
         }
      });

   });

   /**
    * This methode is going to show the Mensa list after 
    * writing the distance number in KM and clicking on Select
    */
   $('.selectBtn').click(function () {
      var entfernung = document.getElementById('entfernung').value;
      $(".mensaListNames").remove();
      if (entfernung == "") {
         nameMensa();
      } else {
         getLocation();
      }
   });
   //when we click on ok 
   $('.logbtn').click(function(){
      let x = document.getElementById("choseMensa").selectedIndex;
      mensaID = document.getElementsByTagName("option")[x].value;
      console.log(mensaID);
      document.getElementById("menu").style.display = "block";
      document.getElementById("container1").style.display = "none";
   // to get the current date everytime we change the Mensa
      month = (d.getMonth() + 1);
      day = d.getDate();
      year = d.getFullYear();
      
      var name= document.getElementsByTagName("option")[x].title;
      document.getElementById("title").innerHTML= name ;
      menu();
   });
});





