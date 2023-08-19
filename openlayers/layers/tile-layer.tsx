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
import { Extent } from "ol/extent";

interface Props {
  source: TileSource;
  zIndex?: number;
  minResolution?: number | undefined;
  maxResolution?: number | undefined;
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  extent?: Extent;
}

const TileLayer = ({ source, zIndex = 0, minResolution,  maxResolution, extent, minZoom, maxZoom}: Props) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let tileLayer = new TileLayerOl({
      source,
      zIndex,
      minResolution,
      maxResolution,
      extent,
      minZoom,
      maxZoom,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        tileLayer.setSource(null);
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

export default TileLayer;