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
            request(`${this.BASE_URL}/${path}`, data, (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    console.log(body);
                    resolve(body);
                } else {
                    console.log(error);
                    reject(error);
                }
             });
        });
    }

    getCompetitionTable(id) {
        this.sendRequest(`competitions/${id}/leagueTable`).then(response => {
            if (!response) {
                console.error(`response not found`);
            } 

            return JSON.parse(response); 
        }, error => { 
            console.log(`error: ${error}`); 
            return error 
        })
    }

    getFixture() {

    }

}

export default new API();

