import {firebase} from 'firebase'

const config = {
  apiKey: "AIzaSyAHr76kmE5AHYk1Bj5U_EBV30ORpwuO_5I",
  authDomain: "giftregistry-de42f.firebaseapp.com",
  databaseURL: "https://giftregistry-de42f.firebaseio.com",
  projectId: "giftregistry-de42f",
  storageBucket: "giftregistry-de42f.appspot.com",
  messagingSenderId: "243539118972"
};
export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
