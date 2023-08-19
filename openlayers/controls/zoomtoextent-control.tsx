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
  defaults
} from 'ol/control';

import MapContext from "../context";
import { Extent } from "ol/extent";
// import { makeStyles } from "@mui/styles";


// ********** ClassName **********
// const useStyles = makeStyles({
//   ZoomControl: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   ZoomControlButton: {
//     backgroundColor: 'gray',
//     color: 'black',
//     border: 'none',
//     borderRadius: 3,
//     margin: 3,
//     width: 20,
//     height: 20,
//   },
// });
// **********  **********

interface Props {
  extent: Extent;
}


const ZoomToExtentControl = ({extent}: Props) => {
  // const classes = useStyles();
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let zoomToExtentControl = new ZoomToExtent({
      extent,
    });
    map.controls.push(zoomToExtentControl);
    
    return () => map.controls.remove(zoomToExtentControl);
  }, [map]);
  
  return null;
};
export default ZoomToExtentControl;