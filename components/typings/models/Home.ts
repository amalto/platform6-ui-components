/**
 * Created by Christopher VUONG on 03/03/2017
 */

/**
 * @deprecated Use ConfigurationItem instead
 */
export interface OrderDataset extends ConfigurationItem { }

export interface ConfigurationItem {
    id: string; // The id of the module.
    order: number; // The order of the module.
    type: string; // The type of the module. 'counters' | 'reports' | 'frames'
    width: string;
    height: string;
    data: Record<string, unknown>;
    tmp?: boolean;
}

export declare type ConfigurationItems = ConfigurationItem[]