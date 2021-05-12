export function getFormBody(params) {
    let formBody=[];

    for(let prop in params){
        //encoding label n its value
        let encodedKey=encodeURIComponent(prop);
        let encodedValue=encodeURIComponent(params[prop]);
        
        formBody.push(encodedKey+"="+encodedValue);
    }
    return formBody.join('&');
}