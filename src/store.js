import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers

const firebaseConfig = {
  apiKey: "AIzaSyA8Q-KhlPJcwGHcp1NElCSioD833VqaGPY",
  authDomain: "clientpanelreact-bbec0.firebaseapp.com",
  databaseURL: "https://clientpanelreact-bbec0.firebaseio.com",
  projectId: "clientpanelreact-bbec0",
  storageBucket: "clientpanelreact-bbec0.appspot.com",
  messagingSenderId: "314684744986"
};
//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//initialise the firebase
firebase.initializeApp(firebaseConfig);
// initialise firestore

// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// create initial state
const initialState = {};

// crete store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
