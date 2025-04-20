import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';

const BatteryChart = ({ rul, batteryColor, batteryCondition }) => {
    const rulPercentage = rul ? (rul * 180) / 100 : 0;
    const remainingPercentage = 180 - rulPercentage;

    return (
        <div className="BatteryChart graphs">
            <h3>Percentage of Current Remaining</h3>
            <h3>Useful Life of the Battery</h3>

            <PieChart
                className="PieChart"
                series={[
                    {
                        data: [
                            { value: rulPercentage, color: batteryColor },
                            { value: remainingPercentage, color: 'rgba(255, 255, 255, 0.5)' },
                        ],
                        arcLabel: (item) => `${(item.value / 180 * 100).toFixed(2)}%`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 90,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                    },
                }}
                width={300}
                height={200}
            />

            {/* External Labels */}
            <div style={{ marginTop: 20 }}>
                <div>
                    <strong>Remaining Useful Life:</strong> {((rulPercentage / 180) * 100).toFixed(2)}%
                </div>
                <div>
                    <strong>Used Life:</strong> {((remainingPercentage / 180) * 100).toFixed(2)}%
                </div>
                <div className="battery-condition-text">{batteryCondition}</div>
            </div>
        </div>
    );
};

export default BatteryChart;
