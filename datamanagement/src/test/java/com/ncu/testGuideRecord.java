package com.ncu;

import com.ncu.dao.GuideRecordDao;
import com.ncu.dao.TeacherDao;
import com.ncu.model.GuideRecord;
import com.ncu.model.Teacher;
import com.ncu.service.TeacherService;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
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
public class testGuideRecord {
    @Autowired
    private GuideRecordDao guideRecordDao;
    @Autowired
    private TeacherService teacherService;
    private static final Logger log = LoggerFactory.getLogger(testGuideRecord.class);

    @Test
    public void add(){

//        for (int i = 0;i < 4;i++){
        GuideRecord guideRecord = new GuideRecord();
        guideRecord.setCompetitionName("蓝桥杯");
        guideRecord.setCompetitionType("国家级");
        guideRecord.setStudentName("小明");
        guideRecord.setStudentNumber("8000114110");
        guideRecord.setStudentClass("东软141");
        guideRecord.setStudentType("本科生");
        guideRecord.setGuideDate(new Date());
        guideRecord.setState("1");
        log.info("add = " + guideRecordDao.addGuideRecord(guideRecord));

//        }



    }

    @Test
    public void addByBatch(){
        List<GuideRecord> guideRecords = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            GuideRecord guideRecord = new GuideRecord();
            guideRecord.setCompetitionName("蓝桥杯");
            guideRecord.setCompetitionType("国家级");
            guideRecord.setStudentName("小明");
            guideRecord.setStudentNumber("8000114110");
            guideRecord.setStudentClass("东软141");
            guideRecord.setStudentType("本科生");
            guideRecord.setGuideDate(new Date());
            guideRecord.setState("1");
            guideRecords.add(guideRecord);

        }

        guideRecordDao.addGuideRecordByBatch(guideRecords);

    }


    @Test
    public void update(){
        GuideRecord guideRecord = new GuideRecord();
        guideRecord.setId(1);
        guideRecord.setCompetitionName("蓝桥杯");
        guideRecord.setCompetitionType("国家级");
        guideRecord.setStudentName("小明");
        guideRecord.setStudentNumber("8000114111");
        guideRecord.setStudentClass("东软141");
        guideRecord.setStudentType("本科生");
        guideRecord.setGuideDate(new Date());
        guideRecord.setState("1");
        guideRecordDao.updateGuideRecord(guideRecord);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        guideRecordDao.checkByBatch(list);
    }

//    @Test
//    public void get(){
//
//        log.debug("wodedeubg");
//        log.info("ddfdff"+guideRecordDao.getGuideRecord(1)+"");
//    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
//        list.add(3);
        list.add(5);
        guideRecordDao.deleteGuideRecordByBatch(list);
    }
}
