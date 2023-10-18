import { PostLoginAPI } from "../PostLoginAPI";

/**
 * Make application-specific changes to the metadata of the user that is logging in.

NOTE: Invoking these methods won't update the metadata immediately. You can call them several times throughout multiple actions of the same flow and the engine will aggregate the changes and update the metadata at once before the flow is completed.
 */
export interface ApiUser {
    /**
     * Set application metadata for the user that is logging in. Data stored within app_metadata is not editable by the user.
     * @param name The name of metadata property.
     * @param value The value of the metadata property. This may be set to null to remove the metadata property.
     * @returns Returns a reference to the api object.
     */
    setAppMetadata(name: String, value: any): PostLoginAPI,
    /**
     * Set general metadata for the user that is logging in.
     * @param name The name of metadata property.
     * @param value The value of the metadata property. This may be set to null to remove the metadata property.
     * @returns Returns a reference to the api object.
     */
    setUserMetadata(name: String, value: any): PostLoginAPI
}