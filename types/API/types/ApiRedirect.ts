import { PostLoginAPI } from "../PostLoginAPI"

export interface ApiRedirect {
    encodeToken(
        options: {
            expiresInSeconds: number,
            payload: { [key: string]: any },
            secret: String
        }
    ): String,
    sendUserTo(
        url: String, options: {
            query: { [key: string]: String }
        }
    ): PostLoginAPI,
    validateToken(
        options: {
            secret: String,
            tokenParameterName: String
        }
    ): { [key: string]: any }
}