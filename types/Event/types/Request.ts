/**
 * Details about the request that initiated the transaction.
 */
export interface EventRequest {
  /**
   * The body of the POST request. This data will only be available during refresh token and Client Credential Exchange flows.
   */
  body: { [key: string]: any };
  geoip: EventRequestGeoip;
  /**
   * The hostname that is being used for the authentication flow.
   */
  hostname: string | undefined;
  /**
   * The originating IP address of the request.
   */
  ip: string;
  /**
   * The language requested by the browser.
   */
  language: string | undefined;
  /**
   * The HTTP method used for the request.
   */
  method: string;
  /**
   * The query string parameters sent to the authorization request.
   */
  query: { [key: string]: any };
  /**
   * The value of the User-Agent header received when initiating the transaction.
   */
  user_agent: string | undefined;
}

interface EventRequestGeoip {
  cityName?: string | undefined;
  continentCode?: string | undefined;
  countryCode?: string | undefined;
  countryCode3?: string | undefined;
  countryName?: string | undefined;
  latitude?: string | undefined;
  longitude?: string | undefined;
  subdivisionCode?: string | undefined;
  subdivisionName?: string | undefined;
  timeZone?: string | undefined;
}
