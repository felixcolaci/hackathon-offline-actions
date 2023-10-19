import { EventClient } from "../../../src/types/Event";

const denyListedClients = ["my-web-app"];

export const denyAccess = (client: EventClient): boolean => {
  return denyListedClients.includes(client.name);
};
