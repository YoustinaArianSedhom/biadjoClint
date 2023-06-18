import * as signalR from "@aspnet/signalr";

export default {
  SendMsg() {
    var connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44398/chatHub")
      .build();

    //Disable send button until connection is established

    connection.on("ReceiveMessage", function(user, message) {
      var msg = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      var encodedMsg = user + " says " + msg;
      var li = document.createElement("li");
      li.textContent = encodedMsg;
    });

    connection
      .start()
      .then(function() {
        console.log("Started");
      })
      .catch(function(err) {
        return console.error(err.toString());
      });

    setTimeout(() => {
      var user = "Hani";
      var message = "Welcome";
      connection.invoke("SendMessage", user, message).catch(function(err) {
        return console.error(err.toString());
      });
    }, 10000);
  }
};
