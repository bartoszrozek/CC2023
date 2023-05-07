import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDVJCA43urYbnUbHZNQ4YIydxAxiM9oZ98",

  authDomain: "cloudy2023pwproject.firebaseapp.com",

  projectId: "cloudy2023pwproject",

  storageBucket: "cloudy2023pwproject.appspot.com",

  messagingSenderId: "322004009779",

  appId: "1:322004009779:web:04e5167d4bcc556289b446",

  measurementId: "G-X3GV4DM4MW",
};

const app = initializeApp(firebaseConfig);

const storage_var = getStorage(app);

const listRef = ref(storage_var, "files");

export { storage_var, app, listRef };
