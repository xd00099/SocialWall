import { AUTH } from "../constants/actionTypes"; 
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // login user
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data})
        // navigate to home
        navigate('/posts');
    } catch (error) {
        alert('Incorrect username or password!');
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH, data})
        // navigate to home
        navigate('/posts');
    } catch (error) {
        
    }
};