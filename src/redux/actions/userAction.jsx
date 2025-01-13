import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';

// User sign-in action
export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:5000/api/signin", user);

        // Log the response data to check if the token is there
        console.log("Response from backend:", data);

        // Store the token and other user info in localStorage
        const userInfo = {
            token: data.token,   // Ensure the token is correctly set here
            role: data.role,
            success: data.success
        };

        // Log the userInfo to ensure the token is being stored
        console.log("Storing userInfo:", userInfo);

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: userInfo
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
    
// User sign-up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:5000/api/signup", user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// User log-out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("http://localhost:5000/api/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// User profile action (Updated)
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });

    try {
        // Get the user information from localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Check if the user is authenticated
        if (!userInfo || !userInfo.token) {
            throw new Error('User is not authenticated');
        }

        // Make the request with the token in the headers
        const { data } = await axios.get("http://localhost:5000/api/me", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });

        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response?.data?.error || error.message
        });
    }
}

// All user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });

    try {
        // Get the user information from localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Check if the user is authenticated
        if (!userInfo || !userInfo.token) {
            throw new Error('User is not authenticated');
        }

        // Make the request with the token in the headers
        const { data } = await axios.get("http://localhost:5000/api/allusers", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });

        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response?.data?.error || error.message
        });
    }
}


// User job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        // Retrieve the token from localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Create a configuration object to include the token in the headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}` // Sending the token
            }
        };

        // Make the request with the token included
        const { data } = await axios.post("http://localhost:5000/api/user/jobhistory", job, config);
        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Applied Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
