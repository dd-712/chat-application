
import * as ActionTypes from './ActionTypes';
import { baseUrl, curUrl } from '../shared/baseUrl';

export const postContact = (_id,username,roomId) => (dispatch) => {
    const newContact = {
        _id:_id,
        username: username,
        roomId
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/connections', {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        // .then(response => dispatch(fetchContacts()))
        .catch(error => { return('New contact not added'); })
}

export const deleteContact = (_ID1,ID2) => (dispatch) => {

    const deleteContact = {
        _id1: _ID1,
        _id2:ID2
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/connections', {
        method: 'DELETE',
        body: JSON.stringify(deleteContact),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        // .then(response => dispatch(fetchContacts()))
        .catch(error => { /*('You are not authourized to REMOVE this contact'));*/ })
}


export const postChat = (receiver, message, data, title, File) => (dispatch) => {

    const newChat = {
        receiver: receiver,
        message: message,
        data: data,
        File: { 'filename': File, 'title': title }
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'chat/addChat', {
        method: 'POST',
        body: JSON.stringify(newChat),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .catch(error => { /*dispatch(ErrorMess('Your data could not be send'));*/ })
}

export const deleteChat = (_ID) => (dispatch) => {

    const deleteChat = {
        _Id: _ID
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'UploadFile/delete', {
        method: 'DELETE',
        body: JSON.stringify(deleteChat),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .catch(error => { /*dispatch(ErrorMess('You are not authourized to REMOVE this chat'));*/ })
}

export const postFile = (formadata, receiver, message, data, title) =>  (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'UploadFile', {
        method: 'POST',
        body: formadata,
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            dispatch(postChat(receiver, message, data, title, response.file));
        })
        .catch(error => {/*
            if (error.message === "Error 401: Unauthorized")
                dispatch(ErrorMess('Please LOGIN to chat'));
            else
                dispatch(ErrorMess('Please upload File with valid file extension.'));
            dispatch(Set_default());*/
        })
}

export const addFile = (name) => ({
    type: ActionTypes.ADD_FILE,
    payload: name
});


export const signupUser = (username, password, firstname, lastname) => (dispatch) => {

    const newUse = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname

    };
    const newUser = {
        username: newUse.username.username,
        password: newUse.username.password,
        firstname: newUse.username.firstname,
        lastname: newUse.username.lastname
    }
    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    }).then(response => {
        
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response =>{dispatch(loginUser({'username':username.username,'password':username.password}));})
        .catch(error => {return ('Username Already Taken'); })
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                window.location.reload(false);
                window.location.href=curUrl+"user";
                // dispatch(fetchContacts());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        //.catch(error => alert(error.message))
        .catch(error => { return ('Username Or Password is not valid'); })
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    window.location.href=curUrl+"login";
    dispatch(receiveLogout())
}

export const postChangeUsername = (newUsername) => (dispatch) => {

    const newName = {
        comment: newUsername
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/changeUsername', {
        method: 'POST',
        body: JSON.stringify(newName),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => alert(response.statusValue))
        .catch(error => {
            console.log('Error: ', error.message);
            alert('Error: ' + error.message);
        })
}