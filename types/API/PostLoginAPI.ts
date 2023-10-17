import { ApiCache } from "./types/APICache"
import { ApiIdToken } from "./types/APIIdToken"
import { ApiMultifactor } from "./types/APIMultifactor"
import { ApiRedirect } from "./types/APIRedirect"
import { ApiSAMLResponse } from "./types/APISAMLResponse"
import { ApiUser } from "./types/APIUser"
import { ApiAccess } from "./types/ApiAccess"
import { ApiAccessToken } from "./types/ApiAccessToken"
import { ApiAuthentication } from "./types/ApiAuthentication"

export interface PostLoginAPI {
    access: ApiAccess,
    accessToken: ApiAccessToken,
    authentication: ApiAuthentication,
    cache: ApiCache,
    idToken: ApiIdToken,
    multifactor: ApiMultifactor,
    user: ApiUser,
    redirect: ApiRedirect,
    samlResponse: ApiSAMLResponse
}