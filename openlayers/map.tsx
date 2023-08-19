import { createContext, CSSProperties, useEffect, useRef, useState } from "react";

//ol
import {
  Map as MapOl,
  View as ViewOl,
  Feature as FeatureOl,
} from "ol";


//layer
import {
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";


//source
import {
  XYZ as XYZSource,
  Vector as VectorSource,
} from "ol/source";


//control
import {
  Zoom as ZoomControl,
  FullScreen as FullScreenControl,
  MousePosition as MousePositionControl,
  Rotate as RotateControl,
  ScaleLine as ScaleLineControl,
  ZoomSlider as ZoomSliderControl,
  OverviewMap as OverviewMapControl,
  ZoomToExtent as ZoomToExtentControl,
  Control as ControlControl,
} from 'ol/control';


//format
import {
  GeoJSON as GeoJSONFormat,
} from 'ol/format';


//proj
import {
  fromLonLat as fromLonLatProj,
  transform as transformProj,
  toLonLat as toLonLatProj,
  Projection,
  ProjectionLike,
  get as getProjection
} from "ol/proj";


//style
import {
  Fill as FillStyle,
  Style as StyleStyle,
  Stroke as StrokeStyle,
  Circle as CircleStyle,
  Icon as IconStyle,
  Image as ImageStyle,
} from 'ol/style';


//geom
import {
  Point as PointGeom,
  Geometry as GeometryGeom,
} from "ol/geom";


//PluggableMap
// import {
//   MapOptions
// } from "ol/PluggableMap";
import { MapOptions } from "ol/Map";

import MapContext from "./context";
import { Extent } from "ol/extent";

import Link from 'ol/interaction/Link';
import BaseEvent from "ol/events/Event";



interface Point {
  longitude: number;
  latitude: number;
}


interface Props {
  width: number | string;
  height: number | string;
  center: Point;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  projection?: ProjectionLike;
  extent?: Extent;
  style?: CSSProperties;
  children?: any;
  onResolutionChange?: Function;
  onCenterChange?: Function;
  onChange?: Function;
  onClick?: Function;
  map: MapOl | null;
  setMap: Function;
}


// Transform the centre into something openlayers understands
const transformCentre = (centre: any) => {
  if (centre != null) {
    return transformProj(centre, "EPSG:4326", "EPSG:3857");
  }
};



export const Map = ({ map, setMap, width, height, style, children, zoom, center, extent, onResolutionChange, onCenterChange, onChange, onClick, minZoom, maxZoom, 
  projection = new Projection({
    code: 'EPSG:3857',
    units: 'm',
  }) 
}: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  // const [map, setMap] = useState<MapOl | null>(null);

  useEffect(() => {
    const view = new ViewOl({
      projection,
      minZoom,
      maxZoom,
      extent,
      zoom,
      center: [center.longitude, center.latitude],
    });

    let mapOptions: MapOptions = {
      view: view,
      layers: [],
      controls: [],
      maxTilesLoading: 5,
    };

    let mapObj: MapOl | null = new MapOl(mapOptions)

    if (mapRef?.current !== null) mapObj?.setTarget(mapRef?.current);
  
    setMap(mapObj);

    return () => {
      mapObj?.setTarget(undefined);
      mapObj = null;
      setMap(null);
    };
  }, [])


  // zoom and center change handler
  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const renderMap = urlParams.get('r');
  //   const location = urlParams.get('l');
    
  //   if(renderMap == '1') {
  //     if (map !== null) {
  //       const [longitudeUrl, latitudeUrl, zoomUrl] = location?.
  //         toString().replace('z', '').split(",") || 
  //         [center.longitude, center.latitude, zoom]
  //       map.getView().setCenter([+longitudeUrl, +latitudeUrl]);
  //       map.getView().setZoom(+zoomUrl);
  //     }
  //   }
  // });


  useEffect(() => {
    if (map !== null) {
      map.getView().on('change:resolution', (event) => {
        if (onResolutionChange !== undefined &&
          onResolutionChange !== null &&
          typeof onResolutionChange === 'function') {

            

          const currentBboxExtent = map.getView().calculateExtent(map.getSize());
          const currentBbox = [...toLonLatProj(currentBboxExtent.slice(0, 2)), ...toLonLatProj(currentBboxExtent.slice(2, 4))];
          const currentCenter = toLonLatProj(map.getView().getCenter() as any);
          const currentZoom = map.getView().getZoom();
          const currentResolution = map.getView().getResolution();
          const currentScale = map.getView().getProjection().getMetersPerUnit();

          onResolutionChange(map);
        }
      });


      map.getView().on('change:center', (event) => {
        if (onCenterChange !== undefined &&
          onCenterChange !== null &&
          typeof onCenterChange === 'function') {

          const currentBboxExtent = map.getView().calculateExtent(map.getSize());
          const currentBbox = [...toLonLatProj(currentBboxExtent.slice(0, 2)), ...toLonLatProj(currentBboxExtent.slice(2, 4))];
          const currentCenter = toLonLatProj(map.getView().getCenter() as any);
          const currentZoom = map.getView().getZoom();
          const currentResolution = map.getView().getResolution();
          const currentScale = map.getView().getProjection().getMetersPerUnit();

          onCenterChange(map);
        }
      });


      map.getView().on('change', (event: BaseEvent) => {
        if (onChange !== undefined &&
          onChange !== null &&
          typeof onChange === 'function') {

          // const currentBboxExtent = map.getView().calculateExtent(map.getSize());
          // const currentBbox = [...toLonLatProj(currentBboxExtent.slice(0, 2)), ...toLonLatProj(currentBboxExtent.slice(2, 4))];
          // const currentCenter = toLonLatProj(map.getView().getCenter() as any);
          // const currentZoom = map.getView().getZoom();
          // const currentResolution = map.getView().getResolution();
          // const currentScale = map.getView().getProjection().getMetersPerUnit();

          onChange(event);
        }
      });


      map.on('singleclick', (e) => {
        if (onClick !== undefined &&
          onClick !== null &&
          typeof onClick === 'function') {
            onClick(e);
        }
      });

      map.addInteraction(new Link({}));


      // map.on('pointermove', function (evt) {
      //   // if (evt.dragging) {
      //   //   return;
      //   // }

      //   // console.log(evt.pixel);
        
      //   // const data = map.getData(evt.pixel);
      //   // const hit = data && data[3] > 0; // transparent pixels have zero for data[3]
      //   // map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      // });
    }
  }, [map])


  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef}
        style={{
          width,
          height,
          zIndex: 0,
          ...style,
        }}>
        {children}
      </div>
    </MapContext.Provider>
  )
}