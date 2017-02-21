import request from 'request';
import chalk from 'chalk';

class API {
    constructor() {
        this.BASE_URL = 'http://api.football-data.org/v1';
        this.header = {
            'X-Auth-Token': process.env.API_KEY
        };
    }
    
    sendRequest(path, data, options) {
        if (!options) {
            return new Promise((resolve, reject) => { 
                request(`${this.BASE_URL}/${path}`, data, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        console.log(error);
                        reject(error);
                    }
                });
            });
        }
            if (options && options.crest) {
                return new Promise((resolve, reject) => {
                    request(path, data, (error, response, body) => {
                        if (!error && response.statusCode === 200) {
                            resolve(body);
                        } else {
                            console.error(chalk.red(error));
                            reject(error);
                        }
                    });
            });
            }
    }

    getCompetitionTable(id) {
        return this.sendRequest(`competitions/${id}/leagueTable`).then(response => {
            if (!response) {
                console.error(chalk.red(`response not found`));
            } 

            return JSON.parse(response); 
        }, error => { 
            console.error(`error: ${error}`); 
            return error 
        })
    }

    getFixture() {

    }

    getCrest(uri) {
       return this.sendRequest(uri, null, {crest: true}).then(response => {
           if (!response) {
               console.error(`response not found`);
           }

           return response;
       }, error => {
           console.error(`error: ${error}`.red)
           return error;
       })
    }

}

export default new API();

