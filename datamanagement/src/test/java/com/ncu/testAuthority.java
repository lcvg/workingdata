package com.ncu;

import com.ncu.dao.FixedDao;
import com.ncu.model.Authority;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

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
public class testAuthority {
    @Autowired
    private FixedDao fixedDao;

    private static final Logger log = LoggerFactory.getLogger(testAuthority.class);

    @Test
    public void add(){
        Authority authority = new Authority();
        authority.setName("管理员");
        authority.setAuthorityCode("01");

         log.info("add = " + fixedDao.addAuthority(authority));


    }

    @Test
    public void update(){
        Authority authority = new Authority();
        authority.setId(1);
        authority.setName("管理员");
        authority.setAuthorityCode("02");

        log.info("add = " + fixedDao.updateAuthority(authority));


    }




    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+ fixedDao.getAuthority(1)+"");
        log.info("ddfdff"+ fixedDao.getAuthority(0)+"");
    }
    @Test
    public void delete(){

        fixedDao.deleteAuthority(1);
    }
}
