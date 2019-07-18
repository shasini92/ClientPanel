import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyCGa3_3Vz80uAMd0xQYGkdr6mU6Z5p-M-8",
  authDomain: "reactclientpanel-84ae6.firebaseapp.com",
  databaseURL: "https://reactclientpanel-84ae6.firebaseio.com",
  projectId: "reactclientpanel-84ae6",
  storageBucket: "reactclientpanel-84ae6.appspot.com",
  messagingSenderId: "571128221725",
  appId: "1:571128221725:web:ad8e744d653c051b"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init Firebase instance
firebase.initializeApp(firebaseConfig);
//Init Firestore
/*const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);*/

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in LS
if (localStorage.getItem("settings" == null)) {
  //Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: true
  };

  // Set to LS
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
