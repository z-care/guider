import { fetcher } from "./fetcher"


const apiKey = process.env.OPENROUTESERVICE_KEY
const baseUrl = process.env.OPENROUTESERVICE_URL
if (!apiKey) throw new Error(`Invalid/Missing environment variable: "OPENROUTESERVICE_KEY"`)
if (!baseUrl) throw new Error(`Invalid/Missing environment variable: "OPENROUTESERVICE_URL"`)


export const autocomplete = async (text: string) => {
    const param = new URLSearchParams({
        api_key: apiKey,
        text,
    })


    return await fetcher(baseUrl, "/geocode/autocomplete?" + param)
}


export const directions = async (
    start: {
        lat: string,
        lng: string,
    },
    end: {
        lat: string,
        lng: string,
    },
    type: 'foot-walking' | 
    'foot-hiking' |
    'wheelchair' |
    'driving-car' |
    'driving-hgv' |
    'cycling-regular' |
    'cycling-road' |
    'cycling-mountain' |
    'cycling-electric'  = 'foot-walking',
    ) => {
    const param = new URLSearchParams({
        api_key: apiKey,
        start: `${start.lat},${start.lng}`,
        end: `${end.lat},${end.lng}`
    })


    return await fetcher(baseUrl, `/v2/directions/${type}?` + param)
}


