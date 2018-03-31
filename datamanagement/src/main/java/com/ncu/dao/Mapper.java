package com.ncu.dao;


import com.ncu.shiro.Role;
import com.ncu.shiro.RoleToPermission;
import com.ncu.shiro.UserToRole;
import com.ncu.shiro.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 黄重杨 on 2018/3/13.
 * ClassName: Mapper
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:50 2018/3/13
 * @Modified By:
 */
@Repository
public interface Mapper {
    User findById(@Param("jobNumber") String jobNumber);
    int insertRole(Role role);
    int insertPermission(RoleToPermission roleToPermission);
    int insertUserToRole(UserToRole userToRole);

    int updateRole(Role role);
    int updatePermission(RoleToPermission roleToPermission);
    int updateUserToRole(UserToRole userToRole);

    int deleteRole(int id);
    int deletePermission(int id);
    int deleteUserToRole(int id);
    int deleteUserToRoleByNum(String id);
    List<Role> selectRole();
    List<RoleToPermission> seletctPermission();
    List<UserToRole> seletctUserToRole();


}
