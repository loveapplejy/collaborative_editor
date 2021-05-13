import React, { useCallback, useLayoutEffect, useState } from 'react';
import Title from './header/Title';
import Block from './content/Block';
import { pagesRef, editorsRef } from '../store/firebase';
import EditorService from '../services/EditorService';

function EditorContainer() {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([]);

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
        handleSetBlock();
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

  const handleSetBlock = useCallback(() => {
    let raw = EditorService.getEmptyContentRaw();

    pagesRef
      .collection('editors')
      .add({ list: raw })
      .then((docRef) => {
        const data = { id: docRef.id, list: raw };
        const newEditors = [...blocks, data];

        setBlocks(newEditors);
      });
  }, [blocks]);

  useLayoutEffect(() => {
    getEditorInfo();
  }, []);

  return (
    <>
      <Title title={title} setTitle={setTitle} handleSetTitle={handleSetTitle} />
      <div className="lotion_contents">
        {blocks.map((block) => (
          <Block key={`lotion_block_${block.id}`} createBlock={handleSetBlock} editorData={block} />
        ))}
      </div>
    </>
  );
}

export default EditorContainer;
