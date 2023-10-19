import { PostLoginAPI } from "@auth0-testing/types/API/PostLoginAPI";
import { PostLoginEvent } from "@auth0-testing/types/Event/PostLoginEvent";
import { denyAccess } from "./src/deny-access-by-client";

/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event: PostLoginEvent, api: PostLoginAPI) => {
  if (denyAccess(event.client)) {
    api.access.deny("unallowed client");
  }
};

/**
 * Handler that will be invoked when this action is resuming after an external redirect. If your
 * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
// exports.onContinuePostLogin = async (event, api) => {
// };
