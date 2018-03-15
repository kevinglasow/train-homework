  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQe5PHEHVSkeSbR_pPA8hdtDIkylp84ws",
    authDomain: "train-homework-48a21.firebaseapp.com",
    databaseURL: "https://train-homework-48a21.firebaseio.com",
    projectId: "train-homework-48a21",
    storageBucket: "train-homework-48a21.appspot.com",
    messagingSenderId: "324744162203"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// On click for adding a train to the table
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm A").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates object
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Push object to firebase
  database.ref().push(newTrain);

  // Logs and alert!!
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
  alert("Train successfully added");

  // Empty text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// firebase function that will add date to table and run whenever new info is added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // Logging
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain, " -look here");
  console.log(frequency);

  // Format the first train time using moment
  var firstTrainFormated = moment(firstTrain, "hh:mm A").format("HH:mm");
  // console.log("firstTrainFormated");
  // console.log(moment("10:00 PM", "hh:mm A").format("HH:mm"))
  console.log("----------------------------------------");
  console.log(firstTrainFormated);

  // Calculate the next arrival time with MATH!!!
    // 1.) find the difference between the current time and the first time, convert that time into seconds
    // 2.) divide that number of seconds by the frequency and round up, store that number as a variable
    // 3.) multiple that rounded variable by the frequency 
    // 4.) add that number to the first train time as expressed in seconds, store as a variable
    // 5.) convert that variable back into military time, store as nextArrival
  // Calculate the minutesAway
    // 1.) convert both the next arrival time and current time into seconds
    // 2.) subtract current time from the next arrival time, store the result
    // 3.) divide the remainder by 60 store at minutesAway
  // Change the code below to use the variables instead of strings with the variables names

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + "nextArrival" + "</td><td>" + "minutesAway" + "</td></tr>");
});