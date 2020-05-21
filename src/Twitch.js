import axios from 'axios'

const client_id = 'lv2risf3grzar6f9jtm83fdct3pqmf'
const acceptLink = 'application/vnd.twitchtv.v5+json'

const TwitchApi = axios.create({
    baseURL: 'https://api.twitch.tv/kraken/',
    headers: {
        'Client-ID': client_id,
        Accept: acceptLink
    }
})

export const GetSearchOptions = async (type, value) => {
    const response = await TwitchApi.get(`search/${type}?query=${value}&live=true`)
    return response.data
}

export const GetGameStreams = async name => {
    const response = await TwitchApi.get(`streams/?game=${name}`)
    return response.data.streams
}

export const GetGameViewedStreams = async name => {
    const response = await TwitchApi.get(`videos/top?game=${name}&period=month`)
    return response.data.vods
}