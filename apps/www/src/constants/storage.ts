export type DeprecatedStorageKey = "SELECTED_ORGANIZATION";
export type StorageKey = "SELECTED_ORGANIZATION_ID" | DeprecatedStorageKey;
export type SecretKey = "COOKIE_1" | "COOKIE_2";

export const storage: Record<StorageKey, string> = {
  SELECTED_ORGANIZATION: "tx_selected_org",
  SELECTED_ORGANIZATION_ID: "tx_selected_org_id",
};

// TODO: replace this with your own cookie keys
export const secrets: Record<SecretKey, string> = {
  COOKIE_1: "c1",
  COOKIE_2: "c2",
};
