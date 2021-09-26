import firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBRqZzSdJAfgAFept1wGEN9M43tqxzIi7w",
  authDomain: "bddesafio-11890.firebaseapp.com",
  databaseURL: "https://bddesafio-11890-default-rtdb.firebaseio.com",
  projectId: "bddesafio-11890",
  storageBucket: "bddesafio-11890.appspot.com"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
