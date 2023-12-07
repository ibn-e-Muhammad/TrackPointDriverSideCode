import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeH5NYqjKvFHNw5b5JbPfyr7CMvED0ucw",
  authDomain: "trackpoint-ac228.firebaseapp.com",
  databaseURL: "https://trackpoint-ac228-default-rtdb.firebaseio.com",
  projectId: "trackpoint-ac228",
  storageBucket: "trackpoint-ac228.appspot.com",
  messagingSenderId: "945635742333",
  appId: "1:945635742333:web:7f8443ff20a56989ff9714",
  measurementId: "G-87K2VRQN85",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const busNumber = document.getElementById("signupBusNumber").value;
    setInterval(async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude, accuracy } = position.coords;

        // Store driver location in Firebase
        set(ref(db, `driverLocations/${busNumber}`), {
          lat: latitude,
          long: longitude,
          acc: accuracy,
        });

        console.log(
          `Bus ${busNumber} location updated: Lat ${latitude}, Long ${longitude}, Accuracy ${accuracy}`
        );
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }, 5000);
    alert("Location sent <br /> don't close the tab. Just minimize");
  });
