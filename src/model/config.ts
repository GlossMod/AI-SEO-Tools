import { join } from 'node:path'
import { readFileSync, writeFile } from 'node:fs'
import { useConfig } from '@src/stores/useConfig'
import { el } from 'element-plus/es/locale'

const configFile = function () {
    let configPath = 'config.json'
    if (process.env.NODE_ENV === 'development') {
        // 开发环境
        let publicPath = join(process.env.DIST_ELECTRON || '', '../public')
        configPath = join(publicPath, 'config.json')
    } else {
        // 生产环境
        configPath = join(process.resourcesPath, 'config.json')
    }

    // 如果文件不存在则创建一个空文件
    if (!readFileSync(configPath, 'utf-8')) {
        writeFile(configPath, '', { encoding: 'utf-8', flag: 'w' }, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    return configPath

}

export function GetConfig() {
    // 读取 config.json 文件
    let configPath = configFile()

    let config: any = readFileSync(configPath, 'utf-8')
    config = JSON.parse(config)
    return {
        apiKey: config.apiKey || '',
        prompt: config.prompt || '',
        model: config.model || 1,
        temperature: config.temperature || 0.6,
        max_tokens: config.max_tokens || 300,
        proxy: config.proxy || '',
    }
}

export function SetConfig(data: any) {
    let configPath = configFile()

    data = JSON.parse(JSON.stringify(data))
    console.log(data);

    // 格式化存入文件
    const config = JSON.stringify(data, null, "\t")
    writeFile(configPath, config, { encoding: 'utf-8', flag: 'w' }, function (err) {
        if (err) {
            console.log(err)
        }
    })
}

export function initialization() {
    const config = useConfig()

    let data = GetConfig()
    config.apiKey = data.apiKey
    config.prompt = data.prompt
    config.model = data.model
    config.temperature = data.temperature
    config.max_tokens = data.max_tokens
    config.proxy = data.proxy
}