# capacitor-app-permissions

Check and request permissions with a Capacitor plugin

Supported Permissions:

- Camera
- Photo Library
- Notification
- Write to External Files
- Location \*
- Location Always \*

## Process:

- ☑️ [ios] more to come...
- ✅ [Android] request(options: { permission: string }): Promise<{ status: string }> , query(options: PermissionsOptions): Promise<PermissionResult>

## Install

```
npm i capacitor-permissions
npx cap sync
```

## Methods

### request

Request permissions

### query

Check if permission is granted


## Licence

MIT