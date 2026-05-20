import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-3OtQZ43rIpnH_FwybCiNzg5_3VpfUuE",
  authDomain: "tuvung-f564c.firebaseapp.com",
  databaseURL: "https://tuvung-f564c-default-rtdb.firebaseio.com",
  projectId: "tuvung-f564c",
  storageBucket: "tuvung-f564c.appspot.com",
  messagingSenderId: "608040324748",
  appId: "1:608040324748:web:a5b28a544e00bc5f35a9",
  measurementId: "G-QB1CP0EVTW"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };