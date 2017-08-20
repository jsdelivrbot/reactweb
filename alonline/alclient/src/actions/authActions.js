import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      console.log(token);
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
//      console.log(jwt.decode(token));
      console.log(jwtDecode(token));
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}
