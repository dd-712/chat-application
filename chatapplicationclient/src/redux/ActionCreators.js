
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchContacts = () => (dispatch) => {
dispatch(contactsLoading(true));
const bearer = 'Bearer ' + localStorage.getItem('token');

return fetch(baseUrl + 'users/connections', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
    },
    credentials: 'same-origin'
}).then((response) => {
    alert('done');
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
    throw errmess;}
)
.then(response => JSON.stringify(response))
.then(contacts => dispatch(addcontacts(contacts)))
.catch(error => {alert(error.message);dispatch(contactsFailed(error.message))});
}

export const contactsLoading = () => ({
    type: ActionTypes.CONTACTS_LOADING
});

export const contactsFailed = (errmess) => ({
    type: ActionTypes.CONTACTS_FAILED,
    payload: errmess
});

export const addcontacts = (contacts) => ({
    type: ActionTypes.ADD_CONTACTS,
    payload: contacts
});

export const postContact = (username) => (dispatch) => {

    const newContact = {
        username: username
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
        .catch(error => { dispatch(ErrorMess('New contact not added')); })
}

export const deleteContact = (_ID) => (dispatch) => {

    const deleteContact = {
        _id: _ID
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
        .catch(error => { dispatch(ErrorMess('You are not authourized to REMOVE this contact')); })
}

export const fetchChats = (receiver) => (dispatch) => {
    dispatch(chatsLoading(true));
    const chats = {
        receiver: receiver
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'getChat', {
        method: 'GET',
        body: JSON.stringify(chats),
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
        .then(chats => dispatch(addchats(chats)))
        .catch(error => dispatch(chatsFailed(error.message)));
}

export const chatsLoading = () => ({
    type: ActionTypes.CHATS_LOADING
});

export const chatsFailed = (errmess) => ({
    type: ActionTypes.CHATS_FAILED,
    payload: errmess
});

export const addchats = (chats) => ({
    type: ActionTypes.ADD_CHATS,
    payload: chats
});

export const postChat = (receiver, message, data, title, File) => (dispatch) => {

    const newChat = {
        receiver: receiver,
        message: message,
        data: data,
        File: { 'filename': File, 'title': title }
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'addChat', {
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
        .then(response => dispatch(fetchChats()))
        .catch(error => { dispatch(ErrorMess('Your data could not be send')); })
}

export const deleteChat = (_ID) => (dispatch) => {

    const deleteChat = {
        _Id: _ID
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'deleteChat', {
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
        .then(response => dispatch(fetchChats()))
        .catch(error => { dispatch(ErrorMess('You are not authourized to REMOVE this chat')); })
}

export const postFile = (formadata, receiver, message, data, title) => (dispatch) => {
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
        .catch(error => {
            if (error.message == "Error 401: Unauthorized")
                dispatch(ErrorMess('Please LOGIN to chat'));
            else
                dispatch(ErrorMess('Please upload File with valid file extension.'));
            dispatch(Set_default());
        })
}

export const addFile = (name) => ({
    type: ActionTypes.ADD_FILE,
    payload: name
});

export const Set_default = () => ({
    type: ActionTypes.SET_DEFAULT,
    payload: '00'
});

export const ErrorMess = (errmess) => ({
    type: ActionTypes.ErrorMess,
    payload: errmess
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
    alert(JSON.stringify(newUser));
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
        .then(response => alert(response.status))
        .catch(error => { dispatch(ErrorMess('Username Already Taken')); })
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
    dispatch(requestLogin(creds))

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
            throw error;
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                window.location.reload(false);
                // dispatch(fetchContacts());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => alert(error.message))
    //.catch(error => dispatch(loginError(error.message)))
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