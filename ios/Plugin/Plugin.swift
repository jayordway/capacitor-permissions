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
            case "LOCATION_WHEN_IN_USE":
                locationManager.requestWhenInUseAuthorization();
            break;
            case "LOCATION_ALWAYS":
                locationManager.requestAlwaysAuthorization();
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
}
