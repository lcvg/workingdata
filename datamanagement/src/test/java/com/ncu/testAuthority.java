package com.ncu;

import com.ncu.dao.AuthorityDao;
import com.ncu.dao.DataDao;
import com.ncu.model.Authority;
import com.ncu.model.Data;
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
public class testAuthority {
    @Autowired
    private AuthorityDao authorityDao;

    private static final Logger log = LoggerFactory.getLogger(testAuthority.class);

    @Test
    public void add(){
        Authority authority = new Authority();
        authority.setName("管理员");
        authority.setAuthorityCode("01");

         log.info("add = " + authorityDao.addAuthority(authority));


    }

    @Test
    public void update(){
        Authority authority = new Authority();
        authority.setId(1);
        authority.setName("管理员");
        authority.setAuthorityCode("02");

        log.info("add = " + authorityDao.updateAuthority(authority));


    }




    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+authorityDao.getAuthority(1)+"");
        log.info("ddfdff"+authorityDao.getAuthority(0)+"");
    }
    @Test
    public void delete(){

        authorityDao.deleteAuthority(1);
    }
}
