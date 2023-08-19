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

interface Props {
  minWidth?: number;
  steps?: number;
  units?: string;
  bar?: boolean;
  text?: boolean;
}

const ScaleLineControl = ({
  minWidth = 140,
  steps = 1,
  bar = false,
  text = false
}: Props) => {
  // const classes = useStyles();
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let scaleLineControl = new ScaleLine({
      bar,
      steps,
      text,
      minWidth,
    });

    map.controls.push(scaleLineControl);

    return () => map.controls.remove(scaleLineControl);
  }, [map]);

  return null;
};

export default ScaleLineControl;