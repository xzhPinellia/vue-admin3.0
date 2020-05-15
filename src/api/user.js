import service from "@/utils/request";
/**
 * 角色列表
 */
export function GetRole(data={}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

/**
 * 系统列表
 */
export function GetSystem(data={}){
    return service.request({
        method: "post",
        url: "/system/",
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
/**
 * 删除
 */
export function UserDel(data={}){
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}
/**
 * 用户禁启用
 */
export function UserActives(data){
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}
/**
 * 编辑
 */
export function UserEdit(data){
    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    })
}