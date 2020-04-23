declare module "@capacitor/core" {
    interface PluginRegistry {
        AppPermissionsPlugin: PermissionsPlugin;
    }
}
export interface Plugin {
    addListener(eventName: string, listenerFunc: Function): PluginListenerHandle;
    requestPermissions?: () => Promise<PermissionsRequestResult>;
    query: () => Promise<PermissionResult>;
}
export interface PluginListenerHandle {
    remove: () => void;
}
export interface PermissionsRequestResult {
    results: any[];
}
export interface PermissionsPlugin extends Plugin {
    query(options: PermissionsOptions): Promise<PermissionResult>;
}
export declare enum PermissionType {
    Camera = "camera",
    Photos = "photos",
    Geolocation = "geolocation",
    Notifications = "notifications",
    ClipboardRead = "clipboard-read",
    ClipboardWrite = "clipboard-write"
}
export interface PermissionsOptions {
    name: PermissionType;
}
export interface PermissionResult {
    state: 'granted' | 'denied' | 'prompt';
}
