import request from 'request';

class API {
    constructor() {
        this.BASE_URL = 'http://api.football-data.org/v1';
        this.header = {
            'X-Auth-Token': process.env.API_KEY
        };
    }
    
    sendRequest(path, data, options) {
        return new Promise((resolve, reject) => {
            request(`${this.BASE_URL}${path}`, data, (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
             });
        });
    }
}

export default new API();