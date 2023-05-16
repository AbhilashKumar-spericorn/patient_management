import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddDisease = () => {
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
      <Formik
        initialValues={{ diseases }}
        onSubmit={(values) => {
          // Handle form submission
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="diseases">
              {({ push, remove }) => (
                <div>
                  {values.diseases.map((_, index) => (
                    <div key={index}>
                      <Field
                        name={`diseases[${index}].name`}
                        placeholder="Disease Name"
                      />
                      <ErrorMessage name={`diseases[${index}].name`} component="div" className="error" />
                      <Field
                        name={`diseases[${index}].startDate`}
                        placeholder="Start Date"
                      />
                      <ErrorMessage name={`diseases[${index}].startDate`} component="div" className="error" />
                      <Field
                        name={`diseases[${index}].remarks`}
                        placeholder="Remarks"
                      />
                      <ErrorMessage name={`diseases[${index}].remarks`} component="div" className="error" />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ name: '', startDate: '', remarks: '' })
                    }
                  >
                    Add Disease
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDisease;
