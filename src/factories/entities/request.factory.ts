import { EventRequest, EventRequestGeoip } from "../../types/Event";

export class MockRequest {
  private _request: EventRequest;

  constructor() {
    this._request = {
      body: {},
      geoip: {},
      hostname: "test.auth0.com",
      ip: "0.0.0.0",
      language: "de",
      method: "POST",
      query: {},
      user_agent: "example-user-agent",
    };
  }

  fromIp(ip: string): MockRequest {
    this._request.ip = ip;
    return this;
  }
  setGeoIp(geoip: EventRequestGeoip): MockRequest {
    this._request.geoip = geoip;
    return this;
  }
  setHostname(hostname: string): MockRequest {
    this._request.hostname = hostname;
    return this;
  }
  setUserAgent(userAgent: string): MockRequest {
    this._request.user_agent = userAgent;
    return this;
  }
  withBody(body: { [key: string]: unknown }): MockRequest {
    this._request.body = body;
    return this;
  }
  withQuery(query: { [key: string]: unknown }): MockRequest {
    this._request.query = query;
    return this;
  }
  withLanguage(lang: string): MockRequest {
    this._request.language = lang;
    return this;
  }
  withMethod(method: "GET" | "POST"): MockRequest {
    this._request.method = method;
    return this;
  }

  build(): EventRequest {
    Object.freeze(this);
    return this._request;
  }
}
