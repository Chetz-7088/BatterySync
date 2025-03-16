import React from 'react';
import './BatteryDataTable.css';

const BatteryDataTable = ({ batteryData, handlePagination, currentPage, batteryDataLength }) => {
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="battery-data-table">
            <h3>Battery Data</h3>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>RUL</th>
                        <th>Discharge Time (hrs)</th>
                        <th>Charging Time (hrs)</th>
                        <th>Max Voltage (V)</th>
                        <th>Min Voltage (V)</th>
                    </tr>
                </thead>
                <tbody>
                    {batteryData.map((entry, index) => (
                        <tr key={index}>
                            <td>{formatTimestamp(entry.timestamp)}</td>
                            <td>{entry.rul}</td>
                            <td>{(entry.dischargeTime / 3600).toFixed(2)}</td>
                            <td>{(entry.chargingTime / 3600).toFixed(2)}</td>
                            <td>{entry.maxVoltageDischarge}</td>
                            <td>{entry.minVoltageCharge}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => handlePagination('prev')}
                    disabled={currentPage <= 1}
                >
                    Previous 10
                </button>
                <button
                    onClick={() => handlePagination('next')}
                    disabled={batteryDataLength <= currentPage * 10}
                >
                    Next 10
                </button>
            </div>
        </div>
    );
};

export default BatteryDataTable;
