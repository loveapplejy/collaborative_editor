import React, { useCallback, useEffect, useRef, useState } from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState, getDefaultKeyBinding } from 'draft-js';
import { editorsRef } from '../../store/firebase';

function Block({ createBlock, editorData = {}, currentId }) {
  const uuid = editorData.id;
  const currentEditorState = editorData.list
    ? EditorState.createWithContent(convertFromRaw(editorData.list))
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(currentEditorState);

  const editorRef = useRef(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleChange = (state) => {
    setEditorState(state);

    const editorRef = editorsRef.doc(editorData.id);

    const currentContent = state.getCurrentContent();
    let raw = convertToRaw(currentContent);
    editorRef.set({ list: raw });
  };

  const handleKeyBinding = useCallback((e) => {
    if (e.keyCode === 13) {
      return createBlock(uuid);
    }

    return getDefaultKeyBinding(e);
  }, []);

  useEffect(() => {
    if (uuid === currentId) {
      focusEditor();
    }
  }, [currentId]);

  return (
    <Editor
      ref={editorRef}
      id={editorData?.id}
      keyBindingFn={handleKeyBinding}
      initContentState={editorData.list}
      editorState={editorState}
      onChange={handleChange}
    />
  );
}

export default React.memo(Block);
