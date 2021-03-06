package com.ncu.service.impl;

import com.alibaba.druid.support.logging.*;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.ncu.dao.*;
import com.ncu.env.TypeEnum;
import com.ncu.model.*;
import com.ncu.model.Log;
import com.ncu.service.BaseService;

import com.ncu.service.TeacherService;
import com.ncu.shiro.Role;
import com.ncu.shiro.RoleToPermission;
import com.ncu.shiro.UserToRole;
import com.ncu.websocket.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.*;

import static com.ncu.env.TypeEnum.*;

@Service
public class BaseServiceImpl implements BaseService {


    @Autowired
    AwardRecordsDao awardRecordsDao;
    @Autowired
    BuildProjectDao buildProjectDao;
    @Autowired
    ConfigDao configDao;
    @Autowired
    DataDao dataDao;
    @Autowired
    FixedDao fixedDao;
    @Autowired
    GuideRecordDao guideRecordDao;
    @Autowired
    LogDao logDao;
    @Autowired
    NoticeDao noticeDao;
    @Autowired
    ProjectAssessDao projectAssessDao;
    @Autowired
    TeachingReformDao teachingReformDao;
    @Autowired
    TextBookDao textBookDao;
    @Autowired
    Mapper mapper;
    @Autowired
    HttpSession session;
    @Autowired
    TeacherService teacher;



