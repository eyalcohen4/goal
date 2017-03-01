import request from 'request';
import emoji from 'node-emoji';
import chalk from 'chalk';

import fs from 'fs';

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
                    if (!error && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(error);
                    }
                });
            });
        }

    getCompetitionTable(id) {
        return this.sendRequest(`competitions/${id}/leagueTable`).then(response => {
            return JSON.parse(response); 
        }, error => { 
            console.error(emoji.get('confused'), chalk.red(` - Can't Get Data, So Sorry!`));
            return error 
        })
    }

    getFixturesByCompetition(id, time) {
        if (time) {
            return this.sendRequest(`competitions/${id}/fixtures?timeFrame=${time}`).then(response => {
                return JSON.parse(response);
            }, error => {
                console.error(emoji.get('confused'), chalk.red(` - Can't Get Data, So Sorry!`));
                return error;            
            })
        } else { 
            return this.sendRequest(`competitions/${id}/fixtures`).then(response => {
                return JSON.parse(response);
            }, error => {
                console.error(emoji.get('confused'), chalk.red(` - Can't Get Data, So Sorry!`));
                return error;            
            })
        }
    }

}

export default new API();

