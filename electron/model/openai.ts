const { Configuration, OpenAIApi } = require("openai");

export async function GegArticleContent(apiKey: string, prompt: string, model: string = 'text-davinci-003', temperature: number = 0, max_tokens: number = 7,
    callback: (err, res) => void) {
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    // finish_reason
    openai.createCompletion({
        model,
        prompt,
        temperature,
        max_tokens,
        n: 1,
        stream: false,
        logprobs: null,
        stop: null
    }, {
        Headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        }
    }).then((res) => {
        // console.log(res.data);
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}