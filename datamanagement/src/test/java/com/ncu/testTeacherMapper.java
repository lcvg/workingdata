package com.ncu;

import com.ncu.dao.TeacherDao;
import com.ncu.model.Teacher;
import com.ncu.service.TeacherService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/12.
 * ClassName: testTeacherMapper
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:24 2018/1/12
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class testTeacherMapper {
    @Autowired
    private TeacherDao teacherDao;
    @Autowired
    private TeacherService teacherService;
    private static final Logger log = LoggerFactory.getLogger(testTeacherMapper.class);

    @Test
    public void add(){

//        for (int i = 0;i < 4;i++){
            Teacher teacher = new Teacher();
            teacher.setName("王浪");
            teacher.setJobNumber("03442");
            teacher.setDepartment("0331");
            teacher.setDuty("授课，实践研究");
            teacher.setPhoneNumber("13998732277");
            teacher.setProfessionalTitle("副教授");
            teacher.setSex("男");
            teacher.setPermission("普通");
//            log.info("add = " + teacherDao.addTeacher(teacher));
            teacherService.saveTeacher(teacher)  ;
//        }



    }

    @Test
    public void addByBatch(){
        List<Teacher> teachers = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            Teacher teacher = new Teacher();
            teacher.setName("王浪");
            teacher.setJobNumber("03442");
            teacher.setDepartment("0331");
            teacher.setDuty("授课，实践研究");
            teacher.setPhoneNumber("13998732277");
            teacher.setProfessionalTitle("副教授");
            teacher.setSex("男");
            teacher.setPermission("普通");
//            log.info("add = " + teacherDao.addTeacher(teacher));
           teachers.add(teacher);
        }
        teacherDao.addTeacherByBatch(teachers);


    }

    @Test
    public void update(){
        Teacher teacher = new Teacher();
        teacher.setId(1);
        teacher.setName("王浪");
        teacher.setJobNumber("03442");
        teacher.setDepartment("0331");
        teacher.setDuty("授课，实践研究");
        teacher.setPhoneNumber("13998732277");
        teacher.setProfessionalTitle("教授");
        teacher.setSex("男");
        teacher.setPermission("高级");
        log.info("update = " + teacherDao.updateTeacher(teacher));
    }

    @Test
    public void get(){
        log.info("get Teacher = " + teacherDao.getTeacher(7));
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(4);
        list.add(5);
        teacherDao.deleteTeacherByBatch(list);
    }
}
