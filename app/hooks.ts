import { fetcher } from "@/fetcher"
import {
    CircleStyle,
    FeatureOl,
    FillStyle,
    MapOl,
    PointGeom,
    LineStringGeom,
    StrokeStyle,
    StyleLike,
    VectorSource,
    ViewOl,
    transform
} from "@/openlayers"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"


const FeatureStyles = {
    currLoc: new StyleLike({
        image: new CircleStyle({
            fill: new FillStyle({ color: '#4b0082' }),
            radius: 10,
        })
    }),
    destiny: new StyleLike({
        image: new CircleStyle({
            fill: new FillStyle({ color: '#4b0082' }),
            radius: 10,
        })
    }),
    routing: new StyleLike({
        stroke: new StrokeStyle({
            color: '#00ff00',
            width: 10,
        }),
    }),
    default: new StyleLike({
        image: new CircleStyle({
            fill: new FillStyle({ color: '#4b0082' }),
            radius: 10,
        }),
        stroke: new StrokeStyle({
            color: '#00ff00',
            width: 2
        }),
        fill: new FillStyle({ color: '#00ff00' }),
    }),
}


const FeatureStylesFunc = (feature: FeatureOl) => {
    const props = feature.getProperties() as { name?: 'currLoc' | 'destiny' | 'routing' }

    switch (props?.name) {
        case "destiny": return FeatureStyles.destiny
        case "currLoc": return FeatureStyles.currLoc
        case "routing": return FeatureStyles.routing

        default: return FeatureStyles.default
    }
}


export const usePageHooks = () => {
    const [origin, setOrigin] = useState<GeolocationPosition>()
    const [destiny, setDestiny] = useState<any>()

    const { data: dirData, refetch: dirRefetch } = useQuery({
        enabled: false,
        queryKey: ["direction", origin, destiny],
        queryFn: () => fetcher<any>("", "/api/direction", {
            method: "POST",
            body: JSON.stringify({
                start: {
                    lng: origin?.coords?.longitude || "",
                    lat: origin?.coords?.latitude || "",
                },
                end: {
                    lng: destiny[0],
                    lat: destiny[1],
                }
            })
        }),
    })
    const [originAddress, setOriginChosenAddress] = useState('')
    const [originSuggestionInfo, setOriginSuggestionInfo] = useState<any>(null)

    const [destinyAddress, setDestinyChosenAddress] = useState('')
    const [destinySuggestionInfo, setDestinySuggestionInfo] = useState<any>(null)
    const [map, setMap] = useState<MapOl | null>(null)
    const center = transform([51.3347, 35.7219], 'EPSG:4326', 'EPSG:3857')

    const vectorSource = useRef<VectorSource>(new VectorSource())
    const currentPointFeature = useRef<FeatureOl<PointGeom>>()
    const destinyPointFeature = useRef<FeatureOl<PointGeom>>()
    const routingLineFeature = useRef<FeatureOl<LineStringGeom>>()

    const handleCurrentLocation = () => {
        window.navigator.geolocation.getCurrentPosition((data) => {
            console.log(data)
            setOrigin(data)
        }, (error) => {
            console.log(error)
            alert(`App can't get your current location!`)
        }, { enableHighAccuracy: true })
    }


    useEffect(() => {
        if (map && origin) {
            const currPoint = transform([origin.coords.longitude, origin.coords.latitude], 'EPSG:4326', 'EPSG:3857')
            FeatureStyles.currLoc.setImage(new CircleStyle({
                fill: new FillStyle({ color: '#3a92e9' }),
                stroke: new StrokeStyle({
                    color: '#b5d6ff56',
                    width: origin.coords.accuracy,
                }),
                radius: 10,
            }))

            if (currentPointFeature.current) vectorSource.current.removeFeature(currentPointFeature.current)
            currentPointFeature.current = new FeatureOl(new PointGeom(currPoint))
            currentPointFeature.current.setProperties({ name: 'currLoc' })
            vectorSource.current.addFeature(currentPointFeature.current)
            map.getView().fit(vectorSource.current.getExtent(), {
                maxZoom: 20,
                padding: [40, 40, 40, 40],
            })
        }

        if (map && destiny) {
            const destinyPoint = transform(destiny, 'EPSG:4326', 'EPSG:3857')

            if (destinyPointFeature.current) vectorSource.current.removeFeature(destinyPointFeature.current)
            destinyPointFeature.current = new FeatureOl(new PointGeom(destinyPoint))
            destinyPointFeature.current.setProperties({ name: 'destiny' })


            vectorSource.current.addFeature(destinyPointFeature.current)
            map.getView().fit(vectorSource.current.getExtent(), {
                maxZoom: 20,
                padding: [40, 40, 40, 40],
            })
        }

        if (originAddress && originSuggestionInfo) {
            const it = originSuggestionInfo?.features?.find((item: any) => item?.properties?.label === originAddress)

            if (!it) return;
            const coordinates = it?.geometry?.coordinates || []
            if (!(coordinates?.length > 0)) return;

            setOrigin({ coords: { longitude: coordinates[0], latitude: coordinates[1], accuracy: 10 } } as any)
        }

        if (destinyAddress && destinySuggestionInfo) {
            const it = destinySuggestionInfo?.features?.find((item: any) => item?.properties?.label === destinyAddress)

            if (!it) return;
            const coordinates = it?.geometry?.coordinates || []
            if (!(coordinates?.length > 0)) return;

            setDestiny(coordinates)
        }

        if (map && destiny && origin) setTimeout(() => dirRefetch(), 50)
    }, [
        origin,
        destiny,
        originAddress,
        originSuggestionInfo,
        destinyAddress,
        destinySuggestionInfo,
    ])

    useEffect(() => {
        if (map && dirData?.features?.length > 0) {
            let linePoints = dirData.features[0]?.geometry?.coordinates || []

            if (linePoints?.length > 0) {
                linePoints = linePoints.map((item: any) => transform([item[1], item[0]], 'EPSG:4326', 'EPSG:3857'))
                console.log(linePoints)

                if (routingLineFeature.current) vectorSource.current.removeFeature(routingLineFeature.current)

                routingLineFeature.current = new FeatureOl(new LineStringGeom(linePoints))
                routingLineFeature.current.setProperties({ name: 'routing' })

                vectorSource.current.addFeature(routingLineFeature.current)
                map.getView().fit(vectorSource.current.getExtent(), {
                    maxZoom: 20,
                    padding: [40, 40, 40, 40],
                })
            }
        }
    }, [map, dirData])


    return {
        map,
        setMap,
        center,
        vectorSource,
        FeatureStylesFunc,
        originAddress,
        setOriginChosenAddress,
        originSuggestionInfo,
        setOriginSuggestionInfo,
        destinyAddress,
        setDestinyChosenAddress,
        destinySuggestionInfo,
        setDestinySuggestionInfo,
        handleCurrentLocation,
    }
}