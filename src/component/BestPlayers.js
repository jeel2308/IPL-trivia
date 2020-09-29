import React from 'react';
import "../css/players.css";

function BestPlayers({data}){
    return (
        <div>
            <div id='best_player_title'>Best Players</div>
                {
                    data.map((player)=>(<div key={player} className='players'>{player}</div>))
                }
        </div>
    );
}

export default BestPlayers;