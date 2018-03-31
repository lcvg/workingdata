package com.ncu.shiro;

import com.ncu.model.Teacher;

import java.io.Serializable;
import java.util.List;

/**
 * Created by 黄重杨 on 2018/3/22.
 * ClassName: User
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:35 2018/3/22
 * @Modified By:
 */
public class User extends Teacher implements Serializable {
    private List<Role> roleList;

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }
}
