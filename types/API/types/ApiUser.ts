import { PostLoginAPI } from "../PostLoginAPI";

export interface ApiUser {
    setAppMetadata(name: String, value: any): PostLoginAPI,
    setUserMetadata(name: String, value: any): PostLoginAPI
}