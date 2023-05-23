//report disease

import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { reportDisease, getDiseases } from './action';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AddDisease = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiseases());
  }, []);
  const { Diseases } = useSelector((e) => e.hospital);
  // console.log('first', Diseases);


  // select options
  const dOptions = Diseases?.map((item, index) => (
    <option key={index} value={item._id}>
      {item.name}
    </option>
  ));
  const [diseases, setDiseases] = useState([
    { name: '', startDate: '', remarks: '' },
  ]);

 

  const validationSchema = Yup.object().shape({
    diseases: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Disease Name is required'),
        startDate: Yup.date().required('Start Date is required'),
        remarks: Yup.string().required('Remarks is required'),
      })
    ),
  });

  return (
    <div>
      <h3 className="text-center mb-4">Add Disease</h3>

      <Formik
        initialValues={{ diseases }}
        onSubmit={(values) => {
          // Handle form submission
          console.log('values', values);
          dispatch(reportDisease(values));
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <div className="d-flex flex-row">
              <div className="form-group mb-4 w-50 mx-auto">
                <div className="form-group mb-4 w-75">
                  <FieldArray name="diseases">
                    {({ push, remove }) => (
                      <div>
                        {values.diseases?.map((_, index) => (
                          <div key={index}>
                            <h5>Disease {index + 1}</h5>
                            <Field
                              as="select"
                              className="form-control mb-2"
                              name={`diseases[${index}].name`}
                            >
                              <option value="">Select Disease</option>
                              {dOptions}
                            </Field>
                            <ErrorMessage
                              name={`diseases[${index}].name`}
                              component="div"
                              className="error"
                            />
                            <Field
                              className="form-control mb-2"
                              name={`diseases[${index}].startDate`}
                              type="date"
                              placeholder="Start Date"
                            />
                            <ErrorMessage
                              name={`diseases[${index}].startDate`}
                              component="div"
                              className="error"
                            />
                            <Field
                              className="form-control mb-2"
                              name={`diseases[${index}].remarks`}
                              placeholder="Remarks"
                            />
                            <ErrorMessage
                              name={`diseases[${index}].remarks`}
                              component="div"
                              className="error"
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm mb-2"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm mb-2"
                          onClick={() =>
                            push({ name: '', startDate: '', remarks: '' })
                          }
                        >
                          Add Disease
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <Link className='btn btn-warning mx-3' to={'/diseases'}>back</Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDisease;
