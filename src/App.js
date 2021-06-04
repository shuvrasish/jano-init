import React, { useState } from "react";
import "./App.css";
import Cards from "./Cards";
import "firebase/analytics";
import database from "./firebase";
import firebase from "firebase/app";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { IconButton } from "@material-ui/core";

function App() {
  console.log(Notification.permission);
  const [notifPermission, setNotifPermission] = useState(
    Notification.permission
  );
  // React.useEffect(() => {
  //   let msg = null;
  //   if (firebase.messaging.isSupported()) {
  //     msg = firebase.messaging();
  //     msg
  //       .requestPermission()
  //       .then(() => {
  //         console.log();
  //         return msg.getToken({
  //           vapidKey:
  //             "BNr6t72DsL2tuv-9_pcEhQqgQv-A1Irqpaohv5k48vC2Wg-Hf58bORmBK6g8adqT4hHOTC7IXaVr_Yjl1Vkh9Oc",
  //         });
  //       })
  //       .then((data) => {
  //         console.warn("token", data);

  //         if (firebase.auth().currentUser == null) {
  //           database
  //             .collection("TokenWithoutLogin")
  //             .doc("TokenWithoutLogin")
  //             .update({
  //               token: firebase.firestore.FieldValue.arrayUnion(data),
  //             });
  //         } else {
  //           console.log(firebase.auth().currentUser.email);
  //           database
  //             .collection("Users")
  //             .doc(firebase.auth().currentUser.email)
  //             .update({
  //               token: data,
  //             });
  //           database
  //             .collection("TokenWithoutLogin")
  //             .doc("TokenWithoutLogin")
  //             .update({
  //               token: firebase.firestore.FieldValue.arrayRemove(data),
  //             });
  //         }
  //       });
  //   } else {
  //     //alert('no-support :(')
  //   }

  //   // const msg = firebase.messaging()
  // });

  //handler for allowing notifications.
  //once notifications are allowed or blocked, the option can only be changed from the browser settings and the popup wont appear unless ask option is currently selected in the browser settings
  const messagingNotificationHandler = () => {
    let messaging = null;
    if (firebase.messaging.isSupported()) {
      messaging = firebase.messaging();
      //using "messaging" shows warning so replaced it with "Notification" which does the same thing
      Notification.requestPermission()
        .then((permission) => {
          console.log(`Permission ${permission}`);
          setNotifPermission(permission);
          return messaging.getToken({
            vapidKey:
              "BNr6t72DsL2tuv-9_pcEhQqgQv-A1Irqpaohv5k48vC2Wg-Hf58bORmBK6g8adqT4hHOTC7IXaVr_Yjl1Vkh9Oc",
          });
        })
        .then((data) => {
          console.log(data);
          if (firebase.auth().currentUser == null) {
            database
              .collection("TokenWithoutLogin")
              .doc("TokenWithoutLogin")
              .update({
                token: firebase.firestore.FieldValue.arrayUnion(data),
              });
          } else {
            database
              .collection("Users")
              .doc(firebase.auth().currentUser.email)
              .update({
                token: data,
              });
            database
              .collection("TokenWithoutLogin")
              .doc("TokenWithoutLogin")
              .update({
                token: firebase.firestore.FieldValue.arrayRemove(data),
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("Firebase Messaging not supported!");
    }
  };

  return (
    <div className="App">
      <div className="notif-container">
        {notifPermission === "default" ? (
          <IconButton onClick={messagingNotificationHandler}>
            <NotificationsActiveIcon fontSize="large" />
          </IconButton>
        ) : (
          ""
        )}
      </div>
      <Router>
        <Switch>
          {/* <Route path="/card/:auth/:id">
            <Header />
            <DynamicCards />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route> */}
          <Route path="/">
            {/* <Header /> */}
            <Cards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
