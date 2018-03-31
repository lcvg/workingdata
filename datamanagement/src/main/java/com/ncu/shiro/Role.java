package com.ncu.shiro;

import java.io.Serializable;
import java.util.List;

/**
 * Created by 黄重杨 on 2018/3/13.
 * ClassName: Role
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:46 2018/3/13
 * @Modified By:
 */
public class Role implements Serializable {
    private int id;
    private String roleName;
    private String roleId;
    private List<RoleToPermission> permissionList;//一个角色对应多个权限


    public List<RoleToPermission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<RoleToPermission> permissionList) {
        this.permissionList = permissionList;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
