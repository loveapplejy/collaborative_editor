import React, { useRef, useState } from 'react';
import { Editor, EditorState } from 'draft-js';

import '../styles/editor.css';
import 'draft-js/dist/Draft.css';

function EditorUnit({ ...editorProps }) {
  console.log(editorProps);
  const currentEditorState = EditorState.createEmpty();

  const [editorState, setEditorState] = useState(currentEditorState);

  const editor = useRef(null);

  const handleChange = (state) => {
    setEditorState(state);
  };

  return (
    <>
      <Editor ref={editor} editorState={editorState} onChange={handleChange} {...editorProps} />
    </>
  );
}

export default EditorUnit;
