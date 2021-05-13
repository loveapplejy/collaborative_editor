import React, { useRef, useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import '../styles/editor.css';
import 'draft-js/dist/Draft.css';
import { editorsRef } from '../store/firebase';

function EditorUnit({ initContentState, id, ...editorProps }) {
  const currentEditorState = initContentState
    ? EditorState.createWithContent(convertFromRaw(initContentState))
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(currentEditorState);

  const editor = useRef(null);

  const handleChange = (state) => {
    setEditorState(state);

    const editorRef = editorsRef.doc(id);

    const currentContent = state.getCurrentContent();
    let raw = convertToRaw(currentContent);
    editorRef.set({ list: raw });
  };

  return (
    <>
      <Editor ref={editor} editorState={editorState} onChange={handleChange} {...editorProps} />
    </>
  );
}

export default EditorUnit;
