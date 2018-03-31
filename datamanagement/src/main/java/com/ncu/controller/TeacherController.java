package com.ncu.controller;

import com.ncu.aop.OpeartionName;
import com.ncu.dao.Mapper;
import com.ncu.model.Query;
import com.ncu.model.Teacher;
import com.ncu.model.TeacherQuery;
import com.ncu.model.TeacherVO;
import com.ncu.service.BaseService;
import com.ncu.service.TeacherService;
import com.ncu.utils.Encrypte;
import com.ncu.utils.WriteExcel;
import org.apache.commons.io.IOUtils;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.UsernamePasswordToken;
//import org.apache.shiro.authz.annotation.RequiresRoles;
//import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by 黄重杨 on 2018/3/11.
 * ClassName: TeacherController
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 18:15 2018/3/11
 * @Modified By:
 */
@RestController
@CrossOrigin
public class TeacherController {
    @Autowired
    TeacherService teacherService;
    @Autowired
    BaseService baseService;
    @GetMapping("findTeacher")
    public Map<String,Object> findTeacher(TeacherQuery teacherQuery){
//        if (teacherQuery.getSortType()!= null){
//            return teacherService.getTeacherByAward(teacherQuery);
//        }




        return teacherService.getTeacher(teacherQuery);
    }






    @GetMapping("findInfo")
//    @RequiresRoles("admin")
    public Map<String,Object> findInfo(Query query){

        return baseService.findInfo(query);
    }
    @PostMapping("removeTeacher")
    @OpeartionName(name = "删除教师")
    public Map<String,Object> removeTeacher(@RequestBody List<Integer> ids){
        return teacherService.removeTeacherByBatch(ids);
    }
    @PostMapping("addTeacher")
    @OpeartionName(name = "添加教师")
    public Map<String,Object> addTeacher(@RequestBody Teacher teacher){

        return teacherService.saveTeacher(teacher);
    }

    @GetMapping("statistic")
    public Map<String,Object> statistic(Query query){
        return baseService.getSize(query);
    }
    @GetMapping("/export")
    @OpeartionName(name = "导出统计表格")
    public String export(Query queryParam,HttpServletResponse response) throws Exception {
        TeacherQuery teacherQuery = new TeacherQuery();
        queryParam.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
//        dep = AuthUtils.getDepartmentMap(dep);
        String[] title=new String[]{"工号"," 姓名 ","性别","职称","联系人电话","职务","部门","建设课程","获奖记录","教改课题","出版教材"};
        List<TeacherVO> teacherVOList = teacherService.export(queryParam);
        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(TeacherVO a : teacherVOList){
            Object[] obj=new Object[10];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getSex();
            obj[3]=a.getProfessionalTitle();
            obj[4]=a.getPhoneNumber();
            obj[5]=a.getDuty();
            obj[6]=a.getBuildProject();
            obj[7]=a.getRecords();
            obj[8]=a.getTeacherReform();
            obj[9]=a.getTextBook();
            for(int j=0;j<9;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();

        String fileName ="教师信息"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    @PostMapping("login")
    public Map<String ,Object> login(String jobNumber, String password, HttpSession session){

        Map<String ,Object> map = new HashMap<>();
        TeacherQuery teacherQuery = new TeacherQuery();
        teacherQuery.setJobNumber(jobNumber);
        Teacher t = ((List<TeacherVO>)teacherService.getTeacher(teacherQuery).get("teacher")).get(0);
        t.setPermission("1");
//        Subject s = SecurityUtils.getSubject();
////        s.getSession().setTimeout(180000);
//        try {
//            if(!s.isAuthenticated()){
//                s.login(new UsernamePasswordToken(jobNumber, Encrypte.jdkSHA1(password)));
//                TeacherQuery teacherQuery = new TeacherQuery();
//                teacherQuery.setJobNumber(jobNumber);
//                Teacher t = ((List<TeacherVO>)teacherService.getTeacher(teacherQuery).get("teacher")).get(0);
//                if (s.hasRole("admin")){
//                    t.setPermission("1");
//                }
//                session.setAttribute("teacher",t);
//                map.put("msg","success");
//                map.put("teacher",t);
//                return map;
//            }
//            if(s.isAuthenticated()){
//                map.put("msg","success");
//                map.put("teacher",session.getAttribute("teacher"));
//                return map;
//            }
//        } catch (AuthenticationException e) {
//            e.printStackTrace();
//            map.put("msg","error");
//            return map;
//        }

//        return null;
        session.setAttribute("teacher",t);
        map.put("msg","success");
        map.put("teacher",t);
        return map;



    }

    @GetMapping("logout")
    public String logOut(HttpSession session){
//        session.removeAttribute("teacher");
//        Subject s = SecurityUtils.getSubject();
//        s.logout();
        return "success";
    }




}
