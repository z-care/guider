import { useContext, useEffect } from "react";
import MapContext from "../context";


//layer
import {
    Tile as TileLayerOl,
    Vector as VectorLayerOL,
    Image as ImageLayerOL,
} from "ol/layer";


//source
import {
    Tile as TileSource,
    XYZ as XYZSource,
    Vector as VectorSource,
    ImageWMS as ImageWMSSource,
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
import { Extent } from "ol/extent";


interface Props {
    source: ImageWMSSource;
    style?: StyleLike;
    zIndex?: number;
    maxResolution?: number;
    minResolution?: number;
    extent?: Extent;
}


const ImageLayer = ({ source, style, zIndex = 0, minResolution, maxResolution, extent}: Props) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let imageLayer = new ImageLayerOL({
            extent,
            source,
            minResolution,
            maxResolution,
        });

        map.addLayer(imageLayer);
        imageLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                imageLayer.setSource(null);
                map.removeLayer(imageLayer);
            }
        };
    }, [map]);
    return null;
};
export default ImageLayer;