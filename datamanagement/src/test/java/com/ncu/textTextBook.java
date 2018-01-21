package com.ncu;

import com.ncu.dao.TextBookDao;
import com.ncu.model.TextBook;
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
public class textTextBook {
    @Autowired
    private TextBookDao textBookDao;

    private static final Logger log = LoggerFactory.getLogger(textTextBook.class);

    @Test
    public void add(){

        TextBook textBook = new TextBook();
        textBook.setState("1");
        textBook.setCompose("第一章");
        textBook.setIsbn("957-7-115-43730-3");
        textBook.setPress("人民邮电出版社");
        textBook.setIntroduce("简介");
        textBook.setTextbook("深入React技术栈");
        textBook.setType("计算机读物");
        textBook.setPublishDate(new Date());
         log.info("add = " + textBookDao.addTextBook(textBook));





    }

    @Test
    public void addByBatch(){
        List<TextBook> textBooks = new ArrayList<>();
        for (int i = 0;i < 4;i++){
            TextBook textBook = new TextBook();
            textBook.setState("1");
            textBook.setCompose("第一章");
            textBook.setIsbn("957-7-115-43730-3");
            textBook.setPress("人民邮电出版社");
            textBook.setIntroduce("简介");
            textBook.setTextbook("深入React技术栈");
            textBook.setType("计算机读物");
            textBook.setPublishDate(new Date());
            textBooks.add(textBook);
        }

        textBookDao.addTextBookByBatch(textBooks);

    }


    @Test
    public void update(){
        TextBook textBook = new TextBook();
        textBook.setState("1");
        textBook.setCompose("第一章,第二章");
        textBook.setIsbn("957-7-115-43730-3");
        textBook.setPress("人民邮电出版社");
        textBook.setIntroduce("简介");
        textBook.setTextbook("深入React技术栈");
        textBook.setType("计算机读物");
        textBook.setPublishDate(new Date());
        textBookDao.updateTextBook(textBook);
    }
    @Test
    public void updateByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(3);
        list.add(5);
        textBookDao.checkByBatch(list);
    }
    @Test
    public void updateNOByBatch(){
        List<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(4);
//        list.add(5);
        textBookDao.checkNoByBatch(list);
    }

    @Test
    public void get(){

        log.debug("wodedeubg");
        log.info("ddfdff"+textBookDao.getTextBook(1)+"");
        log.info("ddfdff"+textBookDao.getTextBook(0)+"");
    }
    @Test
    public void delete(){
        List<Integer> list = new ArrayList<>();
//        list.add(1);
        list.add(4);
        list.add(5);
        textBookDao.deleteTextBookByBatch(list);
    }
}
