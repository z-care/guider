import { useContext, useEffect } from "react";

//control
import {
  Zoom,
  FullScreen,
  MousePosition,
  Rotate,
  ScaleLine,
  ZoomSlider,
  OverviewMap,
  ZoomToExtent,
  Control,
} from 'ol/control';

import MapContext from "../context";

const FullScreenControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);
    
    return () => map.controls.remove(fullScreenControl);
  }, [map]);
  
  return null;
};
export default FullScreenControl;