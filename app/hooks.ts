import {
    CircleStyle,
    FeatureOl,
    FillStyle,
    MapOl,
    PointGeom,
    StrokeStyle,
    StyleLike,
    VectorSource,
    ViewOl,
    transform
} from "@/openlayers"
import { useEffect, useRef, useState } from "react"


const pointFill = new FillStyle({
    color: '#3a92e9',
})

const pointStyle = new CircleStyle({
    fill: pointFill,
    radius: 10,
})

export const usePageHooks = () => {
    const [currentUserLocInfo, setCurrentUserLocInfo] = useState<GeolocationPosition>()
    const [destiny, setDestiny] = useState<any>()
    const [chosenAddress, setChosenAddress] = useState('')
    const [suggestionInfo, setSuggestionInfo] = useState<any>(null)
    const [map, setMap] = useState<MapOl | null>(null)
    const center = transform([51.3347, 35.7219], 'EPSG:4326', 'EPSG:3857')
    const currLocVectorSource = useRef<VectorSource>(new VectorSource())
    const currLocVectorStyle = useRef(new StyleLike({
        image: pointStyle
    }))
    const currentPointFeature = useRef<FeatureOl<PointGeom>>()
    const destinyPointFeature = useRef<FeatureOl<PointGeom>>()

    const handleCurrentLocation = () => {
        window.navigator.geolocation.getCurrentPosition((data) => {
            console.log(data)
            setCurrentUserLocInfo(data)
        }, (error) => {
            console.log(error)
            alert(`App can't get your current location!`)
        }, { enableHighAccuracy: true })
    }


    useEffect(() => {
        if (map && currentUserLocInfo) {
            const currPoint = transform([currentUserLocInfo.coords.longitude, currentUserLocInfo.coords.latitude], 'EPSG:4326', 'EPSG:3857')
            currLocVectorStyle.current.setImage(new CircleStyle({
                fill: pointFill,
                stroke: new StrokeStyle({
                    color: '#b5d6ff56',
                    width: currentUserLocInfo.coords.accuracy,
                }),
                radius: 10,
            }))

            if (currentPointFeature.current) currLocVectorSource.current.removeFeature(currentPointFeature.current)
            currentPointFeature.current = new FeatureOl(new PointGeom(currPoint))
            currLocVectorSource.current.addFeature(currentPointFeature.current)
            map.setView(new ViewOl({ center: currPoint, zoom: 20 }))
        }

        if (chosenAddress && suggestionInfo) {
            const it = suggestionInfo?.features?.find((item: any) => item?.properties?.label === chosenAddress)
            if (it) setDestiny(it?.geometry?.coordinates)
        }

        if (map && destiny) {
            const destinyPoint = transform(destiny, 'EPSG:4326', 'EPSG:3857')
            currLocVectorStyle.current.setImage(new CircleStyle({
                fill: new FillStyle({
                    color: '#4b0082',
                }),
                radius: 10,
            }))

            if (destinyPointFeature.current) currLocVectorSource.current.removeFeature(destinyPointFeature.current)
            destinyPointFeature.current = new FeatureOl(new PointGeom(destinyPoint))
            currLocVectorSource.current.addFeature(destinyPointFeature.current)
            map.setView(new ViewOl({ center: destinyPoint, zoom: 20 }))
        }


        if (destiny && currentUserLocInfo) {
                fetch("/api/direction", {
                    method: "POST",
                    body: JSON.stringify({
                        start: {
                            lng: currentUserLocInfo.coords.longitude,
                            lat: currentUserLocInfo.coords.latitude,
                        },
                        end: {
                            lng: destiny[0],
                            lat: destiny[1],
                        }
                    })
                }).then(data => data.json())
                .then(data => {
                    console.log(data)
                    
                })
            }

    }, [currentUserLocInfo, destiny, chosenAddress, suggestionInfo])


    return {
        map,
        setMap,
        center,
        currLocVectorSource,
        currLocVectorStyle,
        chosenAddress,
        setChosenAddress,
        suggestionInfo,
        setSuggestionInfo,
        handleCurrentLocation,
    }
}