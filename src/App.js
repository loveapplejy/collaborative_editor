import React from 'react';
import EditorContainer from './components/EditorContainer';
import './styles/editor.css';

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
