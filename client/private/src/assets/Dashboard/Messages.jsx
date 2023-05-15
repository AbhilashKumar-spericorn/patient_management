// feedback

import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks } from '../../actions';
import { useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

const Messages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, []);

  const { feedbacks } = useSelector((e) => e.msg);
  console.log('feedbacks', feedbacks)

  createTheme(
    'solarized',
    {
      text: {
        primary: 'yellow',
        secondary: 'white',
      },
      background: {
        default: '#002b36',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#073642',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    },
    'dark'
  );

  const columns = [
    {
      name: 'SENDER',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },

    {
      name: 'ACTION',
      selector: (row) => (
        <div>
          {' '}
          <Link className="btn btn-info" to={`/read-feedback/${row.id}`}>
            Read
          </Link>
          {/* <button
            className="btn btn-warning"
            onClick={() => {
              dispatch(dltFeedBack(row.id));
            }}
            style={{ marginLeft:"5px" }}
          >
            delete
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <DataTable
            columns={columns}
            data={feedbacks}
            pagination
            theme="solarized"
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
