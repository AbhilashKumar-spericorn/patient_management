import { getData } from '../../../services';
import { setSuccessMessage, setErrorMessage } from '../../../actions';

export const getAllTransactions= () => async (dispatch) => {
  const { data } = await getData('/transactions');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch({
        type: 'TRANSACTION_DATA',
        payload: data.data,
      });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
