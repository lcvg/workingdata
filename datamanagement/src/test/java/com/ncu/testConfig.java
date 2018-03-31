package com.ncu;

import com.ncu.dao.ConfigDao;
import com.ncu.model.Config;
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
public class testConfig {
    @Autowired
    private ConfigDao configDao;

    private static final Logger log = LoggerFactory.getLogger(testConfig.class);

    @Test
    public void add(){
        Config config = new Config();
        config.setId(4);
        config.setBeginDate(new Date());
        config.setEndDate(new Date());
        log.info("add = " + configDao.addConfig(config));
    }

    @Test
    public void update(){
        Config config = new Config();
        config.setId(1);
        config.setBeginDate(new Date());
        config.setEndDate(new Date());
        log.info("add = " + configDao.updateConfig(config));
    }


    @Test
    public void updateByBatch(){
        Config config = new Config();
        config.setId(1);
        config.setBeginDate(new Date());
        config.setEndDate(new Date());
        Config config1 = new Config();
        config1.setId(2);
        config1.setBeginDate(new Date());
        config1.setEndDate(new Date());

        Config config2 = new Config();
        config2.setId(3);
        config2.setBeginDate(new Date());
        config2.setEndDate(new Date());

        List<Config> configs = new ArrayList<>();

        configs.add(config);
        configs.add(config1);
        configs.add(config2);
        configDao.updateConfigByBatch(configs);
    }


    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+configDao.getConfig(1)+"");
        log.info("ddfdff"+configDao.getConfig(0)+"");
    }
    @Test
    public void delete(){

        configDao.deleteConfig(1);
    }
}
