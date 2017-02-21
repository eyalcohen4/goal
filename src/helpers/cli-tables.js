import Tables from 'cli-table';
import api from '../api';
import png from 'console-png';

export default function standings(teams, numOfTeams) {
    if (!numOfTeams) { 
        let table = new Tables({
            head: ['Position', 'Club', 'Played', 'Won', 'Draw', 'Lost', 'GF', 'GA', 'GD', 'Points']
        });
        
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
}