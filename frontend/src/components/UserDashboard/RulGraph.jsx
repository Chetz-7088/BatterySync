import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    chartOptions,
    fetchRULDataFromLocalStorage,
    prepareChartData,
} from "../../lib/server_actions/utils";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin,
    annotationPlugin
);

const RulGraph = () => {
    const [chartData, setChartData] = useState(null);

    const updateChartData = () => {
        const batteryData = fetchRULDataFromLocalStorage();
        if (batteryData.length) {
            const sortedData = batteryData.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            const data = prepareChartData(sortedData);
            setChartData(data);
        }
    };

    useEffect(() => {
        updateChartData();
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "user") {
                updateChartData();
            }
        };
        window.addEventListener("storage", handleStorageChange);
        const interval = setInterval(() => {
            updateChartData();
        }, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    if (!chartData) {
        return <div>Predict the Remaining Useful Life of your Battery to display it on the graph.</div>;
    }

    return (
        <div className="rul-graph-container">
            <h2>Remaining Useful Life Trend Graph</h2>
            <div className="graph-container">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default RulGraph;
