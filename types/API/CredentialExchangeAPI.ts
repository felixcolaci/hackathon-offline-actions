import { ApiAccess, ApiAccessToken, ApiCache } from "./types";

export type ApiAccessTokenCC = Omit<ApiAccessToken, "addScope" | "removeScope">;

export interface CredentialExchangeAPI {
  access: ApiAccess;
  accessToken: ApiAccessTokenCC;
  cache: ApiCache;
}
