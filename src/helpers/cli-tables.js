import lodash from 'lodash';
import Tables from 'cli-table';
import moment from 'moment';
import chalk from 'chalk';
import api from '../api';

class CliTables { 

    newTable(head) {
        let headsAlign = [];
        head.map(value => { headsAlign.push('center') })

        return new Tables({
            head: head,
            colAligns: headsAlign
        })
    }

    standings(teams, numOfTeams) {
        let heads = ['Position', 'Club', 'Played', 'Won', 'Draw', 'Lost', 'GF', 'GA', 'GD', 'Points']; 
        let table = this.newTable(heads);
            
        if (numOfTeams) {     
            for (let indexOfTeams = 0; indexOfTeams < numOfTeams; indexOfTeams++) {
                let team = teams[indexOfTeams];

                table.push([
                    team.position, 
                    team.teamName, 
                    team.playedGames, 
                    team.wins, 
                    team.draws, 
                    team.losses,
                    team.goals,
                    team.goalsAgainst,
                    team.goalDifference,
                    team.points
                ])
            }

            return table.toString();
        }

        for (let team of teams) {
            table.push([
                team.position, 
                team.teamName, 
                team.playedGames, 
                team.wins, 
                team.draws, 
                team.losses,
                team.goals,
                team.goalsAgainst,
                team.goalDifference,
                team.points
            ])
        }

        return table.toString();
    
    }

    fixtures(scores) {
        let heads = ['Date', 'Matchday', 'Home', 'HG', 'AG', 'Away', 'HT-Score'];
        let table = this.newTable(heads);

        for (let score of scores) {
            let halftimeScore = score.result.halfTime ? `${score.result.halfTime.goalsHomeTeam} - ${score.result.halfTime.goalsHomeTeam}` : '';

            if (score.status === 'TIMED') {
                table.push([
                    moment.utc(`${score.date}`).format("DD-MM-YYYY HH:mm"),
                    score.matchday,
                    score.homeTeamName,
                    0,
                    0,    
                    score.awayTeamName,
                    '0 - 0'
                ])
            } else {
                  table.push([
                    moment.utc(`${score.date}`).format("DD-MM-YYYY HH:mm"),
                    score.matchday,
                    score.homeTeamName,
                    score.result.goalsHomeTeam,
                    score.result.goalsAwayTeam,    
                    score.awayTeamName,
                    halftimeScore
                ])
            }
        }

        return table.toString();
    }

}

export default new CliTables();