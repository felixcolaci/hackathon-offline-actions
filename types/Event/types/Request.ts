/**
 * Details about the request that initiated the transaction.
 */
export interface EventRequest {
    /**
     * The body of the POST request. This data will only be available during refresh token and Client Credential Exchange flows.
     */
    body: { [key: string]: any },
    geoip: EventRequestGeoip,
    /**
     * The hostname that is being used for the authentication flow.
     */
    hostname: String | undefined,
    /**
     * The originating IP address of the request.
     */
    ip: String,
    /**
     * The language requested by the browser.
     */
    language: String | undefined,
    /**
     * The HTTP method used for the request.
     */
    method: String,
    /**
     * The query string parameters sent to the authorization request.
     */
    query: { [key: string]: any },
    /**
     * The value of the User-Agent header received when initiating the transaction.
     */
    user_agent: String | undefined
}

interface EventRequestGeoip {
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