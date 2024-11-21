import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmZTUN6iAS6j2YcJPgcXGevY3VMsB86Fw",
  authDomain: "solarsense-83891.firebaseapp.com",
  projectId: "solarsense-83891",
  messagingSenderId: "188296302048",
  appId: "1:188296302048:android:7bc37adfc4e6026cb66f85",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
