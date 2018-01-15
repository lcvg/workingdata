package com.ncu.service.impl;

import com.ncu.dao.TeacherDao;
import com.ncu.model.Teacher;
import com.ncu.service.TeacherService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/13.
 * ClassName: TeacherServiceImpl
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:12 2018/1/13
 * @Modified By:
 */
@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    TeacherDao teacherDao;
    private Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);
    @Override
    @Transactional
    public Integer saveTeacher(Teacher teacher) {
        teacherDao.addTeacher(teacher);
        return teacher.getId();
    }

    @Override
    @Transactional
    public Integer updateTeacher(Teacher teacher) {
        return teacherDao.updateTeacher(teacher);
    }

    @Override
    public List<Teacher> getTeacher(Integer id) {
        return teacherDao.getTeacher(id);
    }

    @Override
    public void removeTeacherByBatch(List<Integer> ids) {
        teacherDao.deleteTeacherByBatch(ids);
    }

    @Override
    @Transactional
    public Integer saveTeacherByBatch(List<Teacher> teacher) {
        return teacherDao.addTeacherByBatch(teacher);
    }
}
