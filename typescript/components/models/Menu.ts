/**
 * Sidebar menu interface
 */
export interface Menu {
    title: string; /** Subtitle title */
    links: { [key: string]: string }; /** Menu name */
}