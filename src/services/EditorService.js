import { convertToRaw, EditorState } from 'draft-js';

class EditorService {
  getEmptyContentRaw() {
    const newBlock = EditorState.createEmpty().getCurrentContent();
    const raw = convertToRaw(newBlock);

    return raw;
  }
}

export default new EditorService();
