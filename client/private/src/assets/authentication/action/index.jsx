import Cookies from 'js-cookie';
import {  postData } from '../../../services';
import { setSuccessMessage,setErrorMessage } from '../../../actions';

//for login

export const setLogin = (props, navigate) => async (dispatch) => {
  console.log('props', props);
  await postData('/auth/login', props).then((e) => {
    console.log('e.data', e.data);
    if (e.data.success) {
      Cookies.set('token', e.data.data.accessToken);
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          token: e.data.data.accessToken,
          designation: e.data.data.designation,
        })
      );
      navigate();
      dispatch(setSuccessMessage(e.data.message));
      // console.log(e.data.data.permission);
      // dispatch({
      //   type: 'GET_LOGIN',
      //   payload: e.data.data.designation,
      //   permission: e.data.data.permission,
      // });
    } else {
      dispatch(setErrorMessage(e.data.message));
    }
  });
};