localStorage.clear();
   var symbl="";
   var data="";
   var stock="";
   var uid, uemail,profilename;
var firebaseConfig = {
    apiKey: "AIzaSyC5CoVicRRoR1PVdqrZ1gyzF8Frl-LEyl8",
    authDomain: "interestment-abd1e.firebaseapp.com",
    projectId: "interestment-abd1e",
    storageBucket: "interestment-abd1e.appspot.com",
    messagingSenderId: "556429394380",
    appId: "1:556429394380:web:7eeb865e358bc000d5dd69",
    measurementId: "G-3B8GY1B70Y"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("name").value;
    var userEmail = document.getElementById("uemail").value;
    var userPassword = document.getElementById("upassword").value;
    var confirmPassword = document.getElementById("cpassword").value;
    if(confirmPassword!=userPassword){
        window.alert("Password didn't match");
    }
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
            var user = firebase.auth().currentUser;
            if (user != null) {
                uid = user.uid;
                uemail=user.email;
                proflename = userFullName;
            }
            const db = firebase.firestore();
            db.collection("user").doc().set({
                userFullName: userFullName,
                userEmail: userEmail,
                userPassword: userPassword,
                userid: uid
            });
            swal({
                title: "Success",
                text: "Registration Successful",
                type: "success"
            })
            setTimeout(function(){
                window.location.replace("home.html");
            }, 3000)
        })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorMessage);
            });
    }
}
function checkUserSIPassword(){
      var userSIPassword = document.getElementById("password");
      var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
      var flag;
      if(userSIPassword.value.match(userSIPasswordFormate)){
          flag = false;
      }else{
          flag = true;
      }    
      if(flag){
          window.alert("Incorrect password")
      }else{
          
      }
  }
  function checkUserSIEmail(){
      var userSIEmail = document.getElementById("userSIEmail");
      var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var flag;
      if(userSIEmail.value.match(userSIEmailFormate)){
          flag = false;
      }else{
          flag = true;
      }
      if(flag){
          document.getElementById("userSIEmailError").style.display = "block";
      }else{
          document.getElementById("userSIEmailError").style.display = "none";
      }
  }
  function login(){
      var userSIEmail = document.getElementById("email").value;
      var userSIPassword = document.getElementById("password").value;
      var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;      

      var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
      var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);
      if(checkUserEmailValid == null){
          return checkUserSIEmail();
      }else if(checkUserPasswordValid == null){
          return checkUserSIPassword();
      }else{
          firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword)
          .then((success) => {
            swal({
                title: "Welcome",
                text: "Welcome back",
                type: "success"
            })
            let user = firebase.auth().currentUser;
                    if(user != null){
                        uid = user.uid;
                    }
                    console.log(uid);
                  setTimeout(function(){
                      window.location.replace("home.html");
                  }, 1000)

              })
          .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              window.alert(errorMessage);
              swal({
                  title: "Error",
                  text: "Error",
                  type: "error"
              })
          });
      }
  }
  firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
      //   User is signed in.
          let user = firebase.auth().currentUser;
          let uid
          if(user != null){
              uid = user.uid;
          }
        //   let firebaseRefKey = firebase.database().ref().child(uid);
        //   firebaseRefKey.on('value', (dataSnapShot)=>{
        //       document.getElementById("user").innerHTML = "Hello";
        //       //document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
        //       // userEmail = dataSnapShot.val().userEmail;
        //       // userPassword = dataSnapShot.val().userPassword;
        //   })
      } else {
      //   No user is signed in.
      }
  });
   // Thanks to http://www.alphavantage.co/

    /*
    Remember to upate the API key field with your key
    Get your key here: https://www.alphavantage.co/support/#api-key
    'Demo' API Key works only for exact copies of the demos in the documentation
    */


   const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';
   // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo


   function getAlphaVantagesymbol() {

     const apiKey = "SUXUZFCXQ49QTM2I";

     const symbol = inpSymbol.value;

     const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + symbol + '&apikey=' + apiKey;

     requestsymbol(url);

   }


   function requestsymbol(url) {

     var obj, dbParam, xmlhttp, myObj, x, txt = "";
     obj = { table: "stock", limit: 20 };
     dbParam = JSON.stringify(obj);
     xmlhttp = new XMLHttpRequest();
     /*xmlhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
         myObj = JSON.parse(this.responseText);
         txt += "<table border='1'>"
         for (x in myObj) {
           txt += "<tr><td>" + myObj[x].open + "</td></tr>";
         }
         txt += "</table>"
         document.getElementById("demo").innerHTML = txt;
       }
     };*/
     xmlhttp.open('GET', url, true);
     xmlhttp.onerror = function (xmlhttp) { console.log('error:', xmlhttp); };
     xmlhttp.onprogress = function (xmlhttp) { console.log('bytes loaded:', xmlhttp.loaded); }; // or something
     xmlhttp.onload = callback;
     xmlhttp.send(null);

     function callback(xmlhttp) {

       let response, json, lines;

       response = xmlhttp.target.response;
       var x = document.getElementById('demo');
       //demo.innerText = response;
   
       json = JSON.parse(response);

       // console.log('json', json);

       // console.log(json["Time Series (Daily)"]);
       var sel = document.getElementById("sel");
       sel.innerHTML="--Select--";
       for (var key in json["bestMatches"]) {
         var val = json["bestMatches"][key];
       //   var option = document.createElement("option");
       //   option.value=val["2. name"];
       //   sel.options.add(option);
       //   sel.appendChild(option);
       
       sel.innerHTML = sel.innerHTML +
               '<option value="' + val["1. symbol"] +" "+ val["2. name"]+ '">' + val["2. name"] +"("+val["4. region"]+")"+ '</option>';
       }
       console.log(sel);
     }

   }
   function getAlphaVantagedata() {
       data= sel.options[sel.selectedIndex].value;
       data=data.split(" ");
       symbl=data[0];
       var demo = document.getElementById("demo");
       demo.innerHTML=" ";

   const apiKey = "5DES6KMEO7Y63JBQ";

   const symbol = symbl;

   const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&interval=1min&apikey=' + apiKey;

   requestFile(url);

   }

   function requestFile(url) {

   var obj, dbParam, xmlhttp, myObj, x, txt = "";
   obj = { table: "stock", limit: 20 };
   dbParam = JSON.stringify(obj);
   xmlhttp = new XMLHttpRequest();
   /*xmlhttp.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
       myObj = JSON.parse(this.responseText);
       txt += "<table border='1'>"
       for (x in myObj) {
       txt += "<tr><td>" + myObj[x].open + "</td></tr>";
       }
       txt += "</table>"
       document.getElementById("demo").innerHTML = txt;
   }
   };*/
   xmlhttp.open('GET', url, true);
   xmlhttp.onerror = function (xmlhttp) { console.log('error:', xmlhttp); };
   xmlhttp.onprogress = function (xmlhttp) { console.log('bytes loaded:', xmlhttp.loaded); }; // or something
   xmlhttp.onload = callback1;
   xmlhttp.send(null);

   function callback1(xmlhttp) {

       let response, json, lines;

       response = xmlhttp.target.response;
       var x = document.getElementById('demo');
       //demo.innerText = response;

       json = JSON.parse(response);

       // console.log('json', json);

       // console.log(json["Time Series (Daily)"]);

       var flag = 0;

       var demo = document.getElementById("demo");

       var trh = document.createElement('tr');
       var th0 = document.createElement('th');
       var th1 = document.createElement('th');
       var th2 = document.createElement('th');
       var th3 = document.createElement('th');
       var th4 = document.createElement('th');
       var th5 = document.createElement('th');

       th0.innerHTML = "Date";
       th1.innerHTML = "Open";
       th2.innerHTML = "High";
       th3.innerHTML = "Low";
       th4.innerHTML = "Close";
       th5.innerHTML = "Volume";

       trh.appendChild(th0);
       trh.appendChild(th1);
       trh.appendChild(th2);
       trh.appendChild(th3);
       trh.appendChild(th4);
       trh.appendChild(th5);
       demo.appendChild(trh);
       
       for (var key in json["Time Series (Daily)"]) {
           var val = json["Time Series (Daily)"][key];

           var tr = document.createElement('tr');
           var td0 = document.createElement('td');
           var td1 = document.createElement('td');
           var td2 = document.createElement('td');
           var td3 = document.createElement('td');
           var td4 = document.createElement('td');
           var td5 = document.createElement('td');

           td0.innerHTML = key;

           td1.innerHTML = val["1. open"];
           td2.innerHTML = val["2. high"];
           td3.innerHTML = val["3. low"];
           td4.innerHTML = val["4. close"];
           td5.innerHTML = val["5. volume"];

           tr.appendChild(td0);
           tr.appendChild(td1);
           tr.appendChild(td2);
           tr.appendChild(td3);
           tr.appendChild(td4);
           tr.appendChild(td5);
           demo.appendChild(tr);


           flag += 1;
           if (flag == 5) {
           break;
           }
       }

       }

   }
    const verify= async function(){
       var check=0;
       const db = firebase.firestore();
    db.collection("watchlist").where("userid", "==", uid).where("symbol","==",symbl)
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        check=check+1;
        })
    });
    return check;

   }
   const save=async function(){
       data= sel.options[sel.selectedIndex].value;
       data=data.split(" ");
       symbl=data[0];
       const db = firebase.firestore();
       db.settings({ timestampsInSnapshots: true });  // to not get errors in console

       for (index = 1; index < data.length; index++) { 
           stock=stock+data[index]+" ";
       }
       var user = firebase.auth().currentUser;
            if (user != null) {
                uid = user.uid;
            }
        var check = await verify();
        if(check===0){
       db.collection("watchlist").doc().set({
           name: stock,
           symbol: symbl,
           userid: uid
       })
    //    var button = document.createElement('button');
    //    button.type = 'button';
    //    button.innerHTML = 'Reset';
    //    button.className = 'btn-styled';
    setTimeout(function(){
        window.location.reload();
    }, 1000)
    }
    else{
        window.alert("Stock Exist in watchlist");
    }

    //    var container = document.getElementById('reset');
    //    container.appendChild(button);
           }
