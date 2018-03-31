package com.ncu.dao;

import com.ncu.model.Authority;
import com.ncu.model.Data;
import com.ncu.model.Department;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.plugin.Interceptor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
@Repository
public interface FixedDao {
    Integer addAuthority(Authority authority) ;
    Integer updateAuthority(Authority authority) ;
    List<Authority> getAuthority(@Param("id") Integer id);
    void deleteAuthority(@Param("id") Integer id);

    //部门
    Integer addDepartment(Department department);
    Integer updateDepartment(Department department);
    List<Department> findDepartment(@Param("depName") String depName);
    Integer deleteDepartment(@Param("id") int id);
    void addDepartmentByBatch(List<Department> ids);
}
