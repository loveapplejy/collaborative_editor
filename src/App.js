import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import EditorContainer from './components/EditorContainer';

import './styles/editor.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: '50%',
    margin: '0 auto',
    marginBottom: '4rem',
  },
  editor: {
    height: '90vh',
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

function App() {
  return (
    <div style={styles.root}>
      <div style={styles.editor}>
        <EditorContainer />
      </div>
    </div>
  );
}

export default App;
