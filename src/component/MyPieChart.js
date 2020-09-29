import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";

const RADIAN = Math.PI / 180;

function CustomTooltip({active,payload,label}){
    if(!active) return null;

    return (
        <span className='tooltip_content'>
            {"Matches " + payload[0].name}
        </span>
    )
}

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
      percent?
          (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
          </text>):undefined
  );
};


function MyPieChart({data,teamColors}) {
    return (
        <ResponsiveContainer width={"95%"} height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={"80%"}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => {
                            return (<Cell key={`cell-${index}`} fill={teamColors[index]}/>)
                        })
                    }

                </Pie>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend verticalAlign={"bottom"} iconSize={24}/>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default MyPieChart;