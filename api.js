const request = require('request');

const baseUrl = 'https://my.zerotier.com/api'

const getNetworks = (errorCallback, successCallback) => {
    let options = {
        auth: {'bearer': zerotierToken},
        json: true
    };

    request.get(`${baseUrl}/network`, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        if (!error && res.statusCode === 200) {
            // do something with JSON, using the 'body' variable
            successCallback(body);
        } else {
            console.log('Failed to get networks')
            errorCallback();
        }
    });
}

const getMembers = (networkId, errorCallback, successCallback) => {
    let options = {
        auth: {'bearer': zerotierToken},
        json: true,
    };

    request.get(`${baseUrl}/network/${networkId}/member`, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        }
        if (!error && res.statusCode === 200) {
            // do something with JSON, using the 'body' variable
            successCallback(body);
        } else {
            console.log('Failed to get members')
            errorCallback();
        }
    });
}

const registerNode = (networkId, nodeId, member, errorCallback, successCallback) => {
    let options = {
        auth: {'bearer': zerotierToken},
        json: true,
        body: member
    };
    request.post(`${baseUrl}/network/${networkId}/member/${nodeId}`, options, (error, res, body) => {
        if (error) {
            console.log('Failed to register member', error)
            errorCallback();
        } else if (!error && res.statusCode === 200) {
            // do something with JSON, using the 'body' variable
            successCallback();
        } else {
            console.log('Failed to register member')
            errorCallback();
        }
    });
}

module.exports = {getNetworks, getMembers, registerNode};
