import { removeData } from "./storage";

export function migrateSelectedOrganization() {
  removeData("SELECTED_ORGANIZATION");
}
