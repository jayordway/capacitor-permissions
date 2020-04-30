declare module "@capacitor/core" {
  interface PluginRegistry {
    AppPermissionsPlugin: PermissionsPlugin;
  }
}

export interface Plugin {
    addListener(eventName: string, listenerFunc: Function): PluginListenerHandle;
}

export interface PluginListenerHandle {
    remove: () => void;
}


export interface PermissionsRequestResult {
    results: any[];
}

export interface PermissionsPlugin extends Plugin {
    query(options: PermissionsOptions): Promise<PermissionResult>;
    request(options: { permission: string }): Promise<{ status: string }>;
}

export interface PermissionsOptions {
    name: string;
}
export interface PermissionResult {
    state: 'granted' | 'denied' | 'prompt';
}