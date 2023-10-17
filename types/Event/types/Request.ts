export interface PostLoginEventRequest {
    body: { [key: string]: any },
    geoip: PostLoginEventRequestGeoip,
    hostname: String | undefined,
    ip: String,
    language: String | undefined,
    method: String,
    query: { [key: string]: any },
    user_agent: String | undefined
}

interface PostLoginEventRequestGeoip {
    cityName: String | undefined,
    continentCode: String | undefined,
    countryCode: String | undefined,
    countryCode3: String | undefined,
    countryName: String | undefined,
    latitude: String | undefined,
    longitude: String | undefined,
    subdivisionCode: String | undefined,
    subdivisionName: String | undefined,
    timeZone: String | undefined
}