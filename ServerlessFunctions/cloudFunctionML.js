const projectId = 'serverless-project-321023';
const location = 'us-central1';
const modelId = 'TCN6946967351963156480'; 

const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();

async function getCloudModel(content) {
    return new Promise(async (resolve, reject) => {
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                textSnippet: {
                    content: content,
                    mimeType: 'text/plain',
                },
            },
        };

        const [response] = await client.predict(request);
        resolve(response.payload)

    })
}

exports.getMLOutput = async (req, res) => {
    let recipe = req.body.recipe; 
    const response = await getCloudModel(recipe);
    res.status(200).send(response);
};