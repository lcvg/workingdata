package com.ncu.service;

import com.ncu.model.Query;
import com.ncu.model.Teacher;
import com.ncu.model.TeacherQuery;
import com.ncu.model.TeacherVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

//@Service
public interface TeacherService {
    /**
     * 添加教师
     * @param teacher
     * @return 主键id
     */
    Map<String, Object> saveTeacher(Teacher teacher);

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
    Map<String, Object> updateTeacher(Teacher teacher);

    /**
     * 查询教师信息
     * @param teacherQuery
     * @return
     */
    Map<String, Object> getTeacher(TeacherQuery teacherQuery);

    /**
     *批量删除
     * @param ids
     */
    Map<String, Object> removeTeacherByBatch(List<Integer> ids);

    Map<String , Object> getTeacherByAward(TeacherQuery teacherQuery);

    List<TeacherVO> export(Query query);

    int decRecord(String type,String jobNumber);
    int incRecord(String type,String jobNumber);

}
