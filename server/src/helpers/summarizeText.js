import aiplatform from '@google-cloud/aiplatform';
import dotenv from "dotenv";

dotenv.config();

const project = process.env.YOUR_PROJECT_ID;
const location = process.env.YOUR_PROJECT_LOCATION;

// Imports the Google Cloud Prediction service client
const { PredictionServiceClient } = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const { helpers } = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const publisher = 'google';
const model = 'text-bison@001';

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

export async function summarizeText(text, numberOfParagraph) {
    // Configure the parent resource
    const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

    const instance = {
        content: `Provide a summary with about ${numberOfParagraph} paragraph for the following article: ${text}`,
    };
    const instanceValue = helpers.toValue(instance);
    const instances = [instanceValue];

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 256,
        topP: 0.95,
        topK: 40,
    };
    const parameters = helpers.toValue(parameter);

    const request = {
        endpoint,
        instances,
        parameters,
    };

    // Predict request
    const [response] = await predictionServiceClient.predict(request);
    console.log('Get text summarization response');
    const predictions = response.predictions;
    console.log('\tPredictions :');

    for (const prediction of predictions) {
        console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
    }
}
