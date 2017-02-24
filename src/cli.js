import processArgs from 'helpers/process-args';

import table from 'commands/table';
import fixtures from 'commands/fixtures';

let args = processArgs(process.argv);

let command = args['_'].toString();

switch (command) {
    case 'table':
        table.getCompetition(args)
        break;
    case 'fixtures':
        fixtures.getCompetition(args);
    break;
}