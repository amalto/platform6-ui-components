
function isUndefined(value: unknown): boolean {
    return value === undefined 
    || value === "undefined"
    || value === null 
    || value === "null"
    || `${value}`.trim() === ''
}

export function cleanupAttributes(attributes: { [key: string]: unknown }): { [key: string]: unknown } {
    return Object.entries(attributes)
        .filter(attr => !isUndefined(attr[1]))
        .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {})
}