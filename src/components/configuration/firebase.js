import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// / Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC8JP3cbp4CD0SVWgVQuRyo6LilAArZknQ",
    authDomain: "accountingcylce.firebaseapp.com",
    projectId: "accountingcylce",
    storageBucket: "accountingcylce.appspot.com",
    messagingSenderId: "1060150413589",
    appId: "1:1060150413589:web:7d01ae96d204dca81b811c",
    measurementId: "G-30BCW21V0E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase