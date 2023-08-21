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


//style
import {
    Style as StyleLike,
    Fill as FillStyle,
    Stroke as StrokeStyle,
    Circle as CircleStyle,
    Icon as IconStyle,
    Image as ImageStyle,
} from 'ol/style';
import { FlatStyleLike } from "ol/style/flat";
import { Geometry } from "ol/geom";
import { FeatureOl } from "..";


type StyleLikeFunc = (feature: FeatureOl<Geometry>) => StyleLike
interface Props {
    source: VectorSource;
    style?: StyleLike | FlatStyleLike | StyleLikeFunc | null;
    zIndex?: number;
    maxResolution?: number;
    minResolution?: number;
}


const VectorLayer = ({ source, style, zIndex = 0, minResolution, maxResolution}: Props) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let vectorLayer = new VectorLayerOL({
            source,
            style, 
            minResolution,
            maxResolution,
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
export default VectorLayer;