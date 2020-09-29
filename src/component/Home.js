import React from "react";

import {useState,useEffect} from "react";
import {teamWinSummary,findBestPlayers} from "../utilities";
import {colorMap,colors} from "../config/index";
import BestPlayers from "./BestPlayers";
import BarGraph from "./BarGraph";
import MyPieChart from "./MyPieChart";
import {giveSummaryOverAllTeam} from "../utilities";





function Home(){

    const [winData,setWinData] = useState([]);
    const [teamColors,setTeamColors] = useState(colors);
    const [topPlayers,setTopPlayers] = useState([]);
    const [year,setYears] = useState('overall');
    const [batFirstWin,setBatFirstWin] = useState([]);
    const [winFirstToss,setWinFirstToss] = useState([]);

    // callback function to find winning summary over all teams
    function winFirstTossOverall(match){
        return (match["toss_winner"]===match["winner"]);
    }

    // callback function to find winning chances for batting first team
    function winFirstBatOverall(match){
        if((match["toss_winner"]===match["team1"] && match["toss_decision"]==="bat" )
                    || (match["toss_winner"]!==match["team1"] && match["toss_decision"]==="field")) {
                    if(match["winner"]===match["team1"]) return true;
                }
        if((match["toss_winner"]===match["team1"] && match["toss_decision"]==="field" )
                    || (match["toss_winner"]!==match["team1"] && match["toss_decision"]==="bat")) {
                    if(match["winner"]===match["team2"]) return true;
        }
        return false;
    }

    function updateCriteria(year){
        setYears(year);
        const summary = teamWinSummary(year);
        setWinData(summary);
        const newTeamColors = summary.map((teamSummary)=>colors[colorMap.get(teamSummary['name'])]);
        setTeamColors(newTeamColors);
        setTopPlayers(findBestPlayers(year));
        setWinFirstToss(giveSummaryOverAllTeam(year,winFirstTossOverall));
        setBatFirstWin(giveSummaryOverAllTeam(year,winFirstBatOverall));
    }

    //set state when component initially mounts
    useEffect(()=>{
        const summary = teamWinSummary('overall');
        setWinData(summary);
    },[]);

    useEffect(()=>{
        const bestPlayers = findBestPlayers('overall');
        setTopPlayers(bestPlayers);
    },[]);

    useEffect(()=>{
        setWinFirstToss(giveSummaryOverAllTeam('overall',winFirstTossOverall));
        setBatFirstWin(giveSummaryOverAllTeam('overall',winFirstBatOverall));
    },[]);

    return (

         <div id='home_page'>

             <div className='welcome_msg'>
                 <div>Welcome To IPL-TRIVIA</div>
                 <div>Know amazing stats of your team</div>
             </div>

             <div className='select_box_container'>
             <span id='header'>Select Years</span>
             <select className='select_year margintopbottom' value={year} onChange={(e)=>updateCriteria(e.target.value)}>
                <option value='overall'>Overall(2008-2017)</option>
                <option value='2008'>2008</option>
                <option value='2009'>2009</option>
                <option value='2010'>2010</option>
                <option value='2011'>2011</option>
                <option value='2012'>2012</option>
                <option value='2013'>2013</option>
                <option value='2014'>2014</option>
                <option value='2015'>2015</option>
                <option value='2016'>2016</option>
                <option value='2017'>2017</option>
             </select>
             </div>
             <div className='home_container'>
                 <div className='child_container'>
                     <div id='match_win_title'>Most Wins</div>
                     <BarGraph winData={winData} teamColors={teamColors} />
                 </div>
                 <div className='child_container'>
                     <BestPlayers data={topPlayers} />
                 </div>
             </div>
             <div className='home_container'>
                 <div className='child_container'>
                     <div className='child_container_label'>Winning Chances for first batting Team</div>
                     <MyPieChart teamColors={["#0081E9","#FF822A"]} data={batFirstWin} />
                 </div>
                 <div className='child_container'>
                      <div className='child_container_label'>Winning Chances for toss Winning Team</div>
                      <MyPieChart data={winFirstToss} teamColors={["#0081E9","#FF822A"]} />
                 </div>
             </div>
         </div>

    )
}



export default Home;