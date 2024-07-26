interface config {
    label: string;
    type: string;
    value: any;
}

function config2Obj(configList: [config]) {
    let obj: { [key: string]: any } = {};
    configList.forEach((item) => {
        const { label, type, value } = item;
        switch (type) {
            case 'boolean':
            case 'string':
            case 'number':
            case 'object':
            case 'image':
            case 'select':
            case 'color':
                obj[label] = value;
                break;
            default:
                console.log('未知类型:', type);
        }
    });
    return obj;
}
function config2HumpObj(configList: [config]) {
    let obj: { [key: string]: any } = {};
    configList.forEach((item) => {
        const { label, type, value } = item;
        switch (type) {
            case 'boolean':
            case 'string':
            case 'number':
            case 'object':
            case 'image':
            case 'select':
            case 'color':
                obj[
                    label.replace(/-([a-z])/, (all, i) => {
                        return i.toUpperCase();
                    })
                ] = value;
                break;
            default:
                console.log('未知类型:', type);
        }
    });
    return obj;
}
export { config2HumpObj, config2Obj };
