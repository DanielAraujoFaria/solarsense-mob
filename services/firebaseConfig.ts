import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, remove, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCmZTUN6iAS6j2YcJPgcXGevY3VMsB86Fw",
  databaseURL: 'https://solarsense-83891-default-rtdb.firebaseio.com/',
  authDomain: "solarsense-83891.firebaseapp.com",
  projectId: "solarsense-83891",
  messagingSenderId: "188296302048",
  appId: "1:188296302048:android:7bc37adfc4e6026cb66f85",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const database = getDatabase(app);
export { database, ref, set, get, remove, child };
