import React,{useState} from 'react';
import './data/index';
import './App.css';
//css for home
import "./css/home.css";
//css for teams
import "./css/teams.css";
//css for two-teams
import "./css/twoteams.css";
import {BrowserRouter as Router,Route,NavLink,Switch} from 'react-router-dom';
import Home from "./component/Home";
import * as url from "./Images/bar.png";
import Loadable from "react-loadable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TwoTeams from "./component/TwoTeams";
import Loader from 'react-loader-spinner';

// loading component which is rendered when other components are loading
function LoadingComponent() {

	 return(
	     <div className='loader'>
             <Loader
                 type="Oval"
                 color="#00BFFF"
                 height={100}
                 width={100}
             />
	     </div>
	 );

 }


// for lazy loading
const Teams = Loadable({
    loader : () => import('./component/Teams'),
    loading : LoadingComponent
});

// const TwoTeams = Loadable({
//     loader : () => import('./component/TwoTeams'),
//     loading : LoadingComponent
// })



const pathToTextMapping = new Map();
pathToTextMapping.set("/","Home");
pathToTextMapping.set("/teams","Stats for team");
pathToTextMapping.set("/two-teams","Team and Opponent");



function App() {

    const [isVisible,setVisibility] = useState(false); //for toggeling visiblity of small navbar
    const [activeLinkName,setActiveLinkName] = useState("Home"); // for displaying active link for small navbar

    function activeLink(match,location){
        if(match) {
            setActiveLinkName(pathToTextMapping.get(location.pathname));
        }
    }

    function updateVisibility(){
        setVisibility(!isVisible);
    }

  return (
    <Router>
        <div className='navbar_parent'>
            <ul id={'navbar'}>

                <li>
                    <NavLink to='/' exact={true} isActive={activeLink} >Home</NavLink>
                </li>
                <li>
                    <NavLink to='/teams' isActive={activeLink} >Stats for team</NavLink>
                </li>
                <li>
                    <NavLink to='/two-teams' isActive={activeLink} >Team and Opponent</NavLink>
                </li>
            </ul>

            <div className='small_screen_navbar'>
                <div className='active_row_navbar'>
                    <div className='active_content'>{activeLinkName} </div>
                    <div className='img_parent'><img src={url} alt='img' onClick={updateVisibility}/></div>
                </div>
                <div style={{display : isVisible?"initial":"none"}} >
                    <div onClick={updateVisibility}><NavLink to='/'>Home</NavLink></div>
                    <div onClick={updateVisibility}><NavLink to='/teams'>stats for team</NavLink></div>
                    <div onClick={updateVisibility}><NavLink to='/two-teams'>Team and Opponent</NavLink></div>
                </div>
            </div>
        </div>
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/teams'>
                <Teams />
            </Route>
            <Route path='/two-teams'>
                <TwoTeams />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