// function dsplywtchlst(){
//     const db = firebase.firestore();
//     var user = firebase.auth().currentUser;
//     if (user != null) {
//         uid = user.uid;
//     }
//     var sbl= new Array();
//     var i=0,sname="";
//     var demo = document.getElementById("demo");

//        var trh = document.createElement('tr');
//        var th0 = document.createElement('th');
//        var th1 = document.createElement('th');
//        var th2 = document.createElement('th');
//        var th3 = document.createElement('th');
//        var th4 = document.createElement('th');
//        var th5 = document.createElement('th');
//        var th6 = document.createElement('th');

//        th0.innerHTML = "Name";
//        th1.innerHTML = "Date";
//        th2.innerHTML = "Open";
//        th3.innerHTML = "High";
//        th4.innerHTML = "Low";
//        th5.innerHTML = "Close";
//        th6.innerHTML = "Volume";

//        trh.appendChild(th0);
//        trh.appendChild(th1);
//        trh.appendChild(th2);
//        trh.appendChild(th3);
//        trh.appendChild(th4);
//        trh.appendChild(th5);
//        trh.appendChild(th6);
//        demo.appendChild(trh);
//        console.log(uid);
//     db.collection("watchlist").where("userid", "==", uid)
//     .get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             sbl[i]=doc.data().symbol;
//             sname=doc.data().name;
//             console.log(sname);
//             getdata(sbl[i],sname);
//             i++;
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });
// }
// function getdata(sbl,sname) {
    

