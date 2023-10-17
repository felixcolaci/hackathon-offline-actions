export interface ApiCache {
    delete(key: String): {
        type: "success" | "error",
        code: any | undefined
    },
    get(key: String): {
        value: String,
        expires_at: number
    } | undefined,
    set(key: String, value: String, options: {
        expires_at: number | undefined,
        ttl: number | undefined
    } | undefined): {
        type: "success", "error"
    }
}