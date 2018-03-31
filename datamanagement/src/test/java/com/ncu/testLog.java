package com.ncu;

import com.ncu.dao.LogDao;
import com.ncu.dao.ProjectAssessDao;
import com.ncu.model.Log;
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
public class testLog {
    @Autowired
    private LogDao logDao;
    @Autowired
    private TeacherService teacherService;
    private static final Logger log = LoggerFactory.getLogger(testLog.class);

    @Test
    public void add(){
        Log l = new Log();
        l.setOperationTime(new Date());
        l.setOperator("0528");
        l.setOperatorName("hxy");
        l.setStep("tainjia");

         log.info("add = " + logDao.addLog(l));


    }



    @Test
    public void update(){
        Log l = new Log();
        l.setId(2);
        l.setOperationTime(new Date());
        l.setOperator("052e8");
        l.setOperatorName("hxy");
        l.setStep("tainjia");
        logDao.updateLog(l);
    }


    @Test
    public void get(){
//
//        log.debug("wodedeubg");
//        log.info("ddfdff"+logDao.getLog(1)+"");
//        log.info("ddfdff"+logDao.getLog(0)+"");
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
//        list.add(3);
//        list.add(5);
        logDao.deleteLogByBatch(list);
    }
}
