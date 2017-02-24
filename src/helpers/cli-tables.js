import Tables from 'cli-table';
import chalk from 'chalk';
import api from '../api';

export default function standings(teams, numOfTeams) {
    let table = new Tables({
        head: ['Position', 'Club', 'Played', 'Won', 'Draw', 'Lost', 'GF', 'GA', 'GD', 'Points']
    });
        
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