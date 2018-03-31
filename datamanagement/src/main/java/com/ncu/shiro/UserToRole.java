package com.ncu.shiro;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/3/13.
 * ClassName: UserToRole
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:48 2018/3/13
 * @Modified By:
 */
public class UserToRole implements Serializable {
    private int id ;
    private String userId;
    private String roleId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
