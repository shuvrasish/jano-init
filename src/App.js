import React, { useState } from "react";
import "./App.css";
import Cards from "./Cards";
import "firebase/analytics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { IconButton } from "@material-ui/core";
import NotificationDialog from "./NotificationDialog";

function App() {
  const [open, setOpen] = useState(false);
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

  //handler for notification permission dialox box
  const handleOpen = () => {
    setOpen(true);
  };

  //handler for allowing notifications.
  //once notifications are allowed or blocked, the option can only be changed from the browser settings and the popup wont appear unless ask option is currently selected in the browser settings

  return (
    <div className="App">
      <div className="notif-container">
        {notifPermission === "default" ? (
          <IconButton onClick={handleOpen}>
            <NotificationsActiveIcon fontSize="large" />
          </IconButton>
        ) : (
          ""
        )}
        <NotificationDialog
          open={open}
          setOpen={setOpen}
          setNotifPermission={setNotifPermission}
        />
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
