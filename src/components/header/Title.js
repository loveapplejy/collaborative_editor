import React from 'react';

function Title({ title, setTitle, handleSetTitle }) {
  return (
    <input
      type="text"
      className="lotion_title"
      placeholder="Untitled"
      value={title}
      onChange={handleSetTitle}
    />
  );
}

export default React.memo(Title);
