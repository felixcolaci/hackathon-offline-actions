import { ApiCache } from "./types/ApiCache";
import { ApiAccess } from "./types/ApiAccess";
import { ApiAccessToken } from "./types/ApiAccessToken";


export type ApiAccessTokenCC = Omit<ApiAccessToken, 'addScope' | 'removeScope'>;

export interface CredentialExchangeAPI {
    access: ApiAccess,
    accessToken: ApiAccessTokenCC,
    cache: ApiCache,
}
