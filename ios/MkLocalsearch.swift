import CoreLocation
import MapKit

@objc(MkLocalsearch)
class MkLocalsearch: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(search:withRegion:withResolver:withRejecter:)
    func search(query: String, region: [String: Double], resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        let searchRequest = MKLocalSearch.Request()
        searchRequest.naturalLanguageQuery = query
        if(region["latitude"] != nil && region["longitude"] != nil && region["latitudeDelta"] != nil && region["longitudeDelta"] != nil) {
            let center = CLLocationCoordinate2D(latitude: region["latitude"]!, longitude: region["longitude"]!)
            let span = MKCoordinateSpan(latitudeDelta: region["latitudeDelta"]!, longitudeDelta: region["longitudeDelta"]!)
            searchRequest.region = MKCoordinateRegion(center: center, span: span)
        }
        let search = MKLocalSearch(request: searchRequest)
        search.start(completionHandler: {(response, error) in
            guard let response = response else {
                reject(error.debugDescription, error?.localizedDescription, nil)
                return
            }
            let results = response.mapItems.compactMap { (mapItem) -> [String: Any] in
                return ["latitude": mapItem.placemark.coordinate.latitude,
                        "longitude": mapItem.placemark.coordinate.longitude,
                        "name": mapItem.name ?? (mapItem.placemark.name ?? ""),
                        "phoneNumber": mapItem.phoneNumber ?? "",
                        "url": mapItem.url?.absoluteString ?? ""]
            }
            resolve(results)
        })
    }
}
