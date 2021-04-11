import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCaS-ReZKMjbFm7lRIrdcJd703YuX74LiI',
  authDomain: 'whatsapp-2-4f755.firebaseapp.com',
  projectId: 'whatsapp-2-4f755',
  storageBucket: 'whatsapp-2-4f755.appspot.com',
  messagingSenderId: '885210268922',
  appId: '1:885210268922:web:d5f9820846ad4916db3543',
  measurementId: 'G-8C493GLN4P',
};

//This is firebase Ternary expression
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
