import { PostLoginAPI } from "../PostLoginAPI";

export interface ApiIdToken {
    setCustomClaim(name: String, value: any): PostLoginAPI
}