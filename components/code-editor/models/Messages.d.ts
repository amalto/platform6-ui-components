import AceSession from './AceSession';
import { WorkflowStep, WorkflowItem } from './Workflow';
export interface Model {
    error?: string;
    appId: string;
    viewName?: string;
    ids: string[];
    xml: string;
    html?: string;
    portalHtml?: string;
    view?: string;
    isEditing?: boolean;
    loadTime: number;
    aceSession?: AceSession;
    authorizedActions?: string[];
    conceptName?: string;
    workflowStep?: WorkflowStep;
    workItems?: WorkflowItem[];
    locked: boolean;
    backToWorkItems?: boolean;
}
export interface FLink {
    ids: string[];
    type: string;
    view: string;
}
export interface Dictionary {
    [appId: string]: {
        [id: string]: Model;
    };
}
export interface FormAttributes {
    itemDataClusterName: string;
    form: string;
    itemIds: string[];
    model: any;
    itemConceptName: string;
}
