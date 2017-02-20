export default function jsonToTable(json) {
    if (!json.standings) {
        return null;
    }

    for (let team of json.standings) {
        console.log(team.position);

    }
}