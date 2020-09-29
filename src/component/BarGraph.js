import React from "react";
import {BarChart, Bar,Cell, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

function BarGraph({winData,teamColors}){
    return (
        winData.length>0?
                (<ResponsiveContainer width="95%" height={400}>
                   <BarChart data={winData} height={400} layout='vertical' strokeDasharray="0 10"
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}>
                       <CartesianGrid/>
                       <XAxis type={'number'} hide/>
                       <YAxis dataKey={'name'} type={'category'} axisLine={false} width={80} hide/>
                       <Tooltip/>

                       <Bar dataKey="winningMatches" label={{fill: 'white', fontSize: 20}} name={'match wins'} legendType={'none'}>
                           {
                               winData.map(
                                   (entry, index) => (<Cell key={index} fill={teamColors[index]}/>)
                               )
                           }
                           <LabelList dataKey={'name'} position={'right'} fill={'black'}/>
                       </Bar>
                   </BarChart>
                </ResponsiveContainer>):(<div>No matches found</div>)


    );
}

export default BarGraph;