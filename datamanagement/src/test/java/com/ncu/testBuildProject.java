package com.ncu;

import com.ncu.dao.BuildProjectDao;
import com.ncu.dao.ProjectAssessDao;
import com.ncu.model.BuildProject;
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
public class testBuildProject {
    @Autowired
    private BuildProjectDao buildProjectDao;

    private static final Logger log = LoggerFactory.getLogger(testBuildProject.class);

    @Test
    public void add(){

        BuildProject buildProject = new BuildProject();
        buildProject.setProjectName("python高级");
        buildProject.setProjectId("12356");
        buildProject.setBuildDate(new Date());
        buildProject.setMajor("软件工程");
        buildProject.setState("1");
        buildProject.setTeachingMethod("1");
         log.info("add = " + buildProjectDao.addBuildProject(buildProject));





    }

    @Test
    public void addByBatch(){
        List<BuildProject> buildProjects = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            BuildProject buildProject = new BuildProject();
            buildProject.setProjectName("python高级");
            buildProject.setProjectId("12356");
            buildProject.setBuildDate(new Date());
            buildProject.setMajor("软件工程");
            buildProject.setState("1");
            buildProjects.add(buildProject);
            buildProject.setTeachingMethod("2");
        }

        buildProjectDao.addBuildProjectByBatch(buildProjects);

    }


    @Test
    public void update(){
        BuildProject buildProject = new BuildProject();
        buildProject.setProjectName("python高级");
        buildProject.setProjectId("57896");
        buildProject.setBuildDate(new Date());
        buildProject.setMajor("软件工程");
        buildProject.setState("1");
        buildProject.setTeachingMethod("3");
        buildProject.setId(1);
        buildProjectDao.updateBuildProject(buildProject);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        buildProjectDao.checkByBatch(list);
    }

    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+buildProjectDao.getBuildProject(1)+"");
        log.info("ddfdff"+buildProjectDao.getBuildProject(0)+"");
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
        list.add(4);
        list.add(5);
        buildProjectDao.deleteBuildProjectByBatch(list);
    }
}
