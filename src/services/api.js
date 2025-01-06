const BASE_URL = 'https://psw-server.onrender.com';
export const PUBLIC_ID = '30985';
export const PRIVATE_ID = 'opqrs';

// GET Users
export function GetUsers() {
    return fetch(BASE_URL + "/users", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

// GET Heroes from user
export function GetHeroesFromUsers(userID) {
    return fetch(BASE_URL + '/users/' + userID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

// GET top 3 Heroes from user
export function GetTopHeroesFromUsers(userID) {
    return fetch(BASE_URL + '/users/' + userID + '/top', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

// POST hero from user
export function UpdateSuperhero(list) {
    return fetch(BASE_URL + "/users/" + PRIVATE_ID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

// POST top 3 heroes from user
export function UpdateTop(list) {
    return fetch(BASE_URL + "/users/" + PRIVATE_ID + '/top', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}