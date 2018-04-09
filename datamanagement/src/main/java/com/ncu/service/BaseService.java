package com.ncu.service;

import com.ncu.model.*;
import com.ncu.shiro.Role;
import com.ncu.shiro.RoleToPermission;
import com.ncu.shiro.UserToRole;
import org.apache.ibatis.annotations.Param;


import java.util.List;
import java.util.Map;

/**
 * Created by 黄重杨 on 2018/1/26.
 * ClassName: BaseService
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 13:56 2018/1/26
 * @Modified By:
 */
public interface BaseService {
//    /*  获奖记录  */
    Map<String,Object> addAwardRecordsByBatch(List<AwardRecords> buildProjects) ;
//
    /* 建设课题*/
    Map<String,Object> addBuildProjectByBatch(List<BuildProject> buildProjects) ;

    /*配置*/
    Map<String,Object> addConfig(Config config,int type);
    Map<String,Object> updateConfigByBatch(List<Config> configList);
    Map<String,Object> getConfig(Integer id);
    Map<String,Object> deleteConfig(Integer id);
    Map<String,Object> getSize(Query query) ;

//    /*权限管理和部门*/
//    Map<String,Object> addAuthority(Authority authority) ;
//    Map<String,Object> updateAuthority(Authority authority) ;
//    Map<String , Object> getAuthority(Integer id);
//    Map<String,Object> deleteAuthority(Integer id);
//
//    //部门
    Map<String,Object> addDepartment(Department department);
//    Map<String,Object> updateDepartment(Department department);
//    Map<String , Object> findDepartment(String depName);
//    Map<String,Object> deleteDepartment(int id);
//
//    /*指导记录*/
    Map<String,Object> addGuideRecordByBatch(List<GuideRecord> guideRecords) ;
//
//    /*日志*/
    int addLog(Log log) ;
    Map<String,Object> deleteLogByBatch(List<Integer> ids);
//
//    /*公告*/
    Map<String,Object> addNotice(Notice notice);
//
//    /*课程考核*/
    Map<String,Object> addProjectAssessByBatch(List<ProjectAssess> projectAssesses);
//
//    /*教改课题*/
    Map<String,Object> addTeachingReformByBatch(List<TeachingReform> buildProjects) ;
//
//    /*出版教材*/
    Map<String,Object> addTextBookByBatch(List<TextBook> textBooks);
    Map<String , Object> find(Query query);
    Map<String , Object> findInfo(Query query);
    Map<String , Object> remove(List<Integer> ids,int type);
    Map<String , Object> checkByBatch(List<Integer> ids,int ype );
    Map<String , Object> checkNoByBatch(List<Integer> ids,int ype );

    Map<String ,Object> addRole(Role role);
    Map<String ,Object> addRoleToPermission(RoleToPermission roleToPermission);
    Map<String ,Object> addUserToRole(UserToRole userToRole);
    Map<String ,Object> findRole();
    Map<String ,Object> findPermission();
    Map<String ,Object> removeRole(int id);
    Map<String ,Object> removePermission(int id);
    Map<String ,Object> removeUserToRole(int id);

    Map<String ,Object> updateAttach(Data data);



}
