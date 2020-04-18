import firebase from '@react-native-firebase/app';

const config = {
  apiKey: 'AIzaSyD1QYrTXPDTe04v-LPd3rq7gDF91NlFzkY',
  authDomain: 'covidapp-165ab.firebaseapp.com',
  databaseURL: 'https://covidapp-165ab.firebaseio.com',
  projectId: 'covidapp-165ab',
  storageBucket: 'covidapp-165ab.appspot.com',
  messagingSenderId: '276807276092',
  appId: '1:276807276092:web:994e50ee39b50d05701539',
  measurementId: 'G-X0YB7YCKBK',
};

firebase.initializeApp(config);

export default firebase;
