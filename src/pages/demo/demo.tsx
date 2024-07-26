//@ts-ignore
import GridLayout from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import React from "react";
import RemoteComponent from './components/remoteComponent'
import { config2HumpObj } from "../../utils/TransformConfig";

interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    id: number;
}

const remoteEntry = new Map([
    [
        "c",
        {
            "remoteEntry": "react_app/remoteEntry.js",
            "remoteName": "react_app",
            "exposedModule": "ListUserReactComponent",
            "mount": "createApp",
            "unmount": "unmount",
            "isApp": true,
            "webComponentSelector": "",
            "config": {
                "props": [
                    {
                        "label": "users",
                        "type": "object",
                        "value": [
                            {
                                "name": "123"
                            }
                        ]
                    }
                ],
                "function": {},
                "style": [
                    {
                        "label": "text-align",
                        "type": "select",
                        "options": [
                            {
                                "label": "left",
                                "value": "left"
                            },
                            {
                                "label": "right",
                                "value": "right"
                            },
                            {
                                "label": "center",
                                "value": "center"
                            }
                        ],
                        "value": "left"
                    },
                    {
                        "label": "align-items",
                        "type": "select",
                        "options": [
                            {
                                "label": "normal",
                                "value": "normal"
                            },
                            {
                                "label": "start",
                                "value": "start"
                            },
                            {
                                "label": "end",
                                "value": "end"
                            },
                            {
                                "label": "center",
                                "value": "center"
                            }
                        ],
                        "value": "normal"
                    },
                    {
                        "label": "border-top",
                        "type": "string",
                        "value": "1px solid #00000017"
                    },
                    {
                        "label": "border-right",
                        "type": "string",
                        "value": "1px solid #00000017"
                    },
                    {
                        "label": "border-bottom",
                        "type": "string",
                        "value": "1px solid #00000017"
                    },
                    {
                        "label": "border-left",
                        "type": "string",
                        "value": "1px solid #00000017"
                    },
                    {
                        "label": "border-radius",
                        "type": "string",
                        "value": "0px"
                    },
                    {
                        "label": "padding",
                        "type": "string",
                        "value": "0px"
                    },
                    {
                        "label": "background-color",
                        "type": "color",
                        "value": "#fff0"
                    },
                    {
                        "label": "background-image",
                        "type": "image",
                        "value": ""
                    },
                    {
                        "label": "background-repeat",
                        "type": "string",
                        "value": "no-repeat"
                    },
                    {
                        "label": "background-size",
                        "type": "string",
                        "value": "cover"
                    },
                    {
                        "label": "z-index",
                        "type": "number",
                        "value": 1
                    }
                ]
            }
        }
    ]
])
const layout =[
    {
        "i": "a",
        "x": 50,
        "y": 0,
        "w": 60,
        "h": 12,
        "id": 0
    },
    {
        "i": "b",
        "x": 100,
        "y": 0,
        "w": 60,
        "h": 12,
        "id": 1
    },
    {
        "i": "c",
        "x": 140,
        "y": 0,
        "w": 60,
        "h": 12,
        "id": 0.952092704081295
    }
]
function getBoxStyleByID(idMapRemote:Map<string,any>,id:string):React.CSSProperties{
    const {config} = idMapRemote.get(id) || {},
        {style} = config || {};
    // react style 只接受驼峰key 
    return config2HumpObj(style || [])
}
const Demo = ()=>{

    return <div>
                <GridLayout  
                    margin={[1,1]} 
                    layout={layout} 
                    cols={1000} 
                    rowHeight={5} 
                    width={1920} 
                    compactType={null} 
                    allowOverlap={true}
                >
                        {
                        layout.map((item:LayoutItem)=>
                            <div style={getBoxStyleByID(remoteEntry,item.i)}   key={item.i}>
                                <RemoteComponent 
                                    id={item.i}
                                    idMapRemote = {remoteEntry}
                                ></RemoteComponent>
                            </div>)
                        }
                </GridLayout>
           </div>
}
export default Demo