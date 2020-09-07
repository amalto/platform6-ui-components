export interface SSOConnection {
  autoProvision?: true;
  autoProvisionPermissions?: string[];
  description?: string;
  enabled?: boolean;
  id?: string;
  loginContext?: string;
  name?: string;
  ownerInstanceName?: string;
  picture?: string;
  realm?: string;
  ssoConnectionType?: string;
  typePropertiesArray?: {
    key: string;
    value: string;
  }[];
  typeProperties?: {
    [key: string]: any;
  };
  autoProvisionInstancePositionId?: string;
  nonce?: string;
}