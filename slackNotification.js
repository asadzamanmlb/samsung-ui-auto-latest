import { WebClient } from '@slack/web-api';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

// Your Slack token (you should store this securely and not hard-code it)
const token = process.env.SLACK_OAUTH_TOKEN;

// Initialize the Slack client
const client = new WebClient(token);

const MIN_PASSING_SCORE = 100.0;

// Load JSON data from file
const jsonData = fs.readFileSync('./reports/timeline-html/index.html.json', 'utf8');
const parsed = JSON.parse(jsonData);

const failedSteps = [];
const passedScenario = [];

// The channel ID you want to send the message to
const channelId = process.env.SLACK_CHANNEL_ID; // Replace with your channel ID

let totalDuration = 0;
let passedScenarios = 0;
let failedScenarios = 0;

// Calculates pass/fail statistics
for (const feature of parsed) {
    for (const scenario of feature.elements) {
        const allStepsPassed = scenario.steps.every(step => step.result.status === "passed");
        if (allStepsPassed) {
            console.log(scenario.name);
            passedScenario.push(`✅ ${scenario.name}`);
        }
        let scenarioPassed = true;
        for (const step of scenario.steps) {
            const stepResult = step.result.status;
            totalDuration += step.result.duration;
            if (stepResult === 'failed' || stepResult === 'skipped') {
                failedSteps.push(`  ❌ ${scenario.name}: ${step.name}`);
            }
            if (step.result.status !== "passed") {
                scenarioPassed = false;
            }
        }
        if (scenarioPassed) {
            passedScenarios += 1;
        } else {
            failedScenarios += 1;
        }
    }
}

const seconds = totalDuration / 1e9;
const minutes = Math.floor(seconds / 60);
const remainingSeconds = Math.floor(seconds % 60);

// Calculate the total number of scenarios
const totalScenarios = passedScenarios + failedScenarios;
// Calculate the percentage of passed scenarios
const passedPercentage = Math.floor((passedScenarios / totalScenarios) * 100);
console.log(`Passed Scenarios Percentage: ${passedPercentage}%`);

let responseMessage = `${passedPercentage}% of test passed`;
responseMessage = passedPercentage >= MIN_PASSING_SCORE ? `🎉 ${responseMessage}` : `❗ ${responseMessage}`;
responseMessage += `\n✅ Passed Scenarios: ${passedScenarios}, ❌ Failed Scenarios: ${failedScenarios}`;
responseMessage += `\nJob Name : ${process.env.JOB_NAME}`;
responseMessage += `\nBuild Log : ${process.env.BUILD_URL}console`;
// responseMessage += `\nJob Name : 'CommonJS_WBD_Automation/webstream-ui-test'`;
// responseMessage += `\nBuild Log : 'https://jenkins.streaming.mlbinfra.net/job/CommonJS_WBD_Automation/job/slack-webstream-ui-test/23/console'`;
responseMessage += `\nTest Duration : ${minutes} minutes and ${remainingSeconds} seconds`;
responseMessage += `\nTest Environment : ${process.env.ENV}`;
responseMessage += `\nDevice : ${process.env.DEVICE}`;

console.log(`Passed Scenarios: ${passedScenarios}, Failed Scenarios: ${failedScenarios}`);
console.log(responseMessage);

// Function to send a message to Slack
async function sendMessage(channelId) {
    try {
        const filePath = "./reports/timeline-html/index.pdf";
        const fileStats = fs.statSync(filePath);
        
        // Step 1: Get the upload URL
        const uploadResponse = await client.files.getUploadURLExternal({
            filename: filePath,
            length: fileStats.size,
        });
        
        const uploadUrl = uploadResponse.upload_url;
        const fileId = uploadResponse.file_id;

        // Step 2: Upload the file to the obtained URL
        const fileStream = fs.createReadStream(filePath);
        const formData = new FormData();
        formData.append('file', fileStream);

        const uploadResult = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        const device = process.env.DEVICE;
        const title = "Test Report - " + device;
        
        if (uploadResult.status === 200) {
            // Step 3: Complete the upload
            await client.files.completeUploadExternal({
                files: [
                    {
                        id: fileId,
                        title: title,
                    }
                ],
                channel_id: channelId, // Specify the channel here
                initial_comment: responseMessage
            });
            console.log("File uploaded and shared successfully");
        } else {
            console.log("Failed to upload file");
        }

    } catch (error) {
        console.log(`Error uploading file: ${error.message}`);
    }
}

// Send the message
sendMessage(channelId);