    @Override
    @Transactional
    public Map<String,Object> addAwardRecordsByBatch(List<AwardRecords> awardRecordsList) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        System.out.println(session.getId());
        Map<String,Object> map = new HashMap<>();
        List<Data> dataList = new ArrayList<>();
        try {
            if(awardRecordsList.get(0).getId()==null){
                for (AwardRecords ar : awardRecordsList){
                    awardRecordsDao.addAwardRecords(ar);
                    for(Data data : ar.getListData()){
                        data.setDataId(AWARDRECORDS.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(AWARDRECORDS.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(ar.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
                    teacher.incRecord(AWARDRECORDS.getIndex()+"",getTeacher(session).getJobNumber());
                    saveLog("添加获奖记录",ownerName,owner);
                }

            }else{
                AwardRecords awardRecords = awardRecordsList.get(0);
                awardRecords.setState("1");
                dataDao.deleteByRecord(awardRecords.getId(),AWARDRECORDS.getIndex()+"");
                for (Data data : awardRecords.getListData()){
                    data.setDataId(AWARDRECORDS.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(AWARDRECORDS.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(awardRecords.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                awardRecordsDao.updateAwardRecords(awardRecords);
                saveLog("修改获奖记录",ownerName,owner);

            }


        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }
















    @Override
    public Map<String,Object> checkByBatch(List<Integer> ids,int type) {
        Map<String , Object> map = new HashMap<>();
        try {
            TypeEnum t = TypeEnum.find(type) ;
            if (t == null){
                return null;
            }
            switch (t){
                case BUILDPROJECT:
                    buildProjectDao.checkByBatch(ids);
                    break;
                case AWARDRECORDS:
                   awardRecordsDao.checkByBatch(ids);
                    break;
                case GUIDERECORD:
                    guideRecordDao.checkByBatch(ids);
                    break;
                case PROJECTASSESS:
                    projectAssessDao.checkByBatch(ids);
                    break;
                case TEACHERREFORM:
                    teachingReformDao.checkByBatch(ids);
                    break;
                case TEXTBOOK:
                    textBookDao.checkByBatch(ids);
                    break;
                default:
                    break;
            }


        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1895);
            map.put("msg","check error");
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String,Object> checkNoByBatch(List<Integer> ids,int type) {
        Map<String , Object> map = new HashMap<>();
        try {
            TypeEnum t = TypeEnum.find(type) ;
            if (t == null){
                return null;
            }
            switch (t){
                case BUILDPROJECT:
                    buildProjectDao.checkNoByBatch(ids);
                    break;
                case AWARDRECORDS:
                    awardRecordsDao.checkNoByBatch(ids);
                    break;
                case GUIDERECORD:
                    guideRecordDao.checkNoByBatch(ids);
                    break;
                case PROJECTASSESS:
                    projectAssessDao.checkNoByBatch(ids);
                    break;
                case TEACHERREFORM:
                    teachingReformDao.checkNoByBatch(ids);
                    break;
                case TEXTBOOK:
                    textBookDao.checkNoByBatch(ids);
                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1895);
            map.put("msg","check error");
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String, Object> addRole(Role role) {
        Map<String , Object> map = new HashMap<>();
        try {
            if(role.getId()!= 0){
                mapper.updateRole(role);
            }else{
                mapper.insertRole(role);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String, Object> addRoleToPermission(RoleToPermission roleToPermission) {
        Map<String , Object> map = new HashMap<>();
        try {
            if(roleToPermission.getId()!=0){
                mapper.updatePermission(roleToPermission);
            }else{
                mapper.insertPermission(roleToPermission);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;


    }

    @Override
    public Map<String, Object> findRole() {
        Map<String , Object> map = new HashMap<>();
        try {
            map.put("list",mapper.selectRole());
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String, Object> addUserToRole(UserToRole userToRole) {
        Map<String , Object> map = new HashMap<>();
        try {
            mapper.insertUserToRole(userToRole);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }


    @Override
    public Map<String,Object> addConfig(Config config ,int type) {

        Map<String , Object> map = new HashMap<>();
        if (type==1){
            try {
                configDao.addConfig(config);

            } catch (Exception e) {
                e.printStackTrace();
                map.put("code",1891);
                map.put("msg","add error");
                return map;
            }
        }else {
            try {
                configDao.updateConfig(config);

            } catch (Exception e) {
                map.put("code",1892);
                map.put("msg","update error");
                return map;
            }
        }

        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String,Object> updateConfigByBatch(List<Config> configList) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String ,Object> map = new HashMap<>();
        try {
            configDao.updateConfigByBatch(configList);
            saveLog("修改有效时间",ownerName,owner);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }
//
    @Override
    public Map<String , Object> getConfig(Integer id) {
        Map<String , Object> map = new HashMap<>();
        try {
            map.put("list",configDao.getConfig(id));
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","find error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    @Override
    public Map<String,Object> deleteConfig(Integer id) {
        Map<String , Object> map = new HashMap<>();
        try {
            configDao.deleteConfig(id);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1894);
            map.put("msg","remove error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;

    }

//
    @Override
    @Transactional
    public Map<String,Object> addGuideRecordByBatch(List<GuideRecord> guideRecords) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String,Object> map = new HashMap<>();
//        List<BuildProject> buildProjects = (List<BuildProject>) object;
        List<Data> dataList = new ArrayList<>();
        try {
            if(guideRecords.get(0).getId()==null){
                for (GuideRecord guideRecord : guideRecords){
                    guideRecordDao.addGuideRecord(guideRecord);
                    for (Data data : guideRecord.getListData()){
                        data.setDataId(GUIDERECORD.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(GUIDERECORD.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(guideRecord.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
//                    teacher.incRecord(GUIDERECORD.getIndex()+"");
                    saveLog("添加指导记录",ownerName,owner);
                }

            }else{
                GuideRecord guideRecord = guideRecords.get(0);
                guideRecord.setState("1");
                dataDao.deleteByRecord(guideRecord.getId(),GUIDERECORD.getIndex()+"");
                for (Data data : guideRecord.getListData()){
                    data.setDataId(GUIDERECORD.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(GUIDERECORD.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(guideRecord.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                guideRecordDao.updateGuideRecord(guideRecord);
                saveLog("修改指导记录",ownerName,owner);

            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }









//
//    @Override
//    public Map<String,Object> deleteGuideRecordByBatch(List<Integer> ids) {
//        guideRecordDao.deleteGuideRecordByBatch(ids);
//    }
//
    @Override
    public int addLog(Log log) {
        return logDao.addLog(log);
    }


    @Override
    public Map<String,Object> deleteLogByBatch(List<Integer> ids) {
        Map<String,Object> map  = new HashMap<>();
        try {
            logDao.deleteLogByBatch(ids);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","remove error");
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;

    }
//
    @Override
    @Transactional
    public Map<String,Object> addNotice(Notice notice) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        notice.setCreateDate(new Date());
        Map<String,Object> map = new HashMap<>();
        List<Data> dataList = new ArrayList<>();
        if (notice.getId() == null){
            try {
                noticeDao.addNotice(notice);
                for (Data data : notice.getListData()) {
                    data.setDataId(NOTICE.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(NOTICE.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(notice.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                WebSocketServer.sendInfo("true");
            } catch (Exception e) {
                e.printStackTrace();
                map.put("code",1891);
                map.put("msg","add error");
                return map;
            }
        }else {
            try {
                dataDao.deleteByRecord(notice.getId(),NOTICE.getIndex()+"");
                noticeDao.updateNotice(notice);
                for (Data data : notice.getListData()) {
                    data.setDataId(NOTICE.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(NOTICE.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(notice.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                saveLog("发布公告",ownerName,owner);

            } catch (Exception e) {
                e.printStackTrace();
                map.put("code",1892);
                map.put("msg","update error");
                return map;
            }
        }

        map.put("code",0);
        map.put("msg","ok");
        return map;

    }

    @Override
    public Map<String,Object> addProjectAssessByBatch(List<ProjectAssess> projectAssesses) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String,Object> map = new HashMap<>();
        List<Data> dataList = new ArrayList<>();
        try {
            if(projectAssesses.get(0).getId()==null){
                for (ProjectAssess projectAssess:projectAssesses){
                    projectAssessDao.addProjectAssess(projectAssess);
                    for(Data data : projectAssess.getListData()){
                        data.setDataId(PROJECTASSESS.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(PROJECTASSESS.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(projectAssess.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
//                    teacher.incRecord(PROJECTASSESS.getIndex()+"");
                    saveLog("添加课程考核方式",ownerName,owner);
                }
            }else{
                ProjectAssess projectAssess = projectAssesses.get(0);
                projectAssess.setState("1");
                dataDao.deleteByRecord(projectAssess.getId(),PROJECTASSESS.getIndex()+"");
                for (Data data: projectAssess.getListData()) {
                    data.setDataId(PROJECTASSESS.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(PROJECTASSESS.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(projectAssess.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                projectAssessDao.updateProjectAssess(projectAssess);
                saveLog("修改课程考核方式",ownerName,owner);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }


//
    @Override
    @Transactional
    public Map<String,Object> addTeachingReformByBatch(List<TeachingReform> teachingReforms) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String,Object> map = new HashMap<>();
        List<Data> dataList = new ArrayList<>();
        try {
            if(teachingReforms.get(0).getId()==null){
                for (TeachingReform teachingReform:teachingReforms){
                    teachingReformDao.addTeachingReform(teachingReform);
                    for(Data data : teachingReform.getListData()){
                        data.setDataId(TEACHERREFORM.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(TEACHERREFORM.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(teachingReform.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
                    teacher.incRecord(TEACHERREFORM.getIndex()+"",getTeacher(session).getJobNumber());
                    saveLog("添加教改课题",ownerName,owner);
                }
            }else{
                TeachingReform teachingReform =teachingReforms.get(0);
                teachingReform.setState("1");
                dataDao.deleteByRecord(teachingReform.getId(),TEACHERREFORM.getIndex()+"");
                for (Data data: teachingReform.getListData()) {
                    data.setDataId(TEACHERREFORM.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(TEACHERREFORM.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(teachingReform.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                teachingReformDao.updateTeachingReform(teachingReform);
                saveLog("修改教改课题",ownerName,owner);

            }


        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
}

//
    @Override
    public Map<String,Object> addTextBookByBatch(List<TextBook> textBooks) {
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String,Object> map = new HashMap<>();
//        List<BuildProject> buildProjects = (List<BuildProject>) object;
        List<Data> dataList = new ArrayList<>();
        try {
            if(textBooks.get(0).getId()==null){
                for (TextBook textBook:textBooks){
                    textBookDao.addTextBook(textBook);
                    for(Data data : textBook.getListData()){
                        data.setDataId(TEXTBOOK.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(TEXTBOOK.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(textBook.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
                    teacher.incRecord(TEXTBOOK.getIndex()+"",getTeacher(session).getJobNumber());
                    saveLog("添加出版教材",ownerName,owner);
                }
            }else{
                TextBook textBook = textBooks.get(0);
                textBook.setState("1");
                dataDao.deleteByRecord(textBook.getId(),BUILDPROJECT.getIndex()+"");
                for (Data data: textBook.getListData()) {
                    data.setDataId(TEXTBOOK.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(TEXTBOOK.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(textBook.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                textBookDao.updateTextBook(textBook);
                saveLog("修改",ownerName,owner);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    public Map<String ,Object> find(Query query){
        Map<String , Object> map = new HashMap<>();
            try {
                if(query.getPageNum() == null || query.getPageNum() == 0){
                    query.setPageNum(1);
                }
                if(query.getPageSize() == null ){
                    query.setPageSize(10);
                }
            Page<?> page = PageHelper.startPage(query.getPageNum(),query.getPageSize());
            TypeEnum t = TypeEnum.find(query.getType()) ;
            if (t == null){
                return null;
            }
            switch (t){
                case BUILDPROJECT:
                    map.put("list",buildProjectDao.getBuildProject(query));
                    break;
                case AWARDRECORDS:
                    map.put("list",awardRecordsDao.getAwardRecords(query));
                    break;
                case GUIDERECORD:
                     map.put("list",guideRecordDao.getGuideRecord(query));
                     break;
                case PROJECTASSESS:
                    map.put("list",projectAssessDao.getProjectAssess(query));
                    break;
                case TEACHERREFORM:
                    map.put("list",teachingReformDao.getTeachingReform(query));
                    break;
                case TEXTBOOK:
                    map.put("list",textBookDao.getTextBook(query));
                    break;
                case NOTICE:
                    map.put("list",noticeDao.getNotice(query));
                    break;
                case DATA:
                    map.put("list",dataDao.getData(query));
                    break;
                case LOG:
                    map.put("list",logDao.getLog(query));
                    break;
                case DEPARTMENT:
                    map.put("list",fixedDao.findDepartment(null));
                    break;
                default:
                    break;
            }

            map.put("size",page.getTotal());
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","find error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }



    public Map<String ,Object> getSize(Query query){
        Map<String , Object> map = new HashMap<>();
        String type = query.getSortType();
        try {
            if(type.contains("1")){
                map.put("buildProject",buildProjectDao.getSize(query));
            }
            if(type.contains("6")){
                map.put("awardRecords",awardRecordsDao.getSize(query));
            }
            if(type.contains("4")){
                map.put("teachingReform",teachingReformDao.getSize(query));
            }
            if(type.contains("5")){
                map.put("textBook",textBookDao.getSize(query));
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","getSize error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }

    @Override
    public Map<String, Object> addDepartment(Department department) {
        Map<String , Object> map = new HashMap<>();
        try {
            if (department.getId()!= null ||"".equals(department.getId())){
                fixedDao.updateDepartment(department);
            }else {
                fixedDao.addDepartment(department);
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","Department error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }



    public Map<String,Object> remove (List<Integer> ids,int type){
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Query q = new Query();
        Map<String , Object> map = new HashMap<>();
        try {
            TypeEnum t = TypeEnum.find(type) ;
            if (t == null){
                return null;
            }
            switch (t){
                case BUILDPROJECT:
                    buildProjectDao.deleteBuildProjectByBatch(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,BUILDPROJECT.getIndex()+"");
                        teacher.decRecord(BUILDPROJECT.getIndex()+"",getTeacher(session).getJobNumber());
                    }
                    saveLog("删除建设课程",ownerName,owner);
                    break;
                case AWARDRECORDS:
                    awardRecordsDao.deleteAwardRecordsByBatch(ids);
                    deleteAttach(ids,q);
//                    for (int id : ids ) {
//                        dataDao.deleteByRecord(id,AWARDRECORDS.getIndex()+"");
//                        teacher.decRecord(AWARDRECORDS.getIndex()+"",getTeacher(session).getJobNumber());
//                    }
                    saveLog("删除获奖记录",ownerName,owner);
                    break;
                case GUIDERECORD:
                    guideRecordDao.deleteGuideRecordByBatch(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,GUIDERECORD.getIndex()+"");
                    }
                    saveLog("删除指导记录",ownerName,owner);
                    break;
                case PROJECTASSESS:
                    projectAssessDao.deleteProjectAssessByBatch(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,PROJECTASSESS.getIndex()+"");

                    }
                    saveLog("删除课程考核方式",ownerName,owner);
                    break;
                case TEACHERREFORM:
                    teachingReformDao.deleteTeachingReformByBatch(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,TEACHERREFORM.getIndex()+"");
                        teacher.decRecord(TEACHERREFORM.getIndex()+"",getTeacher(session).getJobNumber());
                    }
                    saveLog("删除教改课题",ownerName,owner);
                    break;
                case TEXTBOOK:
                    textBookDao.deleteTextBookByBatch(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,TEXTBOOK.getIndex()+"");
                        teacher.decRecord(TEXTBOOK.getIndex()+"",getTeacher(session).getJobNumber());
                    }
                    saveLog("删除出版教材",ownerName,owner);
                    break;
                case NOTICE:
                    noticeDao.deleteNotice(ids);
                    deleteAttach(ids,q);
                    for (int id : ids ) {
                        dataDao.deleteByRecord(id,NOTICE.getIndex()+"");
                    }
                    saveLog("删除公告",ownerName,owner);
                    break;
                case DATA:
                    for(int id : ids){
                        Query query = new Query();
                        query.setId(id);
                        Data data = dataDao.getData(query).get(0);
                        delete(data.getDataPath()+data.getDataName());
                    }
                    dataDao.deleteDataByBatch(ids);


                    break;
                case LOG:

                    logDao.deleteLogByBatch(ids);
                    break;
                case DEPARTMENT:
                    for (int id : ids ) {
                        fixedDao.deleteDepartment(id);
                    }
                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1894);
            map.put("msg","remove error");
        }
        map.put("code",0);
        map.put("msg","ok");
        return map;
    }
    @Override
    @Transactional
    public Map<String,Object> addBuildProjectByBatch(List<BuildProject> buildProjects){
        String owner = getTeacher(session).getJobNumber();
        String ownerName = getTeacher(session).getName();
        Map<String,Object> map = new HashMap<>();
//        List<BuildProject> buildProjects = (List<BuildProject>) object;
        List<Data> dataList = new ArrayList<>();
        try {
            if(buildProjects.get(0).getId()==null){
                for (BuildProject buildProject:buildProjects){
                    buildProjectDao.addBuildProject(buildProject);
                    for(Data data : buildProject.getListData()){
                        data.setDataId(BUILDPROJECT.getIndex()+""+"8081"+System.currentTimeMillis());
                        data.setDataType(BUILDPROJECT.getIndex()+"");
                        data.setOwner(owner);
                        data.setOwnerName(ownerName);
                        data.setRecordId(buildProject.getId());
                        data.setUploadDate(new Date());
                        dataList.add(data);
                    }
                    if (dataList.size()>0){
                        dataDao.addDataByBatch(dataList);
                    }
                    saveLog("添加建设课程",ownerName,owner);
                }
            }else{
                BuildProject buildProject = buildProjects.get(0);
                buildProject.setState("1");
                dataDao.deleteByRecord(buildProject.getId(),BUILDPROJECT.getIndex()+"");
                for (Data data: buildProject.getListData()) {
                    data.setDataId(BUILDPROJECT.getIndex()+""+"8081"+System.currentTimeMillis());
                    data.setDataType(BUILDPROJECT.getIndex()+"");
                    data.setOwner(owner);
                    data.setOwnerName(ownerName);
                    data.setRecordId(buildProject.getId());
                    data.setUploadDate(new Date());
                    dataList.add(data);
                }
//                buildProject.getListData().forEach(data->{
//                    data.setDataId(BUILDPROJECT.getIndex()+""+"8081"+System.currentTimeMillis());
//                    data.setDataType(BUILDPROJECT.getIndex()+"");
//                    data.setOwner(owner);
//                    data.setOwnerName(ownerName);
//                    data.setRecordId(buildProject.getId());
//                    data.setUpDate(new Date());
//                    dataList.add(data);
//                });
                if (dataList.size()>0){
                    dataDao.addDataByBatch(dataList);
                }
                buildProjectDao.updateBuildProject(buildProject);
                saveLog("修改建设课程",ownerName,owner);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1891);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }
    @Override
    public Map<String,Object> findInfo(Query query){
        Map<String,Object> map = new HashMap<>();
        if(query.getPageNum() == null || query.getPageNum() == 0){
            query.setPageNum(1);
        }
        if(query.getPageSize() == null ){
            query.setPageSize(10);
        }
        map.put("buildProject",buildProjectDao.getBuildProject(query));
        map.put("awardRecords",awardRecordsDao.getAwardRecords(query));
        map.put("guideRecord",guideRecordDao.getGuideRecord(query));
        map.put("projectAssess",projectAssessDao.getProjectAssess(query));
        map.put("teachingReform",teachingReformDao.getTeachingReform(query));
        map.put("textBook",textBookDao.getTextBook(query));

        return map;


    }

    @Override
    public Map<String, Object> findPermission() {
        Map<String , Object> map = new HashMap<>();
        try {
            map.put("list",mapper.seletctPermission());
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1893);
            map.put("msg","find error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    @Override
    public Map<String, Object> removeRole(int id) {
        Map<String , Object> map = new HashMap<>();
        try {
            mapper.deleteRole(id);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1894);
            map.put("msg","remove error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    @Override
    public Map<String, Object> removePermission(int id) {
        Map<String , Object> map = new HashMap<>();
        try {
            mapper.deletePermission(id);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1894);
            map.put("msg","remove error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    @Override
    public Map<String, Object> removeUserToRole(int id) {
        Map<String , Object> map = new HashMap<>();
        try {
            mapper.deleteUserToRole(id);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1894);
            map.put("msg","remove error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    public void saveLog(String operation,String operationName,String jobNumber){
        Log log = new Log();
        log.setOperationTime(new Date());
        log.setStep(operation);
        log.setOperator(jobNumber);
        log.setOperatorName(operationName);
        logDao.addLog(log);
    }

    private Teacher getTeacher(HttpSession session){
        return (Teacher) session.getAttribute("teacher");
    }

    @Override
    public Map<String, Object> updateAttach(Data data) {
        Map<String , Object> map = new HashMap<>();
        try {
           dataDao.addData(data);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",1895);
            map.put("msg","add error");
            return map;
        }
        map.put("code",0);
        map.put("msg","ok");

        return map;
    }

    private void delete(String fileName){
        new File(fileName).delete();
    }
    private void deleteAttach(List<Integer> ids,Query query){
        for (int id : ids){
            query.setRecordId(id);
            List<Data> dataList = dataDao.getData(query);
            dataList.forEach(data -> delete(data.getDataPath()+"/"+data.getDataName()));
        }
    }
}
