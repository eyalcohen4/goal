import processArgs from 'helpers/processArgs';

import table from 'commands/table';


let args = processArgs(process.argv);

let command = args['_'].toString();

switch (command) {
    case 'table':
        table.getCompetition(args)
        break;
}