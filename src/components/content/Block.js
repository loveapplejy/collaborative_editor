import React, { memo } from 'react';
import EditorUnit from '../EditorUnit';
import { getDefaultKeyBinding } from 'draft-js';

function Block({ createBlock, editorData = {} }) {
  const handleKeyBinding = (e) => {
    if (e.keyCode === 13) {
      return createBlock();
    }

    return getDefaultKeyBinding(e);
  };

  return (
    <EditorUnit
      keyBindingFn={handleKeyBinding}
      initContentState={editorData.list}
      id={editorData?.id}
    />
  );
}

export default memo(Block);
