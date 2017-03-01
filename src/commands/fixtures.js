import chalk from 'chalk';

import api from '../api';
import tables from '../helpers/cli-tables';
class Fixtures {
    constructor() {
        this.leagueCaption;
        this.competition = null;
        this.time = false;
        this.next = null;
        this.prev = null;
        this.table = null;
    }   

    getCompetition(args) {
        args.league ? this.competition = args.league : null;

        if (args.next || args.prev) {
            this.time = true;
        }

        args.next ? this.next = `n${args.next}` : null;
        args.prev ? this.prev = `p${args.prev}` : null;

        this.getFixtures();
    } 

    getFixtures() {
        let time;

        if (this.time && this.next) {
            time = this.next;
        } else if (this.time && this.prev) {
            time = this.prev;
        }
    
        api.getFixturesByCompetition(this.competition, time).then(data => {
            if (!data.fixtures) {
                return null;
            }

            this.generateFixtures(data);
        }, error => {
            console.error(error)
        });
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