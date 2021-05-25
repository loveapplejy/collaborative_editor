import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Title from './header/Title';
import Block from './content/Block';
import { pagesRef, editorsRef } from '../store/firebase';
import EditorService from '../services/EditorService';

function EditorContainer() {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const getEditorInfo = useCallback(() => {
    pagesRef.get().then((doc) => {
      const { title } = doc.data();

      setTitle(title);
    });

    editorsRef.get().then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...data });
      });

      if (!list.length) {
        handleCreateBlock();
      } else {
        setBlocks(list);
      }
    });
  }, []);

  const handleSetTitle = useCallback(
    (e) => {
      const { value } = e.currentTarget;

      pagesRef.update({
        title: value,
      });

      setTitle(value);
    },
    [title],
  );

  const handleCreateBlock = useCallback(
    (blockId) => {
      let raw = EditorService.getEmptyContentRaw();
      let currentIndex = blocks.findIndex((block) => block.id === blockId);

      pagesRef
        .collection('editors')
        .add({ list: raw })
        .then((docRef) => {
          const data = { id: docRef.id, list: raw };
          const newBlocks = [...blocks];

          console.log(currentIndex);
          newBlocks.splice(currentIndex + 1, 0, data);

          setCurrentId(docRef.id);
          setBlocks(newBlocks);
        });
    },
    [blocks],
  );

  useEffect(() => {
    if (blocks.length) {
    }
  }, [blocks]);

  useLayoutEffect(() => {
    getEditorInfo();
  }, []);

  return (
    <>
      <Title title={title} setTitle={setTitle} handleSetTitle={handleSetTitle} />
      <div className="lotion_contents">
        {blocks.map((block) => (
          <Block
            key={`lotion_block_${block.id}`}
            createBlock={handleCreateBlock}
            editorData={block}
            currentId={currentId}
          />
        ))}
      </div>
    </>
  );
}

export default EditorContainer;
