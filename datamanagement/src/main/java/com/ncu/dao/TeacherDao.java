package com.ncu.dao;

import com.ncu.model.Teacher;
import com.ncu.model.TeacherVO;
import com.ncu.model.TeacherQuery;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
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
     * @param teacherQuery
     * @return
     */
    List<TeacherVO> getTeacher(TeacherQuery teacherQuery);

    /**
     *批量删除
     * @param ids
     */
    void deleteTeacherByBatch(List<Integer> ids);

    /**
     * 按获奖记录排序
     */
    List<TeacherVO> getTeacherByAward(TeacherQuery teacherQuery);
    List<TeacherVO> getTeacherAndCount(TeacherQuery teacherQuery);


    int getSize(TeacherQuery teacherQuery);

    int decRecord(@Param("type") String type,@Param("jobNumber") String jobNumber);
    int incRecord(@Param("type") String type,@Param("jobNumber") String jobNumber);


}
