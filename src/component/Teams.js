import React,{useState,useEffect} from "react";
import {teams,teamShortForms} from "../data";
import {giveSummaryOfATeam} from "../utilities";
import {colorMap,colors} from "../config";
import MyPieChart from "./MyPieChart";
import "../css/teams.css";


function Teams(){

    const [team,setTeam] = useState(teams[0]);
    const [year,setYear] = useState("overall");
    const [tossWinMatchWin,setTossWinMatchWin] = useState([]);
    const [tossLoseMatchWin,setTossLoseMatchWin] = useState([]);
    const [teamColors,setTeamColors] = useState([]);
    const [winFirstBat,setWinFirstBat] = useState([]);
    const [winFirstField,setWinFirstField] = useState([]);

    function winTossWinMatchForATeam(team,match){
        if(match["toss_winner"]===team){
            if(match["winner"]===team) return 2;
            return 1;
        }
        return 0;
    }

    function loseTossWinMatchForATeam(team,match){
        if(match["toss_winner"]!==team){
            if(match["winner"]===team) return 2;
            return 1;
        }
        return 0;
    }

    function winFirstBatForTeam(team,match){
        if((match["toss_winner"]===team && match["toss_decision"]==="bat")
            || (match["toss_winner"]!==team && match["toss_decision"]==="field")) {
                    if(match["winner"]===team) return 2;
                    return 1;
                }
        return 0;
    }

    function winFirstFieldForTeam(team,match){
        if((match["toss_winner"]!==team && match["toss_decision"]==="bat")
                    || (match["toss_winner"]===team && match["toss_decision"]==="field")) {
                    if(match["winner"]===team) return 2;
                    return 1;
                }
        return 0;
    }

    function updateState(year,team){
        setTossWinMatchWin(giveSummaryOfATeam(year,team,winTossWinMatchForATeam));
        setTossLoseMatchWin(giveSummaryOfATeam(year,team,loseTossWinMatchForATeam));
        setWinFirstBat(giveSummaryOfATeam(year,team,winFirstBatForTeam));
        setWinFirstField(giveSummaryOfATeam(year,team,winFirstFieldForTeam));
    }

    function updateColors(team){
        const teamColors  = [];
        teamColors.push( colors[ colorMap.get(teamShortForms.get(team)) ] );
        teamColors.push("#2C5F2D");
        setTeamColors(teamColors);
    }

    useEffect(()=>{
        updateState('overall',teams[0]);
        updateColors(teams[0]);
    },[]);

    function upDateTeam(e){
        const val = e.target.value;
        setTeam(val);
        updateState(year,val);
        updateColors(val);
    }

    function updateYear(e){
        const val = e.target.value;
        setYear(val);
        updateState(val,team);
    }

    return (
      <div>
          <div className='select_box_container make_responsive_686'>
          <select value={team} onChange={upDateTeam} className='select_teams margin20'>
              {teams.map((teamName)=>(
                  <option value={teamName} key={teamName}>{teamName}</option>
              ))}
          </select>
          <select value={year} onChange={updateYear} className='select_year margin20 marginleft0'>
                    <option value='overall'>Overall (2008-2017)</option>
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
          {
              (tossWinMatchWin.length>0 || tossLoseMatchWin.length>0)?(
                  <>
              <div className={'team_performance_header'}>Winning Chances of {team} in different situations</div>

              <div className='home_container'>
              <div className='child_container'>
              <div className='child_container_label'>When they won toss</div>
              <MyPieChart data={tossWinMatchWin} teamColors={teamColors} />
              </div>
              <div className='child_container'>
              <div className='child_container_label'>When they loss toss</div>
              <MyPieChart data={tossLoseMatchWin} teamColors={teamColors} />
              </div>
              </div>
              <div className={'home_container'}>
              <div className={'child_container'}>
              <div className='child_container_label'>When they bat first</div>
              <MyPieChart data={winFirstBat} teamColors={teamColors} />
              </div>
              <div className='child_container'>
              <div className='child_container_label'>When they bat second</div>
              <MyPieChart data={winFirstField} teamColors={teamColors} />
              </div>
              </div>
              </>):(
                  <div className='team_performance_header'>
                      Never Played any match
                  </div>
              )}
      </div>
    );
}

export default Teams;