// import request from "request";
import request from 'electron-request';


export async function GegArticleContent(apiKey: string, prompt: string, model: string = '1', temperature: number = 0, max_tokens: number = 7) {

    let messages = []

    switch (parseInt(model)) {
        case 1:
            messages = [
                { "role": "user", "content": prompt }
            ]
            break;
        case 2:
            messages = [
                { "role": "user", "content": "帮我优化SEO, 我告诉你title,你帮我写description" },
                { "role": "user", "content": prompt }
            ]
            break;
        case 3:
            messages = [
                { "role": "user", "content": "帮我优化SEO, 我告诉你title,你帮我写keywords,用,分割" },
                { "role": "user", "content": prompt }
            ]
            break;
        case 4:
            messages = [
                { "role": "user", "content": "帮我优化一下这段话,字数最少200字" },
                { "role": "user", "content": prompt }
            ]
            break;
        case 5:
            messages = [
                { "role": "user", "content": "帮我将这段话翻译为中文,且优化内容,至少200字" },
                { "role": "user", "content": prompt }
            ]
            break;
        case 6:
            messages = [
                { "role": "user", "content": "这是我的内容,帮我起个标题" },
                { "role": "user", "content": prompt }
            ]
            break;
        default:
            messages = [
                { "role": "user", "content": prompt }
            ]
            break;
    }

    const data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages,
        top_p: temperature,
        max_tokens,
        n: 1,
        stream: false,
        stop: null
    })

    return new Promise<string>((resolve, reject) => {
        request('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: data,
        }).then(res => resolve(res.text())).catch(err => reject(err))
    })

}


export async function GetData(apiKey: string, prompt: string, model: string = '1', temperature: number = 0, max_tokens: number = 7) {
    const data = JSON.stringify({
        apiKey, prompt, model, temperature, max_tokens
    })

    return new Promise<string>((resolve, reject) => {
        request('http://42.192.204.130:3059/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        }).then(res => resolve(res.text())).catch(err => reject(err))
    })
}