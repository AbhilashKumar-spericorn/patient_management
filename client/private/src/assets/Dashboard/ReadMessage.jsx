// read individual feed back page

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { readMessage } from '../../actions';

const ReadMessage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readMessage(id));
  }, []);
  const { feedback } = useSelector((e) => e.msg);
  

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Feed Back</h5>
        <h6 className="card-subtitle mb-2 text-muted">{feedback.name}</h6>
        <p className="card-text">
          {feedback.message}
        </p>
        <p href="#" className="card-link">
          {feedback.email}
        </p>
        <Link to={'/messages'}>back</Link>
      </div>
    </div>
  );
};

export default ReadMessage;
