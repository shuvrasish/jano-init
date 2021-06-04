import React from "react";
import './App.css';
import Cards from "./Cards";
import 'firebase/analytics';
import database from "./firebase";
import firebase from "firebase/app"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  
  React.useEffect(() => {
    let msg = null
    if (firebase.messaging.isSupported()) {
      msg = firebase.messaging()
      msg.requestPermission().then(() => {
        console.log()
        return msg.getToken({ vapidKey: "BNr6t72DsL2tuv-9_pcEhQqgQv-A1Irqpaohv5k48vC2Wg-Hf58bORmBK6g8adqT4hHOTC7IXaVr_Yjl1Vkh9Oc" });
      }).then((data) => {
        console.warn("token", data)

        if (firebase.auth().currentUser == null) {
          database.collection("TokenWithoutLogin").doc("TokenWithoutLogin").update(
            {
              token: firebase.firestore.FieldValue.arrayUnion(data),
            }
          )
        }
        else {
          console.log(firebase.auth().currentUser.email)
          database.collection("Users").doc(firebase.auth().currentUser.email).update(
            {
              token: data

            }
          )
          database.collection("TokenWithoutLogin").doc("TokenWithoutLogin").update(
            {
              token: firebase.firestore.FieldValue.arrayRemove(data),
            }
          )
        }
      })
    } else {
      //alert('no-support :(')
    }

    // const msg = firebase.messaging()



  })
  
  return (
    <div className="App">
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
