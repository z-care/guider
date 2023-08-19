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


const ZoomControl = () => {
  // const classes = useStyles();
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let zoomControl = new Zoom({
      // zoomInClassName: classes.ZoomControlButton,
      // zoomOutClassName: classes.ZoomControlButton,
      // className: classes.ZoomControl
    });
    map.controls.push(zoomControl);
    
    return () => map.controls.remove(zoomControl);
  }, [map]);
  
  return null;
};
export default ZoomControl;