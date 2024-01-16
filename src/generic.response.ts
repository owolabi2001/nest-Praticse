export const genericResponse = (
    code:string,
    message:string,
    data?:any,
    metaData?:any)=>{
    return {
        code:code,
        message:message,
        data:data,
        metaData:metaData
    }
}