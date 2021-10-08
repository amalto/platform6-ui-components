export interface RunningJob {
    jobId: string;
    userEmail: string;
    status: string;
    priority: string;
    stacktrace: string[];
    attributes: {
        [key: string]: string;
    };
    entityList: Entity[];
    i18nRollingMessageMaps: {
        [lang: string]: string;
    }[];
    description: {
        [lang: string]: string;
    };
    result: any;
    created: number;
    lastStatusModified: number;
}

export interface Entity {
    id: string;
    jobId: string;
    entityFile: {
        path: string;
        name: string;
        parent: any;
        absolute: boolean;
        canonicalPath: string;
        parentFile: any;
        absolutePath: string;
        absoluteFile: any;
        canonicalFile: any;
        directory: boolean;
        file: boolean;
        hidden: boolean;
        totalSpace: number;
        freeSpace: number;
        usableSpace: number;
    };
    name: string;
    contentType: string;
}

export const JOB_STATUSES = {
    COMPLETE: 'COMPLETE',
    CANCELING: 'CANCELING',
    INERROR: 'INERROR',
    RUNNING: 'RUNNING',
    QUEUED: 'QUEUED'
}