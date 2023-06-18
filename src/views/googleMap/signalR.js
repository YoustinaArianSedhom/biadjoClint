import * as signalR from "@aspnet/signalr";

export default {
  ConnectsignalR() {
    const DriverId = "36adbc30-d7b5-41ca-a985-8dc68459306f";
    // <snippet_Connection>
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://testserver.biadjo.com:5001/hubs/connectionhub", {
        accessTokenFactory: () => localStorage.getItem("AccessToken")
      })
      .build();
    // </snippet_Connection>
    connection.on("DriverLocationUpdate", message => {
      console.log("DriverLocationUpdate");
      console.log(message);
    });

    async function start() {
      try {
        await connection.start().then(() => {
          console.log("SignalR Connected.");
          invoke();
        });
      } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
      }
    }
    async function invoke() {
      var Obj = {
        DriverID: "f32751ee-cf47-429e-a2e1-71259b6a2bab",
        Latitude: "30.1055945",
        Longitude: "31.3303327",
        Accuracy: "17.593000411987305",
        Altitude: "63.5",
        Bearing: "359.0003356933594",
        Speed: "0.24085289239883423"
      };
      try {
        await connection
          .invoke("SubscribeOnLocationUpdate", DriverId)
          .then(response => {
            console.log("SubscribeOnLocationUpdate", response);

            setInterval(() => {
              connection.invoke("UpdateDriverLocation", Obj);
            }, 5000);
          });
      } catch (err) {
        console.log("SubscribeOnLocationUpdateERROR");

        console.error(err);
      }
    }

    connection.onclose(start);

    // Start the connection.
    start();
    //   });
  }
};
