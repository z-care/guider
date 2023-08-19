//style
import { Feature } from 'ol';
import {
    Style as StyleLike,
    Fill as FillStyle,
    Stroke as StrokeStyle,
    Circle as CircleStyle,
    Icon as IconStyle,
    Image as ImageStyle,
} from 'ol/style';

import {
    Options as FillOptions,
} from 'ol/style/Fill';

import {
    Options as StrokeOptions,
} from 'ol/style/Stroke';

import {
    Options as StyleOptions,
} from 'ol/style/Style';


export const fill = (options: FillOptions | undefined) => {
    return new FillStyle(options)
}

export const stroke = (options: StrokeOptions | undefined) => {
    return new StrokeStyle(options)
}

export const style = (options: StyleOptions | undefined) => {
    return new StyleLike(options)
}

export const getDPI = () => {
	var div = document.createElement('div');
	div.style.height = '1in';
	div.style.width = '1in';
	div.style.top = '100%';
	div.style.left = '100%';
	div.style.position = 'absolute';
	
	document.body.appendChild(div);
	var dpi = div.offsetHeight;
	document.body.removeChild(div);
	return dpi;
};

export const resolutionToScale = (resolution: number): number => {
    const dpi = 25.4 / 0.28;
    const inchesPerMeter = 39.37;
    return resolution * inchesPerMeter * dpi;
}

// **********************************
const image = new CircleStyle({
    radius: 5,
    fill: undefined,
    stroke: stroke({ color: 'red', width: 1 }),
});


const styles = {
    // 'Point': style({
    //     image: image,
    // }),
    // 'LineString': style({
    //     stroke: stroke({
    //         color: '#green',
    //         width: 1,
    //     }),
    // }),
    // 'MultiLineString': style({
    //     stroke: stroke({
    //         color: '#green',
    //         width: 1,
    //     }),
    // }),
    // 'MultiPoint': style({
    //     image: image,
    // }),
    // 'MultiPolygon': style({
    //     stroke: stroke({
    //         color: '#yellow',
    //         width: 1,
    //     }),
    //     fill: fill({
    //         color: 'rgba(255, 255, 0, 0.1)',
    //     }),
    // }),
    // 'GeometryCollection': style({
    //     stroke: stroke({
    //         color: 'magenta',
    //         width: 2,
    //     }),
    //     fill: fill({
    //         color: 'magenta',
    //     }),
    //     image: new CircleStyle({
    //         radius: 10,
    //         fill: null,
    //         stroke: stroke({
    //             color: 'magenta',
    //         }),
    //     }),
    // }),
    // 'Circle': style({
    //     stroke: stroke({
    //         color: 'red',
    //         width: 2,
    //     }),
    //     fill: fill({
    //         color: 'rgba(255,0,0,0.2)',
    //     }),
    // }),
    'Polygon': style({
        stroke: stroke({
            color: 'red',
            lineDash: [4],
            width: 3,
        }),
        fill: fill({
            color: '#00ff0033',

        }),
    }),
};


export const styleFunction = function (
    feature: Feature, 
    resolution: number) {
    const styleList = [
        style({
            stroke: stroke({
                color: '#DA440600',
                width: 1,
            }),
            fill: fill({
                color: '#DA440600',
            }),
        }),

        style({
            stroke: stroke({
                color: '#27A49B',
                width: 1,
            }),
            fill: fill({
                color: '#27A49B33',
            }),
        }),

        style({
            stroke: stroke({
                color: '#2D76A7',
                width: 1,
            }),
            fill: fill({
                color: '#2D76A733',
            }),
        }),

        style({
            stroke: stroke({
                color: '#773E81',
                width: 1,
            }),
            fill: fill({
                color: '#773E8133',
            }),
        }),

        style({
            stroke: stroke({
                color: '#468544',
                width: 1,
            }),
            fill: fill({
                color: '#46854433',
            }),
        }),

        style({
            stroke: stroke({
                color: '#9E5B80',
                width: 1,
            }),
            fill: fill({
                color: '#9E5B8033',
            }),
        }),

        style({
            stroke: stroke({
                color: '#8B5213',
                width: 1,
            }),
            fill: fill({
                color: '#8B521333',
            }),
        }),

        style({
            stroke: stroke({
                color: '#B49F4D',
                width: 1,
            }),
            fill: fill({
                color: '#B49F4D33',
            }),
        }),

        style({
            stroke: stroke({
                color: '#486C7B',
                width: 1,
            }),
            fill: fill({
                color: '#486C7B33',
            }),
        }),
    ]
    
    
    const geometryType = feature.getGeometry()?.getType();
    const no = feature.getProperties()["no"];


    // console.log("*************");
    // console.log(resolutionToScale(resolution));
    // console.log("*************");
    

    return styleList[no - 1];
};



export const testStyle = new StyleLike({
    stroke: stroke({
        color: 'rgba(0, 0, 255, 1.0)',
        width: 2,
    })
})