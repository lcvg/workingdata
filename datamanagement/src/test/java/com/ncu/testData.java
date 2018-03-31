package com.ncu;

import com.ncu.dao.DataDao;
import com.ncu.dao.LogDao;
import com.ncu.model.Data;
import com.ncu.model.Log;
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
public class testData {
    @Autowired
    private DataDao dataDao;

    private static final Logger log = LoggerFactory.getLogger(testData.class);

    @Test
    public void add(){
        Data data  = new Data();
        data.setDataId("1421");
        data.setDataName("name");
        data.setDataPath("/data/path");
        data.setDataType("jiaogai");
        data.setOwner("0258");
        data.setOwnerName("hcy");
        data.setRecordId(4);
        data.setUploadDate(new Date());

         log.info("add = " + dataDao.addData(data));


    }




//
//    @Test
//    public void get(){
//
//        log.debug("wodedeubg");
//        log.info("ddfdff"+dataDao.getData(1)+"");
//        log.info("ddfdff"+dataDao.getData(0)+"");
//    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
//        list.add(3);
//        list.add(5);
        dataDao.deleteDataByBatch(list);
    }
}
