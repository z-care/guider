"use client"

//ol
import {
    Map as MapOl,
    View as ViewOl,
    Feature as FeatureOl,
} from "ol";


//geom
import {
    Point as PointGeom,
    LineString as LineStringGeom,
    Geometry as GeometryGeom,
} from "ol/geom";


//source
import {
    Tile as TileSource,
    XYZ as XYZSource,
    OSM as OSMSource,
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

//proj
import {
    fromLonLat as fromLonLatProj,
    transform as transformProj,
    toLonLat as toLonLatProj,
    Projection,
    get as getProjection,
    transform,
  } from "ol/proj";

export {
    TileSource,
    XYZSource,
    OSMSource,
    VectorSource,

    StyleLike,
    FillStyle, 
    StrokeStyle,
    CircleStyle,
    IconStyle,
    ImageStyle,
    ViewOl,
    FeatureOl,
    PointGeom,
    LineStringGeom,
    GeometryGeom,
    fromLonLatProj,
    toLonLatProj,
}


import {
    Map,
} from "./map"


import BaseEvent from "ol/events/Event";
import { getCenter } from "ol/extent";
import { fromExtent } from "ol/geom/Polygon";
import { Draw } from 'ol/interaction';
import { GeoJSON } from "ol/format";
//layer
import {
    Tile as TileLayerOl,
    Vector as VectorLayerOL,
} from "ol/layer";


export {
    VectorLayerOL,
    GeoJSON,
    MapOl,
    Draw,
    BaseEvent,
    Projection,
    getProjection,
    fromExtent,
    getCenter,
    transform,
}


export default Map;