// const apiKey = "SUXUZFCXQ49QTM2I";

// const symbol = sbl;

// const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&interval=1min&apikey=' + apiKey;

// wtchdata(url,sname);

// }

// function wtchdata(url,sname) {

// var obj, dbParam, xmlhttp, myObj, x, txt = "";
// obj = { table: "stock", limit: 20 };
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();
// /*xmlhttp.onreadystatechange = function () {
// if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     txt += "<table border='1'>"
//     for (x in myObj) {
//     txt += "<tr><td>" + myObj[x].open + "</td></tr>";
//     }
//     txt += "</table>"
//     document.getElementById("demo").innerHTML = txt;
// }
// };*/
// xmlhttp.open('GET', url, true);
// xmlhttp.onerror = function (xmlhttp) { console.log('error:', xmlhttp); };
// xmlhttp.onprogress = function (xmlhttp) { console.log('bytes loaded:', xmlhttp.loaded); }; // or something
// xmlhttp.onload = callback1;
// xmlhttp.send(null);

// function callback1(xmlhttp) {

//     let response, json, lines;

//     response = xmlhttp.target.response;
//     var x = document.getElementById('demo');
//     //demo.innerText = response;

//     json = JSON.parse(response);

//     // console.log('json', json);

//     // console.log(json["Time Series (Daily)"]);

