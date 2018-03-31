package com.ncu;

import com.ncu.dao.AwardRecordsDao;
import com.ncu.dao.TeachingReformDao;
import com.ncu.model.AwardRecords;
import com.ncu.model.Query;
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
public class testAwardRecords {
    @Autowired
    private AwardRecordsDao awardRecordsDao;

    private static final Logger log = LoggerFactory.getLogger(testAwardRecords.class);

    @Test
    public void add(){

        AwardRecords awardRecords = new AwardRecords();
        awardRecords.setState("1");
        awardRecords.setAwardContent("蓝桥杯");
        awardRecords.setAwardLevel("省级");
        awardRecords.setAwardDate(new Date());
        awardRecords.setJobNumber("1");
         log.info("add = " + awardRecordsDao.addAwardRecords(awardRecords));





    }

    @Test
    public void addByBatch(){
        List<AwardRecords> awardRecordss = new ArrayList<>();
        for (int i = 0;i < 2;i++){
            AwardRecords awardRecords = new AwardRecords();
            awardRecords.setState("1");
            awardRecords.setAwardContent("ddd");
            awardRecords.setAwardLevel("省级");
            awardRecords.setAwardDate(new Date());
            awardRecords.setJobNumber("4");
            awardRecordss.add(awardRecords);
        }

        awardRecordsDao.addAwardRecordsByBatch(awardRecordss);

    }


    @Test
    public void update(){
        AwardRecords awardRecords = new AwardRecords();
        awardRecords.setState("1");
        awardRecords.setAwardContent("蓝桥杯");
        awardRecords.setAwardLevel("省级");
        awardRecords.setAwardDate(new Date());
        awardRecords.setId(1);
        awardRecordsDao.updateAwardRecords(awardRecords);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        awardRecordsDao.checkByBatch(list);
    }
    @Test
    public void updateNoByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(4);
        awardRecordsDao.checkNoByBatch(list);
    }

    @Test
    public void get(){
        Query query = new Query();
        log.debug("wodedeubg");
        log.info("ddfdff"+awardRecordsDao.getAwardRecords(query)+"");
        log.info("ddfdff");
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
        list.add(4);
        list.add(5);
        awardRecordsDao.deleteAwardRecordsByBatch(list);
    }
}
