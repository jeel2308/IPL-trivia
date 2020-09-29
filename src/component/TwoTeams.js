import React,{useState,useEffect} from "react";
import {teams} from "../data";
import {colorMap,colors} from "../config";
import BarGraph from "./BarGraph";
import {winSummaryForTwoTeams,findPlayersTeamWise,giveSummaryOfTwoTeams} from "../utilities";
import BestPlayers from "./BestPlayers";
import MyPieChart from "./MyPieChart";



function TwoTeams(){

    const [firstTeam,setFirstTeam] = useState(teams[0]); // state for first team
    const [secondTeam,setSecondTeam] = useState(teams[1]); // state for second team
    const [year,setYears] = useState('overall'); //state for years

    const [winData,setWinData] = useState([]); //state for winning summary
    const [teamColors,setTeamColors] = useState(colors); //state for team colors

    const [tossWinMatchWin1,setTossWinMatchWin1] = useState([]); // winning summary for winning toss team(for team1)
    const [tossWinMatchWin2,setTossWinMatchWin2] = useState([]); // winning summary for winning toss team(for team2)

    const [batFirstMatchWin1,setBatFirstMatchWin1] = useState([]); // winning summary for first batting team(for team1)
    const [batFirstMatchWin2,setBatFirstMatchWin2] = useState([]); //// winning summary for first batting team(for team1)

    const [topPlayers,setTopPlayers] = useState([]); //best players of both team

    //set state when component mounts initially
    useEffect(()=>{
        updateTeamState(teams[0],teams[1],"overall");
    },[]);

    function updateCriteria(e){
        setYears(e.target.value);
        updateTeamState(firstTeam,secondTeam,e.target.value);
    }

    // callback function to find chances of winning match for a team winning toss
    function winTossWinMatchSummary(match,team1){
        if(match["toss_winner"]===team1){
            if(match["winner"]===team1){
                return 2;
            }
            return 1;
        }
        return 0;
    }

    // callback function to find chances of winning match for a team batting first
    function winFirstBat(match,team1){
        if((match["toss_winner"]===team1 && match["toss_decision"]==="bat")
                    || (match["toss_winner"]!==team1 && match["toss_decision"]==="field")) {
                    if(match["winner"]===team1) return 2;
                    return 1;
                }
        return 0;
    }


    function updateSelection(value,isFirst){
        if(isFirst)setFirstTeam(value);
        else setSecondTeam(value);
        if(firstTeam!=="Team 1" && secondTeam!=="Team 2") {
            if(isFirst) updateTeamState(value,secondTeam,year);
            else updateTeamState(firstTeam,value,year);
        }
    }

    function updateTeamState(team1,team2,year){
        const summary = winSummaryForTwoTeams(team1,team2,year);
        setWinData(summary);
        const newTeamColors = summary.map((teamSummary)=>colors[colorMap.get(teamSummary['name'])]);
        setTeamColors(newTeamColors);
        setTossWinMatchWin1(giveSummaryOfTwoTeams(year,team1,team2,winTossWinMatchSummary));
        setTossWinMatchWin2(giveSummaryOfTwoTeams(year,team2,team1,winTossWinMatchSummary));
        setBatFirstMatchWin1(giveSummaryOfTwoTeams(year,team1,team2,winFirstBat));
        setBatFirstMatchWin2(giveSummaryOfTwoTeams(year,team2,team1,winFirstBat));
        setTopPlayers(findPlayersTeamWise(team1,team2,year));
    }

    return (
        <>
            <div className='select_box_container responsive_at_1010'>
                <div className='select_box_child'>
                    <select value={firstTeam} className='select_teams margin20' onChange={(e)=>updateSelection(e.target.value,true)}>
                        {
                            teams.filter((team)=>team!==secondTeam).map((team)=>(<option key={team} value={team}>{team}</option>))
                        }
                    </select>

                    <select value={secondTeam} className='select_teams margin20 marginleft0' onChange={(e)=>updateSelection(e.target.value,false)}>
                        {
                            teams.filter((team)=>team!==firstTeam).map((team)=>(<option key={team} value={team}>{team}</option>))
                        }
                    </select>
                </div>

                <select className='select_teams marginleft0 margin_bottom' value={year} onChange={updateCriteria}>
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

            {  winData.length>0?
                (<>
                        <div className={'team_performance_header'}>Winning Chances of each team in different situations</div>

                <div className='home_container'>
                <div className='child_container'>
                <div id='match_win_title'>Most Wins</div>
                <BarGraph teamColors={teamColors} winData={winData} />
                </div>
                <div className='child_container'>
                <BestPlayers data={topPlayers} />
                </div>
                </div>

                <div className='home_container'>
                <div className='child_container'>
                    {/* if this array is empty means team never won match by winning toss */}
                     { tossWinMatchWin1.length>0 ? (
                         <>
                           <div className='child_container_label'>When {firstTeam} won toss</div>
                           <MyPieChart data={tossWinMatchWin1} teamColors={teamColors} />
                         </>
                         ):(
                         <div className='child_container_label'>{firstTeam} never won toss</div>
                     )}
                     </div>

                     <div className={'child_container'}>
                         {/* if this array is empty means team never won match by winning toss */}
                         {tossWinMatchWin2.length>0? (
                             <>
                             <div className='child_container_label'>When {secondTeam} won toss</div>
                             <MyPieChart data={tossWinMatchWin2} teamColors={[teamColors[1], teamColors[0]]} />
                             </>
                             ):(
                             <div className='child_container_label'>{secondTeam} never won toss</div>
                         )}
                     </div>
                </div>


                <div className='home_container'>
                        <div className='child_container'>
                            {/* if this array is empty means team never won match by batting first */}
                            {batFirstMatchWin1.length>0 ?
                                (<>
                                <div className='child_container_label'>When {firstTeam} bat first</div>
                                <MyPieChart data={batFirstMatchWin1} teamColors={teamColors}/>
                                </>):(
                                    <div className='child_container_label'>{firstTeam} never won by first batting</div>
                                )
                            }
                        </div>

                        <div className='child_container'>
                            {/* if this array is empty means team never won match by batting first */}
                            {batFirstMatchWin2.length>0 ? (
                                <>
                                <div className='child_container_label'>When {secondTeam} bat first</div>
                                <MyPieChart data={batFirstMatchWin2} teamColors={[teamColors[1], teamColors[0]]}/>
                                </>
                                ):(
                                <div className='child_container_label'>{secondTeam} never won by first batting</div>
                                )}
                        </div>
                </div>
                        </>):(
                    <div className='welcome_msg'>No Matches Played</div>
                )
            }
        </>
    );
}

export default TwoTeams;
