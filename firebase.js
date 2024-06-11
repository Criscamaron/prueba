// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { where ,getDocs ,query ,addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNFMdttYHddiZs1IcLPh3EfTN90AF2wnE",
  authDomain: "prueauwu.firebaseapp.com",
  projectId: "prueauwu",
  storageBucket: "prueauwu.appspot.com",
  messagingSenderId: "1064445678720",
  appId: "1:1064445678720:web:c826864741b24635fd0265"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const save = async (camp) => {
  const q = query(collection(db, 'Campeones'), where("nom_camp", "==", camp.nom_camp));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'Campeones'), camp);
    return true;
  } else {
    return false;
  }
}
export const getData = (data) => {
  onSnapshot(collection(db, 'Campeones'), data)
}
export const eliminar = (id) =>{
  deleteDoc(doc(db,'Campeones',id))
}
export const obtener = (id) => getDoc(doc(db,'Campeones',id))

export const update = (id,campeon) =>{ 
  updateDoc(doc(db,'Campeones',id),campeon)
}
