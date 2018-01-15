package com.ncu;

import com.ncu.dao.GuideRecordDao;
import com.ncu.dao.ProjectAssessDao;
import com.ncu.model.GuideRecord;
import com.ncu.model.ProjectAssess;
import com.ncu.service.TeacherService;
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
public class testProjectAssess {
    @Autowired
    private ProjectAssessDao projectAssessDao;
    @Autowired
    private TeacherService teacherService;
    private static final Logger log = LoggerFactory.getLogger(testProjectAssess.class);

    @Test
    public void add(){

        ProjectAssess projectAssess = new ProjectAssess();
        projectAssess.setAssessDate(new Date());
        projectAssess.setAssessMode("一般");
        projectAssess.setProjectId("[赣]字125326");
        projectAssess.setProjectName("基于自动化平台的服务与消费");
        projectAssess.setState("1");

         log.info("add = " + projectAssessDao.addProjectAssess(projectAssess));





    }

    @Test
    public void addByBatch(){
        List<ProjectAssess> projectAssesses = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            ProjectAssess projectAssess = new ProjectAssess();
            projectAssess.setAssessDate(new Date());
            projectAssess.setAssessMode("一般");
            projectAssess.setProjectId("[赣]字125326");
            projectAssess.setProjectName("基于自动化平台的服务与消费");
            projectAssesses.add(projectAssess);
            projectAssess.setState("1");

        }

        projectAssessDao.addProjectAssessByBatch(projectAssesses);

    }


    @Test
    public void update(){
        ProjectAssess projectAssess = new ProjectAssess();
        projectAssess.setAssessDate(new Date());
        projectAssess.setAssessMode("重点");
        projectAssess.setProjectId("[赣]字125326");
        projectAssess.setProjectName("基于自动化平台的服务与消费");
        projectAssess.setId(1);
        projectAssessDao.updateProjectAssess(projectAssess);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        projectAssessDao.checkByBatch(list);
    }

    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+projectAssessDao.getProjectAssess(1)+"");
        log.info("ddfdff"+projectAssessDao.getProjectAssess(0)+"");
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
        list.add(3);
        list.add(5);
        projectAssessDao.deleteProjectAssessByBatch(list);
    }
}
