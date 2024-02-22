import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAVUkJtCv-le4YU_s2jTdRd8N0IMCOuSPU",
  authDomain: "dhis2-app.firebaseapp.com",
  projectId: "dhis2-app",
  storageBucket: "dhis2-app.appspot.com",
  messagingSenderId: "968295901466",
  appId: "1:968295901466:web:eca012aaa58ef536bde4a3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)