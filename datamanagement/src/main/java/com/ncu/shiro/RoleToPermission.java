package com.ncu.shiro;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/3/13.
 * ClassName: RoleToPermission
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:49 2018/3/13
 * @Modified By:
 */
public class RoleToPermission implements Serializable {
    private int id;
    private String roleId;
    private String permissionName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }
}
