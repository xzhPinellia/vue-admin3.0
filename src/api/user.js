import service from "@/utils/request";
/**
 * 列表
 */
export function GetRole(data={}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

/**
 * 列表
 */
export function UserAdd(data={}){
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}
