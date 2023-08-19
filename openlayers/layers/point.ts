import { useContext, useEffect } from "react";
import MapContext from "../context";


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


import {
    FeatureOl,
    FillStyle,
    fromLonLatProj,
    PointGeom,
    StrokeStyle,
    StyleLike,
    CircleStyle,
} from "..";



interface Props {
    longitude: number;
    latitude: number;

    strokeWidth?: number;
    strokeColor?: string;
    fillColor?: string;
    radius?: number;
    zIndex?: number;
}


const Point = ({
    longitude,
    latitude,
    strokeWidth = 3,
    strokeColor = 'rgba(0, 0, 255, 0.6)',
    fillColor = 'rgba(255, 255, 0, 0.6)',
    radius = 7,
    zIndex = 0}: Props) => {
    const { map } = useContext(MapContext);

    const fill = new FillStyle({
        color: fillColor,
    });
    const stroke = new StrokeStyle({
        color: strokeColor,
        width: strokeWidth,
    });

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
                image: new CircleStyle({
                    fill: fill,
                    stroke: stroke,
                    radius: radius,
                }),
                fill: fill,
                stroke: stroke,
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
export default Point;