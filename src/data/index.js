const data = require('./csvjson.json');

const obj = {
    "2008" : [],
    "2009" : [],
    "2010" : [],
    "2011" : [],
    "2012" : [],
    "2013" : [],
    "2014" : [],
    "2015" : [],
    "2016" : [],
    "2017" : []
};

const teams = [];

data.forEach((match)=>{
   obj['' + match.season].push(match);
   if(teams.indexOf(match["team1"])===-1) teams.push(match["team1"]);
});

const teamShortForms = new Map();
teams.forEach((team)=>{
   const str = team.split(' ').map((str)=>str[0]).reduce((a,c)=>a + c);
   teamShortForms.set(team,str);
});

export {teams,teamShortForms};
export default obj;