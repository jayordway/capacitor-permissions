package com.capacitor.permissions;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;


import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;


import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

@NativePlugin(requestCodes = {AppPermissionsPlugin.REQUEST_CAMERA, AppPermissionsPlugin.REQUEST_COARSE_LOCATION,
        AppPermissionsPlugin.REQUEST_READ_EXTERNAL_STORAGE, AppPermissionsPlugin.REQUEST_WRITE_EXTERNAL_STORAGE,
        AppPermissionsPlugin.REQUEST_NOTIFICATION_POLICY})
public class AppPermissionsPlugin extends Plugin {

    static final int REQUEST_CAMERA = 20120;
    static final int REQUEST_READ_EXTERNAL_STORAGE = 20130;
    static final int REQUEST_WRITE_EXTERNAL_STORAGE = 20140;
    static final int REQUEST_COARSE_LOCATION = 20150;
    static final int REQUEST_NOTIFICATION_POLICY = 20160;


    @RequiresApi(api = Build.VERSION_CODES.M)
    @PluginMethod
    public void request(PluginCall call) {
        String name = call.getString("permission");
        saveCall(call);
        switch (name) {
            case "camera":
                requestPermissions(Manifest.permission.CAMERA, REQUEST_CAMERA);
                break;
            case "photos":
                requestPermissions(Manifest.permission.READ_EXTERNAL_STORAGE, REQUEST_READ_EXTERNAL_STORAGE);
                break;
            case "geolocation":
                requestPermissions(Manifest.permission.ACCESS_COARSE_LOCATION, REQUEST_COARSE_LOCATION);
                break;
            case "notifications":
                requestPermissions(Manifest.permission.ACCESS_NOTIFICATION_POLICY, REQUEST_NOTIFICATION_POLICY);
                break;
            case "file-write":
                requestPermissions(Manifest.permission.WRITE_EXTERNAL_STORAGE, REQUEST_WRITE_EXTERNAL_STORAGE);
                break;
            default:
                call.reject("Unknown permission type");
        }

    }

    private void requestPermissions(String permission, int permissionConstant) {
        pluginRequestPermission(permission, permissionConstant);
    }

    @Override
    protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.handleRequestPermissionsResult(requestCode, permissions, grantResults);
        JSObject ret = new JSObject();
        PluginCall savedCall = getSavedCall();

        if (savedCall == null) {
            return;
        }

        for (int result : grantResults) {
            if (result == PackageManager.PERMISSION_DENIED) {
                ret.put("state", "denied");
                savedCall.resolve(ret);
                return;
            }
        }

        if (requestCode == REQUEST_CAMERA || requestCode == REQUEST_COARSE_LOCATION || requestCode == REQUEST_READ_EXTERNAL_STORAGE ||
                requestCode == REQUEST_NOTIFICATION_POLICY || requestCode == REQUEST_WRITE_EXTERNAL_STORAGE) {
            // We got the permission
            ret.put("state", "granted");
            savedCall.resolve(ret);
        }
    }


    @PluginMethod
    public void query(PluginCall call) {
        String name = call.getString("name");

        switch (name) {
            case "camera":
                checkCamera(call);
                break;
            case "photos":
                checkPhotos(call);
                break;
            case "geolocation":
                checkGeo(call);
                break;
            case "notifications":
                checkNotifications(call);
                break;
            case "file-write":
                checkFileWrite(call);
                break;
            default:
                call.reject("Unknown permission type");
        }
    }

    private void checkPerm(String perm, PluginCall call) {
        JSObject ret = new JSObject();
        if (ContextCompat.checkSelfPermission(getContext(), perm) == PackageManager.PERMISSION_DENIED) {
            ret.put("state", "denied");
        } else if (ContextCompat.checkSelfPermission(getContext(), perm) == PackageManager.PERMISSION_GRANTED) {
            ret.put("state", "granted");
        } else {
            ret.put("state", "prompt");
        }
        call.resolve(ret);
    }

    private void checkFileWrite(PluginCall call) {
        checkPerm(Manifest.permission.WRITE_EXTERNAL_STORAGE, call);
    }

    private void checkCamera(PluginCall call) {
        checkPerm(Manifest.permission.CAMERA, call);
    }

    private void checkPhotos(PluginCall call) {
        checkPerm(Manifest.permission.READ_EXTERNAL_STORAGE, call);
    }

    private void checkGeo(PluginCall call) {
        checkPerm(Manifest.permission.ACCESS_COARSE_LOCATION, call);
    }

    private void checkNotifications(PluginCall call) {
        boolean areEnabled = NotificationManagerCompat.from(getContext()).areNotificationsEnabled();
        JSObject ret = new JSObject();
        ret.put("state", areEnabled ? "granted" : "denied");
        call.resolve(ret);
    }

}
