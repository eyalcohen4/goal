import api from '../api';
import tables from '../helpers/cli-tables';

class Table {
    constructor() {
        this.competition = null;
        this.numOfTeams = null;
        this.table = null;
    }   

    getCompetition(args) {
        args.league ? this.competition = args.league : null;
        args.number ? this.numOfTeams = args.number : null;
        this.getTable();
    } 

    getTable() {
        api.getCompetitionTable(this.competition).then(response => {
            this.generateTable(response);
        }, error => {
            console.error(error)
        })
    }

    generateTable(data) {
        if (!data.standing) {
            return null;
        }

       this.table = tables(data.standing, this.numOfTeams);
       this.displayTable();
    }

    displayTable() {
        if (this.table) { 
            console.log(this.table);
        }
    }
}

export default new Table();