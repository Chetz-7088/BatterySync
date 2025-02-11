const { spawn } = require("child_process");

const predictRUL = (dischargeTime, decrement, maxVoltageDischarge, minVoltageCharge, timeAt4_15v, timeConstantCurrent, chargingTime) => {
    return new Promise((resolve, reject) => {
        // Ensure all inputs are valid numbers
        if (
            isNaN(dischargeTime) || isNaN(decrement) || isNaN(maxVoltageDischarge) ||
            isNaN(minVoltageCharge) || isNaN(timeAt4_15v) || isNaN(timeConstantCurrent) || isNaN(chargingTime)
        ) {
            return reject("Missing or invalid data");
        }

        // Spawn the Python process and pass the inputs as string arguments
        const pythonProcess = spawn("python", [
            "./MLmodel/lithiumIon_rul.py",
            String(dischargeTime),
            String(decrement),
            String(maxVoltageDischarge),
            String(minVoltageCharge),
            String(timeAt4_15v),
            String(timeConstantCurrent),
            String(chargingTime)
        ]);

        let result = "";
        let errorOutput = "";

        // Capture data from Python process
        pythonProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        // Capture any errors from Python process
        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    // If result is empty, reject
                    if (!result.trim()) {
                        return reject("Empty response from Python script");
                    }

                    // Try to extract the JSON string from the result
                    const jsonStart = result.indexOf("{");
                    const jsonEnd = result.lastIndexOf("}") + 1;

                    // Ensure proper JSON format is present
                    if (jsonStart === -1 || jsonEnd === 0) {
                        return reject("Invalid JSON response from Python script");
                    }

                    const jsonString = result.substring(jsonStart, jsonEnd);
                    let parsedResult;

                    try {
                        parsedResult = JSON.parse(jsonString);  // Parse the JSON string
                    } catch (jsonErr) {
                        return reject("Error parsing JSON response from Python: " + jsonErr.message);
                    }

                    // Extract the predictedRUL value from the parsed JSON object
                    if (parsedResult && parsedResult.predictedRUL !== undefined) {
                        const predictedRUL = parseFloat(parsedResult.predictedRUL);
                        if (isNaN(predictedRUL)) {
                            return reject("Invalid RUL value returned by Python script");
                        }

                        // Return the predicted RUL value as a float
                        return resolve(predictedRUL);
                    } else {
                        return reject("No predictedRUL field in the response");
                    }
                } catch (err) {
                    reject(`Error in Python process: ${err.message}`);
                }
            } else {
                reject(`Python process exited with code ${code}: ${errorOutput}`);
            }
        });
    });
};

module.exports = { predictRUL };
