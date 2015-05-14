import fetch from 'whatwg-fetch';

const API_URL = '/api';

function request(command, callback) {
    //TODO whatwg-fetch don't export fetch function only on global context
    window.fetch(API_URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(typeof command === 'string' ? {command: command} : command)
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(function(json) {
        callback(json || {});
    });
}

export {request};
