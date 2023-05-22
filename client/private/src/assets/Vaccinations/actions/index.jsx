import { getData, postData } from '../../../services';

import { setSuccessMessagem, setErrorMessage } from '../../../actions';

// get all vaccines
export const getVaccines = () => async (dispatch) => {
  const { data } = await getData('/vaccines');
  if (data.success) {
    dispatch({
      type: 'SET_VACCINES',
      payload: data.data,
    });
  }
};

// add vaccinations
export const registerVaccinations = (props) => async (dispatch) => {
  const { data } = await postData('/vaccines', props);
  if (data.success) {
    dispatch({
      type: 'SET_VACCINES',
      payload: data.data,
    });
  }
};
