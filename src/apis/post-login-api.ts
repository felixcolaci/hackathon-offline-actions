import {
  ApiAccess,
  ApiAccessToken,
  ApiAuthentication,
  ApiCache,
  ApiIdToken,
  ApiMultifactor,
  ApiRedirect,
  ApiSAMLResponse,
  ApiUser,
  PostLoginAPI,
} from "@auth0-testing/types/API";

export class MockPostLoginApi implements PostLoginAPI {
  access: ApiAccess;
  accessToken: ApiAccessToken;
  authentication: ApiAuthentication;
  cache: ApiCache;
  idToken: ApiIdToken;
  multifactor: ApiMultifactor;
  user: ApiUser;
  redirect: ApiRedirect;
  samlResponse: ApiSAMLResponse;

  constructor() {
    this.access = new MockAccess();
    this.accessToken = new MockAccessToken();
    this.authentication = new MockAuthentication();
    this.cache = new MockCache();
    this.idToken = new MockIdToken();
    this.multifactor = new MockMultifactor();
    this.user = new MockUser();
    this.redirect = new MockRedirect();
    this.samlResponse = new MockSAMLResponse();
  }
}

class MockAccess implements ApiAccess {
  deny = jest.fn();
}

class MockAccessToken implements ApiAccessToken {
  setCustomClaim = jest.fn();
  addScope = jest.fn();
  removeScope = jest.fn();
}

class MockAuthentication implements ApiAuthentication {
  recordMethod = jest.fn();
  challengeWith = jest.fn();
  challengeWithAny = jest.fn();
}

class MockCache implements ApiCache {
  delete = jest.fn();
  get = jest.fn();
  set = jest.fn();
}

class MockIdToken implements ApiIdToken {
  setCustomClaim = jest.fn();
}

class MockMultifactor implements ApiMultifactor {
  enable = jest.fn();
}
class MockUser implements ApiUser {
  setAppMetadata = jest.fn();
  setUserMetadata = jest.fn();
}
class MockRedirect implements ApiRedirect {
  encodeToken = jest.fn();
  sendUserTo = jest.fn();
  validateToken = jest.fn();
}

class MockSAMLResponse implements ApiSAMLResponse {
  setAttribute = jest.fn();
  setAudience = jest.fn();
  setRecipient = jest.fn();
  setCreateUpnClaim = jest.fn();
  setPassthroughClaimsWithNoMapping = jest.fn();
  setMapUnknownClaimsAsIs = jest.fn();
  setMapIdentities = jest.fn();
  setDestination = jest.fn();
  setLifetimeInSeconds = jest.fn();
  setSignResponse = jest.fn();
  setNameIdentifierFormat = jest.fn();
  setNameIdentifierProbes = jest.fn();
  setAuthnContextClassRef = jest.fn();
  setSigningCert = jest.fn();
  setIncludeAttributeNameFormat = jest.fn();
  setTypedAttributes = jest.fn();
  setEncryptionCert = jest.fn();
  setCert = jest.fn();
  setKey = jest.fn();
}
