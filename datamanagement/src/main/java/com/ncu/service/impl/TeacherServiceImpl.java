package com.ncu.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.ncu.dao.*;
import com.ncu.model.Query;
import com.ncu.model.Teacher;
import com.ncu.model.TeacherQuery;
import com.ncu.model.TeacherVO;
import com.ncu.service.TeacherService;
import com.ncu.shiro.UserToRole;
import com.ncu.utils.Encrypte;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by 黄重杨 on 2018/1/13.
 * ClassName: TeacherServiceImpl
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:12 2018/1/13
 * @Modified By:
 */
@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    TeacherDao teacherDao;
    @Autowired
    AwardRecordsDao awardRecordsDao;
    @Autowired
    BuildProjectDao buildProjectDao;
    @Autowired
    TeachingReformDao teachingReformDao;
    @Autowired
    TextBookDao textBookDao;
    @Autowired
    Mapper mapper;
    private Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);
    @Override
    @Transactional
    public Map<String, Object> saveTeacher(Teacher teacher) {
        Map<String,Object> map = new HashMap<>();
        try {
            if(teacher.getId()!=null){
                if(teacher.getPassword()!=null){
                    teacher.setPassword(Encrypte.jdkSHA1(teacher.getPassword()));
                }
                mapper.deleteUserToRoleByNum(teacher.getJobNumber());
                teacherDao.updateTeacher(teacher);
            }else {
                teacher.setPassword(Encrypte.jdkSHA1(teacher.getPassword()));
                teacherDao.addTeacher(teacher);
            }
            if("1".equals(teacher.getPermission())){
                UserToRole u = new UserToRole();
                u.setUserId(teacher.getJobNumber());
                u.setRoleId("1");
                mapper.insertUserToRole(u);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",13);
            map.put("msg","add teacher error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;

    }

    @Override
    @Transactional
    public Map<String, Object> updateTeacher(Teacher teacher) {
        Map<String,Object> map = new HashMap<>();
        try {
            teacherDao.updateTeacher(teacher);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",12);
            map.put("msg","upeate teacher error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }



    @Override
    public  Map<String, Object> removeTeacherByBatch(List<Integer> ids) {
        Map<String,Object> map = new HashMap<>();
        try {
            teacherDao.deleteTeacherByBatch(ids);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",11);
            map.put("msg","remove teacher error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    @Transactional
    public Map<String,Object> saveTeacherByBatch(List<Teacher> teacher) {
        Map<String,Object> map = new HashMap<>();
        try {
            teacherDao.addTeacherByBatch(teacher);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",13);
            map.put("msg","add teacher error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;

    }

    @Override
    public Map<String, Object> getTeacher(TeacherQuery query) {
        Map<String, Object> map = new HashMap<>();
        try {
            if (query.getPageNum() == null || query.getPageNum() == 0) {
                query.setPageNum(1);
            }
            if (query.getPageSize() == null) {
                query.setPageSize(10);
            }
            Page<?> page = PageHelper.startPage(query.getPageNum(), query.getPageSize());
            map.put("teacher", teacherDao.getTeacher(query));
            map.put("size", page.getTotal());

        }catch (Exception e){
            e.getStackTrace();
            map.put("code",1);
            map.put("msg","find teacher error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String, Object> getTeacherByAward(TeacherQuery teacherQuery) {
        Map<String , Object> map = new HashMap<>();
        map.put("teacher",teacherDao.getTeacherByAward(teacherQuery));
        return map;
    }

    @Override
    public List<TeacherVO> export(Query query) {
        TeacherQuery teacherQuery = new TeacherQuery() ;
        teacherQuery.setJobNumber(query.getJobNumber());
        List<TeacherVO> teacherList = teacherDao.getTeacher(teacherQuery);
        for (TeacherVO t:teacherList) {
            query.setJobNumber(t.getJobNumber());
            String type = query.getSortType();
            if (type.contains("1")) {
                t.setBuildProject(buildProjectDao.getSize(query));
            }
            if (type.contains("6")) {
                t.setRecords(awardRecordsDao.getSize(query));
            }

            if (type.contains("4")) {
                t.setTeacherReform(teachingReformDao.getSize(query));
            }
            if (type.contains("5")) {
                t.setTextBook(textBookDao.getSize(query));
            }
        }
        Collections.sort(teacherList, new Comparator<TeacherVO>() {
            @Override
            public int compare(TeacherVO o1, TeacherVO o2) {
                int i = o2.getRecords()-o1.getRecords();
                System.out.println(i);
                if(i==0 && query.getSortType().contains("1")){
                    i = o2.getBuildProject()-o1.getBuildProject();
                }
                if(i==0 && query.getSortType().contains("4")){
                    i = o2.getTeacherReform()-o1.getTeacherReform();
                }
                if(i==0 && query.getSortType().contains("5")){
                    i = o2.getTextBook()-o1.getTextBook();

                }

                return i;
            }
        });
        return teacherList;
    }

    @Override
    public int decRecord(String type ,String jobNumber) {
        return teacherDao.decRecord(type,jobNumber);
    }

    @Override
    public int incRecord(String type,String jobNumber) {
        return teacherDao.incRecord(type,jobNumber);
    }
}
