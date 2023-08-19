import { useContext, useEffect } from "react";
import MapContext from "../context";
import markerIcon from './img/location-dot-solid.svg'



//layer
import {
    Tile as TileLayerOl,
    Vector as VectorLayerOL,
} from "ol/layer";


//source
import {
    Tile as TileSource,
    XYZ as XYZSource,
    Vector as VectorSource,
} from "ol/source";


import { FeatureOl, fromLonLatProj, IconStyle, PointGeom, StyleLike } from "..";


interface Props {
    longitude: number;
    latitude: number;
    zIndex?: number;
}


const Marker = ({ longitude, latitude, zIndex = 0 }: Props) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let vectorLayer = new VectorLayerOL({
            source: new VectorSource({
                features: [
                    new FeatureOl({
                        geometry: new PointGeom(fromLonLatProj([longitude, latitude]))
                    })],
            }),
            style: new StyleLike({
                image: new IconStyle({
                    src: markerIcon.src,
                    color: '#fff',
                    scale: 0.40,
                    anchor: [0.5, 0.97],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                })
            })
        });

        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                vectorLayer.setSource(null);
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);
    return null;
};
export default Marker;