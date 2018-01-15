package com.ncu.service;

import com.ncu.model.Teacher;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
public interface TeacherService {
    /**
     * 添加教师
     * @param teacher
     * @return 主键id
     */
    Integer saveTeacher(Teacher teacher);

    /**
     * 批量添加教师
     * @param teacher
     * @return 主键id
     */
    Integer saveTeacherByBatch(List<Teacher> teacher);


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
    List<Teacher> getTeacher(Integer id);

    /**
     *批量删除
     * @param ids
     */
    void removeTeacherByBatch(List<Integer> ids);
}
