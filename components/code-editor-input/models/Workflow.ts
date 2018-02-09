/**
 * Created by franckmontaigne on 22/01/16.
 */

import Message from './MessageModel'

export interface WorkflowStep {
    actions: WorkflowAction[];
    activeAssignees: Assignees;
    allowDelegation: boolean;
    allowRecall: boolean;
    allowedMessageEditor: string;
    assigneeName: string;
    assigneePath: string;
    assigneeScope: string;
    assigneeType: string;
    emailTemplateModelTransformer: string;
    emailTemplateUri: string;
    enabled: boolean;
    i18nAssigneeLabelMap: {
        [language: string]: string;
    };
    i18nDescriptionMap: {
        [language: string]: string;
    };
    i18nStatusMap: {
        [status: string]: {
            [language: string]: string;
        };
    };
    sendEmails: boolean;
    stepId: string;
    ttl: number;
    workItemEnhancementTransformer: string;
}

export interface WorkflowAction {

    activeDelegateAssignees: Assignees;
    delegateAssigneePath: string;
    delegateAssigneeScope: string;
    delegateAssigneeType: string;
    display: boolean;
    formGenerator: string;
    i18nDelegateAssigneeLabelMap: {
        [language: string]: string;
    };
    i18nLabelMap: {
        [language: string]: string;
    };
    id: string;
    params: WorkflowActionParam[];
    status: string;
    stop: boolean,
    style: string;
    transformerName: string;
    type: string;
}

export interface WorkflowActionParam {
    name: string;
    mandatory: boolean;
    i18nLabelMap: {
        [language: string]: string;
    },
    inputType: string;
    defaultValue: string | boolean;
    choices?: {
        i18nLabelMap: {
            [language: string]: string;
        },
        value: string;
    }[];
}

export interface WorkflowItem {
    workItemId: string;
    step: WorkflowStep;
    //html details string to be displayed
    display?: string;
    //FLink viewName used to fetch custom forms...
    viewName?: string;
    //technical boolean used to check for permissions access on work item
    notAssignedToCurrentUser?: boolean;
}

export interface CustomFormData {
    content?: string;
    model?: any;
    fetching?: boolean;
    loadingError?: boolean;
}

export interface Assignees {
    [userEmail: string]: {
        email: string;
        firstName?: string;
        lastName?: string;
        permissions: string[];
    };
}