/**
 * Created by Christopher VUONG on 03/03/2017 (DD:MM:YYYY)
 */

export interface HomeModulesModel {
    counters: CounterDataset[];
    frames: FrameDataset[];
    reports: ReportDataset[];
}

export interface ReportIdentifier {
    id: string;
    templateName: string;
}

export interface CounterIdentifier {
    id: string;
    title: string;
    description: string;
}

export interface FrameIdentifier {
    id: string;
    name: string;
}

export interface Identifier {
    id: string;
    type: string;
    proxyUrl?: string;
}

export interface PreviewItem {
    id: string;
    content: JSX.Element;
}

export interface HomeDataset {
    id: string;
    dataType: string;
}

export interface ReportDataset extends HomeDataset {
    script: string;
    templateName: string;
}

export interface CounterDataset extends HomeDataset {
    name: string; // Id of datasets
    title: string;
    description: string;
    value: number;
    lastSyncDate: string;

    // From here we don't use the properties yet
    branchId: string;
    cronSchedule: string;
    itemDataCluster: string;
    query: string;
    realTimeUpdates: boolean;
    scheduledUpdates: boolean;
    target: boolean;
    type: string;
}

export interface FrameDataset extends HomeDataset {
    description: string;
    name: string;
    url: string;
}

export interface ModuleCard {
    id: string;
    type: string;
    title: string;
    description: string;
    order: number;
    width: string;
    height: string;

    // Counters
    value?: number;
    lastSyncDate?: string;

    // Frames
    url?: string;

    // Reports
    script?: string;
}

export interface AvailableModuleCard {
    id: string;
    type: string;
    title: string;
    description: string;
    selected?: boolean;
}

export interface OrderDataset {
    id: string;
    order: number;
    type: string;
    width: string;
    height: string;
    data?: any;
}

export interface DefaultSetting {
    name: string;
    oldName?: string;
    modules: OrderDataset[];
}