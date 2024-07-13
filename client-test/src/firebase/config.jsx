import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACKFwNxc91yt_tIJ12wIMm4SzLnr95AnU",
  authDomain: "pizza-app-dncn.firebaseapp.com",
  projectId: "pizza-app-dncn",
  storageBucket: "pizza-app-dncn.appspot.com",
  messagingSenderId: "466750804997",
  appId: "1:466750804997:web:b7219bc5c07e003aecb86c",
  measurementId: "G-12PL5GZG1S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);