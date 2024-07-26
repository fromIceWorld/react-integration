import React,{ useEffect, useState } from "react"
import {config2Obj} from '../../../utils/TransformConfig'
interface Config{
    [key:string]:any
}
interface RemoteModule {
    remoteEntry:string,
    remoteName:string,
    exposedModule:string,
}
interface Props {
    id:string,
    idMapRemote:Map<string,any>,
}

function getRemoteConfig(map:Map<string,any>,id:string,key:string){
    return map.has(id) ? map.get(id)[key] : ''
}

const notView = ()=>{
    return <>404</>
}




const RemoteComponent = (props:Props)=>{
    const [Component,updateComponent] = useState('div');
    
    function loadComponent (url:string,key:string,config:any){
        return new Promise((resolve,reject)=>{
            let script = document.createElement('script');
            script.src = url;
            script.onload = ()=>{
                // @ts-ignore
                console.log('load',react_app.get(`${key}`).then(res=>{
                    let module = res();
                    // 转化 config 配置项
                    const {props} =config
                    let configObj = config2Obj(props);
                    console.log(configObj);
                    // 传递props
                    resolve({
                        default:()=>module.default(configObj)
                    })
                }))
                
            }
            document.body.append(script)
        })
    }
    useEffect(()=>{
        console.log(123)
        const  remoteEntry = getRemoteConfig(props.idMapRemote,props.id,'remoteEntry' ),
        remoteName = getRemoteConfig(props.idMapRemote,props.id,'remoteName' ),
        exposedModule = getRemoteConfig(props.idMapRemote,props.id,'exposedModule' ),
        config = getRemoteConfig(props.idMapRemote,props.id,'config');
        if(remoteEntry){
            console.log(remoteEntry)
            // @ts-ignore
            updateComponent(React.lazy(()=>loadComponent('store/dist/remoteEntry.js',`./${exposedModule}`,config)))
        }
        },[])
    return <>
        {props.id}
                <React.Suspense fallback="Loading Dialog...">
                    <Component ></Component>
                </React.Suspense>
            </>  
             
}
export default RemoteComponent