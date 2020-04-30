import Foundation
import Capacitor
import CoreLocation
import Photos

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(AppPermissionsPlugin)
public class AppPermissionsPlugin: CAPPlugin {
    private let locationManager = CLLocationManager()
    
    @objc func request(_ call: CAPPluginCall) {
        let permission = call.getString("permission") ?? ""
        var status = ""
        switch (permission) {
            case "geolocation":
                locationManager.requestWhenInUseAuthorization();
            break;
            case "photos":
                PHPhotoLibrary.requestAuthorization { (PHAuthorizationStatus) in
                    switch (PHAuthorizationStatus) {
                        case .authorized:
                            status = "granted";
                            break;
                    case.denied, .restricted:
                            status = "denied";
                            break;
                        case.notDetermined:
                            status = "not_determined";
                            break;
                    }
                    call.resolve([
                        "status": status
                    ])
                }
            break;
            case "camera":
                AVCaptureDevice.requestAccess(for: .video) { (granted) in
                    if granted {
                        status = "granted";
                    }
                    else {
                        status = "denied";
                    }
                    call.success([
                        "status": status
                    ])
                }
            break;
            case "notifications":
                UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { (granted, error) in
                    if granted {
                        status = "granted";
                    }
                    else {
                        status = "denied";
                    }
                    call.success([
                        "status": status
                    ])
                }
            break;
        default:
            status = "success"
        }
        
    }

    @objc func query(_ call: CAPPluginCall) {
        guard let name = call.getString("name") else {
            call.reject("Must provide a permission to check")
            return
        }

        switch (name) {
        case "camera":
            return checkCamera(call)
        case "geolocation":
            return checkGeolocation(call)
        case "notifications":
            return checkNotifications(call)
        case "photos":
            return checkPhotos(call)
        default:
            return call.reject("Unknown permission type")
        }
    }


    func checkCamera(_ call: CAPPluginCall) {
        let authStatus = AVCaptureDevice.authorizationStatus(for: .video)

        var ret = "prompt"
        switch (authStatus) {
        case .notDetermined:
            ret = "prompt"
        case .denied, .restricted:
            ret = "denied"
        case .authorized:
            ret = "granted"
        }

        call.resolve([
            "state": ret
        ])
    }

    func checkPhotos(_ call: CAPPluginCall) {
        let photoAuthorizationStatus = PHPhotoLibrary.authorizationStatus()

        var ret = "prompt"
        switch (photoAuthorizationStatus) {
        case .notDetermined:
            ret = "prompt"
        case .denied, .restricted:
            ret = "denied"
        case .authorized:
            ret = "granted"
        }
        call.resolve([
            "state": ret
        ])
    }

    func checkGeolocation(_ call: CAPPluginCall) {
        var ret = "prompt"
        if CLLocationManager.locationServicesEnabled() {
            switch CLLocationManager.authorizationStatus() {
            case .notDetermined:
                ret = "prompt"
            case .denied, .restricted:
                ret = "denied"
            case .authorizedAlways, .authorizedWhenInUse:
                ret = "granted"
            }
        } else {
            ret = "denied"
        }

        call.resolve([
            "state": ret
        ])
    }

    func checkNotifications(_ call: CAPPluginCall) {
        UNUserNotificationCenter.current().getNotificationSettings(completionHandler: { settings in
            var ret = "prompt"
            switch settings.authorizationStatus {
            case .authorized, .provisional:
                ret = "granted"
            case .denied:
                ret = "denied"
            case .notDetermined:
                ret = "prompt"
            }

            call.resolve([
                "state": ret
            ])
        })
    }


}
