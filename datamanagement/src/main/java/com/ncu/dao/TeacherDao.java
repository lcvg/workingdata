package com.ncu.dao;

import com.ncu.model.Teacher;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TeacherDao {
    /**
     * 添加教师
     * @param teacher
     * @return 主键id
     */
    Integer addTeacher(Teacher teacher);

    /**
     * 批量添加教师
     * @param teachers
     * @return 主键id
     */
    Integer addTeacherByBatch(List<Teacher> teachers);

    /**
     * 修改教师信息
     * @param teacher
     * @return
     */
    Integer updateTeacher(Teacher teacher);

    /**
     * 查询教师信息
     * @param id
     * @return
     */
    List<Teacher> getTeacher(@Param("id") Integer id);

    /**
     *批量删除
     * @param ids
     */
    void deleteTeacherByBatch(List<Integer> ids);
}
