// Initialize Firebase Database
var config = {
   apiKey: "AIzaSyAFvyZ1nxtlK3kxHkJnjdAboNe7vF1fGCQ",
   authDomain: "trainapp-10555.firebaseapp.com",
   databaseURL: "https://trainapp-10555.firebaseio.com",
   projectId: "trainapp-10555",
   storageBucket: "trainapp-10555.appspot.com",
   messagingSenderId: "204171926717"
  };

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Variables to get user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
/*  var nextArrival = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var minutesAway = moment($("#start-input").val().trim(), "HH:mm").format("X");*/

  // Object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;

  // Train Information
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(frequency);

  // Format the train start
/*  var nextArrivalFormat = moment.unix(tbd).format("HH:mm");/*
*/
  var firstArrival = moment(firstTrain,"HH:mm");
/*  var firstArrival = moment(firstTrain).format("HH:mm");*/
  console.log('first arrival', firstArrival)
  var nextArrival = firstArrival.add(frequency, 'minutes').format("HH:mm");
  console.log('next arrival', nextArrival);
/*  // Calculate the next arrival
  var nextArrival = moment().diff(moment.unix(trainStart, "X"), "months");
  console.log(tbd);*/

  // Calculate the minutes away
  /*var now = moment().format("HH:mm");*/
  var now = moment();
  console.log("Current time", now);
/*  var minutesAway = moment(nextArrival).subtract(now).format("HH:mm");*/
  var minutesAway = moment().diff(nextArrival,'minutes');
  console.log('minutes away', minutesAway);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});