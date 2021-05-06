import React, { useCallback, useState } from 'react';
import Title from './header/Title';
import Block from './content/Block';

function EditorContainer() {
  const [blocks, setBlocks] = useState(1);

  const createBlock = useCallback(() => {
    setBlocks(blocks + 1);
  }, [blocks]);

  return (
    <>
      <Title />
      <div className="lotion_contents">
        {Array.from(Array(blocks)).map((v, i) => (
          <Block key={`lotion_block_${i}`} createBlock={createBlock} />
        ))}
      </div>
    </>
  );
}

export default EditorContainer;
