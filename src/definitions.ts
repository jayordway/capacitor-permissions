declare module "@capacitor/core" {
  interface PluginRegistry {
    AppPermissionsPlugin: AppPermissionsPluginPlugin;
  }
}

export interface AppPermissionsPluginPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
}
