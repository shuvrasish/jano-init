import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import database from "./firebase";
import firebase from "firebase/app";
import React, { useState } from "react";

const NotificationDialog = () => {
  const [open, setOpen] = useState(false);
  const [notifPermission, setNotifPermission] = useState(
    Notification.permission
  );
  const handleClose = () => {
    setOpen(false);
  };
  //handler for notification permission dialox box
  const handleOpen = () => {
    setOpen(true);
  };

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
    setOpen(false);
  };
  return (
    <div className="notif-container">
      {notifPermission === "default" ? (
        <IconButton onClick={handleOpen}>
          <NotificationsActiveIcon fontSize="large" />
        </IconButton>
      ) : (
        ""
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ask for Notification Permissions?
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            Note: Changes will be permanent unless you change it from the
            browser site settings.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={messagingNotificationHandler}
            color="primary"
          >
            <Typography variant="button">Yes</Typography>
          </Button>
          <Button variant="button" onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationDialog;