//     var flag = 0;

//     var demo = document.getElementById("demo");
    
//     for (var key in json["Time Series (Daily)"]) {
//         var val = json["Time Series (Daily)"][key];
//         console.log(json["Time Series (Daily)"]);
//         var tr = document.createElement('tr');
//         var td0 = document.createElement('td');
//         var td1 = document.createElement('td');
//         var td2 = document.createElement('td');
//         var td3 = document.createElement('td');
//         var td4 = document.createElement('td');
//         var td5 = document.createElement('td');
//         var td6 = document.createElement('td');

//         td0.innerHTML=sname;
//         td1.innerHTML = key;

//         td2.innerHTML = val["1. open"];
//         td3.innerHTML = val["2. high"];
//         td4.innerHTML = val["3. low"];
//         td5.innerHTML = val["4. close"];
//         td6.innerHTML = val["5. volume"];

//         tr.appendChild(td0);
//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tr.appendChild(td3);
//         tr.appendChild(td4);
//         tr.appendChild(td5);
//         tr.appendChild(td6);
//         demo.appendChild(tr);


//         flag += 1;
//         if (flag == 1) {
//         break;
//         }
//     }

//     }

// }
// function delte(){
//     const db = firebase.firestore();
//     var user = firebase.auth().currentUser;
//     if (user != null) {
//         uid = user.uid;
//     }
//     var contain=document.getElementById("contain");
//     contain.innerHTML="";
//     db.collection("watchlist").where("userid", "==", uid)
//     .get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             var radio=document.createElement('div');
//             var labelValue = document.createElement('label');
//             labelValue.innerHTML = doc.data().name;
//             var inputValue = document.createElement('input');
//             inputValue.type = "radio";
//             inputValue.name = "symbol";
//             inputValue.value= doc.data().symbol;
//             radio.appendChild(inputValue);
//             radio.appendChild(labelValue);
//             contain.appendChild(radio);
//             });
//     })
    
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });
// }
// function getvalue(){
//     var syl = document.getElementsByName('symbol');
//             var radval,docid="0";
//             for(i = 0; i < syl.length; i++) {
//                 if(syl[i].checked)
//                 radval=syl[i].value;
//             }
//             var user = firebase.auth().currentUser;
//             if (user != null) {
//                 uid = user.uid;
//             }
//     const db = firebase.firestore();
//     const ref=db.collection("watchlist");
//     ref.where("symbol","==", radval).where("userid", "==", uid)
//     .get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             doc.ref.delete();
//         swal({
//             title: "Delete",
//             text: "Delete Successful",
//             type: "success"
//         })
//         setTimeout(function(){
//             window.location.reload();
//         }, 1000)
//         });
//     });
// }
