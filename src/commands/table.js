import api from '../api';
import jsonToTable from '../helpers/jsonToTable';

class Table {
    constructor() {
        this.competition = null;
        this.table = null;
    }   

    getCompetition(args) {
        args.league ? this.competition = args.league : null;
        this.getTable();
    } 

    getTable() {
       let table = api.getCompetitionTable(this.competition);
       console.log(table);
       jsonToTable(table);
    }
}

export default new Table();