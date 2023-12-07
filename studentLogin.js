import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

const firebase = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// code for signupform
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const rollNumber = document.getElementById("signupRollNumber").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    // add user on auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("signed up");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    // Store user information in Firebase Realtime Database
    set(ref(db, `users/${rollNumber}`), {
      email: email,
      password: password,
    });

    alert("Sign up successful! Please log in.");
  });
// Event listener for login form
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Retrieve user information from Firebase auth Database
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("logged in!");
        window.location.href = "driverLogin.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
