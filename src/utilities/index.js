import data from "../data";
import {teamShortForms} from "../data";

function winSummaryForTwoTeams(team1,team2,year){
    const years = Object.keys(data);
    const matchData = {};
    years.forEach((year)=>{
       const matches = data[year];
       matchData[year] = matches.filter((match)=>
          (match["team1"]===team1 && match["team2"]===team2) || (match["team2"]===team1 && match["team1"]===team2)
       )
    });
    return teamWinSummary(year,matchData);

}

function teamWinSummary(year,matchData){
    const summary = [];
    const matchSummary = {};
    if(!matchData) matchData = data;
    if(year==='overall'){
        let years = Object.keys(matchData);
        years.forEach(function(year){
           aggregateTeamWin(matchData[year],matchSummary);
        });
    }else{
        aggregateTeamWin(matchData[year],matchSummary);
    }
    let keys = Object.keys(matchSummary);

        keys.forEach((key)=>{
           const teamName = teamShortForms.get(key);
           summary.push({
              name : teamName,
               winningMatches : matchSummary[key]
           });
        });

        summary.sort((a,b)=> {
            if(a.winningMatches>b.winningMatches) return -1;
            return 1;
        });
    return summary;
}

function aggregateTeamWin(matches,matchSummary) {

    matches.forEach((match) => {
        if (match["team1"] === match["winner"]) {
            if (!matchSummary[match["team1"]]) matchSummary[match["team1"]] = 1;
            else matchSummary[match["team1"]]++;
        } else {
            if (!matchSummary[match["team2"]]) matchSummary[match["team2"]] = 1;
            else matchSummary[match["team2"]]++;
        }
    });
}

function findBestPlayers(year,matchData){
    const bestPlayersObj = {};
    let bestPlayersArr = [];
    if(!matchData) matchData = data;
    if(year==='overall'){
        let years = Object.keys(data);
        years.forEach(function(year){
           aggregateBestPlayers(matchData[year],bestPlayersObj);
        });
    }else{
        aggregateBestPlayers(matchData[year],bestPlayersObj);
    }

    const players = Object.keys(bestPlayersObj);
    players.forEach((player)=>{
        bestPlayersArr.push({name: player,numMatches : bestPlayersObj[player]});
    });

    bestPlayersArr = bestPlayersArr.sort((player1,player2)=>
        player1.numMatches>player2.numMatches?-1:1
    ).map((player)=>player.name);
    return ( bestPlayersArr.length<=6 ? bestPlayersArr:bestPlayersArr.slice(0,6));
}

function aggregateBestPlayers(matches,bestPlayersObj){

    matches.forEach((match)=>{
        const player = match["player_of_match"];
        if(!bestPlayersObj[player]) bestPlayersObj[player] = 1;
        else bestPlayersObj[player]++;
    });
}



function findPlayersTeamWise(team1,team2,year){
    const years = Object.keys(data);
    const matchData = {};
    years.forEach((year)=>{
       const matches = data[year];
       matchData[year] = matches.filter((match)=>
          (match["team1"]===team1 && match["team2"]===team2) || (match["team2"]===team1 && match["team1"]===team2)
       )
    });
    return findBestPlayers(year,matchData);
}

function giveSummaryOfTwoTeams(year,team1,team2,cb){
    const years = Object.keys(data);
    const matchData = {};
    years.forEach((year)=>{
       const matches = data[year];
       matchData[year] = matches.filter((match)=>
          (match["team1"]===team1 && match["team2"]===team2) || (match["team2"]===team1 && match["team1"]===team2)
       )
    });

    const summary = {
        lose : 0,
        win : 0
    };

    if(year==='overall'){
        years.forEach((year)=>{
            const matches = matchData[year];
            aggregateOverTwoTeams(matches,cb,summary,team1);
        });
    }else{
        const matches = matchData[year];
        aggregateOverTwoTeams(matches,cb,summary,team1);
    }
    if(summary.win===summary.lose && summary.win===0) return [];
    return ([
        {name : teamShortForms.get(team1) + " won",value : summary.win},
        {name : teamShortForms.get(team2) + " won",value : summary.lose}
    ]);
}

function aggregateOverTwoTeams(matches,cb,obj,team1){
    matches.forEach((match)=>{
       const res = cb(match,team1);
       if(res===2) obj["win"]++;
       else if(res===1) obj["lose"]++;
    });
}

function giveSummaryOfATeam(year,team,cb){
    const years = Object.keys(data);
    const matchData = {};
    years.forEach((year)=>{
       const matches = data[year];
       matchData[year] = matches.filter((match)=> (match["team1"]===team) || (match["team2"]===team))
    });

    const summary = {
      lose : 0,
      win : 0
    };

    if(year==='overall'){
        years.forEach((year)=>{
            const matches = matchData[year];
            aggregateOverATeam(matches,cb,summary,team);
        });
    }else{
        const matches = matchData[year];
        aggregateOverATeam(matches,cb,summary,team);
    }

   if(summary.win===summary.lose && summary.win===0) return [];
   return ([
        {name : "win",value : summary.win},
        {name : "lose",value : summary.lose}
    ]);

}

function aggregateOverATeam(matches,cb,obj,team){
    matches.forEach((match)=>{
        const res = cb(team,match);
        if(res===2) obj["win"]++;
        else if(res===1) obj["lose"]++;
    });
}

function giveSummaryOverAllTeam(year,cb){
    const years = Object.keys(data);
    const summary = {
        lose: 0,
        win : 0
    };
    if(year==='overall'){
        years.forEach((year)=>{
            const matches = data[year];
            aggregateOverAllTeam(matches,cb,summary);
        })
    }else{
        const matches = data[year];
        aggregateOverAllTeam(matches,cb,summary);
    }
    return ([
        {name : "win",value : summary.win},
        {name : "lose",value : summary.lose}
    ]);
}

function aggregateOverAllTeam(matches,cb,obj) {
    matches.forEach((match) => {
        if (cb(match)) {
            obj["win"]++;
        } else {
            obj["lose"]++;
        }
    });
}


export {teamWinSummary,
    findBestPlayers,
    winSummaryForTwoTeams,
    findPlayersTeamWise,
    giveSummaryOfTwoTeams,
    giveSummaryOfATeam,
    giveSummaryOverAllTeam
};