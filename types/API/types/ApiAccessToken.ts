import { PostLoginAPI } from "../PostLoginAPI";

export interface ApiAccessToken {
    setCustomClaim(name: String, value: String): PostLoginAPI,
    addScope(scope: String): PostLoginAPI,
    removeScope(scope: String): PostLoginAPI
}