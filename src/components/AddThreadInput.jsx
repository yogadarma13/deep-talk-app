import React from 'react';
import useInput from '../hooks/useInput';
import FieldInput from './FieldInput';
import CategoryInput from './CategoryInput';

function AddThreadInput({ handleAddThread }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');

  return (
    <>
      <FieldInput
        label='Title'
        type='text'
        value={title}
        handleInput={setTitle}
      />
      <FieldInput
        label='Description'
        type='text'
        value={body}
        handleInput={setBody}
      />
      <CategoryInput value={category} handleValue={setCategory} />
      <button onClick={() => handleAddThread({ title, body, category })}>
        Tambah
      </button>
    </>
  );
}

export default AddThreadInput;
