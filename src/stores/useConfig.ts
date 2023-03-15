import { defineStore } from "pinia";
import { SetConfig } from "@src/model/config";

export const useConfig = defineStore('config', {
    state: () => ({
        apiKey: '',
        prompt: '',
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 7,
        proxy: '',
        content: ''
    }),

    actions: {
        setApiKey(apiKey: string) {
            this.apiKey = apiKey;
            SetConfig({
                apiKey: apiKey, prompt: this.prompt, model: this.model, temperature: this.temperature, max_tokens: this.max_tokens, proxy: this.proxy
            })
        },
        setPrompt(prompt: string) {
            this.prompt = prompt;
            SetConfig({
                apiKey: this.apiKey, prompt: prompt, model: this.model, temperature: this.temperature, max_tokens: this.max_tokens, proxy: this.proxy
            })
        },
        setModel(model: string) {
            this.model = model;
            SetConfig({
                apiKey: this.apiKey, prompt: this.prompt, model: model, temperature: this.temperature, max_tokens: this.max_tokens, proxy: this.proxy
            })
        },
        setTemperature(temperature: number) {
            this.temperature = temperature;
            SetConfig({
                apiKey: this.apiKey, prompt: this.prompt, model: this.model, temperature: temperature, max_tokens: this.max_tokens, proxy: this.proxy
            })
        },
        setMaxTokens(max_tokens: number) {
            this.max_tokens = max_tokens;
            SetConfig({
                apiKey: this.apiKey, prompt: this.prompt, model: this.model, temperature: this.temperature, max_tokens: max_tokens, proxy: this.proxy
            })
        },
        setProxy(proxy: string) {
            this.proxy = proxy;
            SetConfig({
                apiKey: this.apiKey, prompt: this.prompt, model: this.model, temperature: this.temperature, max_tokens: this.max_tokens, proxy: proxy
            })
        }
    }
})