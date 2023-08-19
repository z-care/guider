//source
import {
    Tile as TileSource,
    XYZ as XYZSource,
    OSM as OSMSource,
    Vector as VectorSource,
    TileWMS as TileWMSSource,
    ImageWMS as ImageWMSSource,
} from "ol/source";

import {
    Options as XYZOptions,
} from "ol/source/XYZ"

import {
    Options as OSMOptions
} from "ol/source/OSM";

import { 
    GeoJSON 
} from "ol/format";

import {
    bbox as bboxStrategy
} from 'ol/loadingstrategy';
import { ServerType } from "ol/source/wms";
import TileGrid from "ol/tilegrid/TileGrid";
import { 
    Options as VectorOptions 
} from "ol/source/Vector";

export const xyz = (option: XYZOptions | undefined) => {
    return new XYZSource(option)
}

export const osm = (option: OSMOptions | undefined = {}) => {
    return new OSMSource(option)
}

export const vectorSource = (source: VectorOptions | undefined) => {
    return new VectorSource(source);

    // return new VectorSource({
    //     wrapX: false
    //     // features: new GeoJSON({}).readFeatures(source)
    // });
}

export const wfsSource = (url: string) => {
    return new VectorSource({
        format: new GeoJSON(),
        url: function (extent) {
          return (url);
        },
        strategy: bboxStrategy,
    });
}

export const wmsSource = (
    url: string,
    params: object,
    serverType: ServerType = 'geoserver',
    crossOrigin: string = 'anonymous'
) => {
    return new TileWMSSource({
        url,
        params,
        serverType,
        crossOrigin,
    });
}

export const imageWMSSource = (
    url: string,
    params: object,
    serverType: ServerType = 'geoserver',
    crossOrigin: string = 'anonymous'
) => {
    return new ImageWMSSource({
        ratio: 1,
        url,
        params,
        serverType,
        crossOrigin,
    });
}