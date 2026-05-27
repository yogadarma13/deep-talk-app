import React from 'react';
import AddThreadInput from '../components/AddThreadInput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddNewThread } from '../states/threads/action';
import { useNavigate } from 'react-router-dom';

function AddThreadPage() {
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddNewThread({ title, body, category, navigate }));
  };

  return (
    <div className="add-thread-page__main">
      <AddThreadInput
        isLoading={isLoading}
        handleAddThread={onAddThread}
      />
    </div>
  );
}

export default AddThreadPage;
