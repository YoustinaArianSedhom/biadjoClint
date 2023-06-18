importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");
var config = {
  apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
  authDomain: "biadjo-1546341863949.firebaseapp.com",
  databaseURL: "https://biadjo-1546341863949.firebaseio.com",
  projectId: "biadjo-1546341863949",
  storageBucket: "biadjo-1546341863949.appspot.com",
  messagingSenderId: "1058566822933",
  appId: "1:1058566822933:web:d0cc8695c063c7363d421c",
  measurementId: "G-9B0EZQSYLT"
};
var objectStore;
firebase.initializeApp(config);

const messaging = firebase.messaging();

var ID = "";
var Title = "";
var Body = "";
var Type = "";
messaging.onBackgroundMessage(function(payload) {
  Type = payload.data.Type;
  switch (payload.data.Type) {
    case "NewOffer":
      Title = "New Offer";
      Body =
        "There is a new offer waiting for approve or reject with ID" +
        " " +
        payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "NewBiadjoStatus":
      Title = "New Biadjo Status";
      Body =
        "You have received new status for Biadjo number" +
        " " +
        payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "AccountStatus":
      Title = "Account Status";
      Body = "Your account status have been changed";
      ID = "";
      break;

    default:
      Title = payload.data.Type;
      Body = payload.data.Type;
      ID = "";
  }
  const notificationTitle = Title;
  const notificationOptions = {
    body: Body,
    image:
      "https://biadjo.com/wp-content/uploads/2020/06/Biadjo-Exp_Slider-Client.png"
  };
  // re-call notification when user back to web tab
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener(
  "notificationclick",
  function(event) {
    switch (Type) {
      case "NewBiadjoStatus":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "AccountStatus":
        event.notification.close();
        clients.openWindow("/user/UserPersonalDetails");
        break;

      case "NewOffer":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;
    }
  },
  false
);
