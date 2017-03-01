import chalk from 'chalk';

import api from '../api';
import tables from '../helpers/cli-tables';

class Fixtures {
    constructor() {
        this.leagueCaption;
        this.competition = null;
        this.time = null;
        this.table = null;
    }   

    getCompetition(args) {
        args.league ? this.competition = args.league : null;
        args.time ? this.time = args.time : null;
        this.getFixtures();
    } 

    getFixtures() {
        api.getFixturesByCompetition(this.competition)(data => {
            if (!data.fixtures) {
                return null;
            }

           this.generateFixtures(data);
        }, error => {
            console.error(error)
        })
    }

    generateFixtures(data) {
        this.leagueCaption = data.leagueCaption;
        this.table = tables.fixtures(data.fixtures);
        this.displayTable();
    }

    displayTable() {
        if (this.table) { 
            console.log(`${this.leagueCaption} \n ${this.table}`);
        }
    }
    
}

export default new Fixtures();