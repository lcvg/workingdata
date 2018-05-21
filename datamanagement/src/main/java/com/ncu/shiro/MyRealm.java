package com.ncu.shiro;

import com.ncu.dao.Mapper;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by 黄重杨 on 2018/3/13.
 * ClassName: MyRealm
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 16:23 2018/3/13
 * @Modified By:
 */
@Component
@Transactional
public class MyRealm extends AuthorizingRealm {
    @Autowired
    private Mapper mapper;
    /**
     权限认证
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        String userId = principalCollection.getPrimaryPrincipal().toString();
        User user= mapper.findById(userId);
        if(user!=null){
            //权限信息对象info,用来存放查出的用户的所有的角色（role）及权限（permission）
            SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
            Set<String> set =new HashSet<String>();
            List<Role> roleList=user.getRoleList();
            List<String> permission = new ArrayList<>();
            for (Role role : roleList) {
                for (RoleToPermission r : role.getPermissionList()){
                    permission.add(r.getPermissionName());
                }

                set.add(role.getRoleName());
            }
            //用户的角色集合
            info.setRoles(set);
            info.addStringPermissions(permission);
            //用户的角色对应的所有权限，如果只使用角色定义访问权限，下面的四行可以不要
            return info;
        }


        return null;
    }
    /**
     登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //UsernamePasswordToken对象用来存放提交的登录信息
        UsernamePasswordToken token=(UsernamePasswordToken) authenticationToken;
        String username = token.getUsername();
        String password = new String((char[]) authenticationToken.getCredentials());
        //查出是否有此用户
//            User user= mapper.findById(token.getUsername());
        User user= mapper.findById(username);
        if(user != null){
            //若存在，将此用户存放到登录认证info中
            return new SimpleAuthenticationInfo(user.getJobNumber(), user.getPassword(), getName());
        }
        return null;


    }
}
