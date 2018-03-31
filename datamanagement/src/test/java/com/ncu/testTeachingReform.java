package com.ncu;

import com.ncu.dao.BuildProjectDao;
import com.ncu.dao.TeachingReformDao;
import com.ncu.model.BuildProject;
import com.ncu.model.TeachingReform;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/12.
 * ClassName: testTeacherMapper
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:24 2018/1/12
 */
//@Log4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class testTeachingReform {
    @Autowired
    private TeachingReformDao teachingReformDao;

    private static final Logger log = LoggerFactory.getLogger(testTeachingReform.class);

    @Test
    public void add(){

        TeachingReform teachingReform = new TeachingReform();
        teachingReform.setProjectId("[赣]字 12356");
        teachingReform.setProjectName("基于spring cloud 的docker研究");
        teachingReform.setCompere("小明");
        teachingReform.setProjectType("重点");
        teachingReform.setState("1");
        teachingReform.setProjectIntroduce("简介.....");
        teachingReform.setReportTime(new Date());
         log.info("add = " + teachingReformDao.addTeachingReform(teachingReform));





    }

    @Test
    public void addByBatch(){
        List<TeachingReform> teachingReforms = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            TeachingReform teachingReform = new TeachingReform();
            teachingReform.setProjectId("[赣]字 12356");
            teachingReform.setProjectName("基于spring cloud 的docker研究");
            teachingReform.setCompere("小明");
            teachingReform.setProjectType("重点");
            teachingReform.setState("1");
            teachingReform.setProjectIntroduce("简介.....");
            teachingReform.setReportTime(new Date());
            teachingReforms.add(teachingReform);
        }

        teachingReformDao.addTeachingReformByBatch(teachingReforms);

    }


    @Test
    public void update(){
        TeachingReform teachingReform = new TeachingReform();
        teachingReform.setProjectId("[赣]字 18456");
        teachingReform.setProjectName("基于spring cloud 的docker研究");
        teachingReform.setCompere("小明");
//        teachingReform.setProjectType("重点");
//        teachingReform.setState("1");
//        teachingReform.setProjectIntroduce("简介.....");
//        teachingReform.setReportTime(new Date());
        teachingReform.setId(1);
        teachingReformDao.updateTeachingReform(teachingReform);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        teachingReformDao.checkByBatch(list);
    }
    @Test
    public void updateNoByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(4);
        teachingReformDao.checkNoByBatch(list);
    }

//    @Test
//    public void get(){
//
//        log.debug("wodedeubg");
//        log.info("ddfdff"+teachingReformDao.getTeachingReform(1)+"");
//        log.info("ddfdff"+teachingReformDao.getTeachingReform(0)+"");
//    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
        list.add(4);
        list.add(5);
        teachingReformDao.deleteTeachingReformByBatch(list);
    }
}
