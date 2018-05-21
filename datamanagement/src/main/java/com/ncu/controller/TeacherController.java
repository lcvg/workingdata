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
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

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
    public Map<String,Object> findTeachera(TeacherQuery teacherQuery){
        return teacherService.getTeacher(teacherQuery);
    }






    @GetMapping("findInfo")
//    @RequiresRoles("admin")
    public Map<String,Object> findInfoa(Query query){

        return baseService.findInfo(query);
    }
    @PostMapping("removeTeacher")
    public Map<String,Object> removeTeachera(@RequestBody List<Integer> ids){
        return teacherService.removeTeacherByBatch(ids);
    }
    @PostMapping("addTeacher")
    public Map<String,Object> addTeachera(@RequestBody Teacher teacher){
        return teacherService.saveTeacher(teacher);
    }
    @PostMapping("addTeacherByBatch")
    public Map<String,Object> addTeacherByBatch(@RequestBody List<Teacher> teacher){
        return teacherService.saveTeacherByBatch(teacher);
    }


    @GetMapping("/export")
    public String export(Query queryParam,HttpServletResponse response) throws Exception {
        TeacherQuery teacherQuery = new TeacherQuery();
        queryParam.setPageSize(Integer.MAX_VALUE);
//        dep = AuthUtils.getDepartmentMap(dep);
        String[] title=new String[]{"工号","姓名","性别","职称","联系电话","职务","部门","建设课程","获奖记录","教改课题","出版教材"};
        List<TeacherVO> teacherVOList = teacherService.export(queryParam);
        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(TeacherVO a : teacherVOList){
            Object[] obj=new Object[11];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getSex();
            obj[3]=a.getProfessionalTitle();
            obj[4]=a.getPhoneNumber();
            obj[5]=a.getDuty();
            obj[6]=a.getDepartment();
            obj[7]=a.getBuildProject();
            obj[8]=a.getRecords();
            obj[9]=a.getTeacherReform();
            obj[10]=a.getTextBook();
            for(int j=0;j<10;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
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

    @GetMapping("statistic")
    public Map<String,Object> statistica(Query query){
        return baseService.getSize(query);
    }
    @GetMapping("/exportTeacher")
    public String exportTeacher(TeacherQuery queryParam,HttpServletResponse response) throws Exception {
//        TeacherQuery teacherQuery = new TeacherQuery();
        queryParam.setPageSize(Integer.MAX_VALUE);
//        dep = AuthUtils.getDepartmentMap(dep);
        String[] title=new String[]{"工号","姓名","性别","职称","联系电话","职务","部门"};
        List<TeacherVO> teacherVOList = (List<TeacherVO>) teacherService.getTeacher(queryParam).get("teacher");
        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(TeacherVO a : teacherVOList){
            Object[] obj=new Object[7];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getSex();
            obj[3]=a.getProfessionalTitle();
            obj[4]=a.getPhoneNumber();
            obj[5]=a.getDuty();
            obj[6]=a.getDepartment();
//            obj[7]=a.getBuildProject();
//            obj[8]=a.getRecords();
//            obj[9]=a.getTeacherReform();
//            obj[10]=a.getTextBook();
            for(int j=0;j<6;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
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
    public Map<String ,Object> login(String jobNumber, String password ,String validateCode, HttpSession session){

        Map<String ,Object> map = new HashMap<>();
        String validationCode = (String) session.getAttribute("validationCode");
        if(validationCode == null){
            map.put("msg","验证码错误");
            return map;
        }
        if(validateCode.toLowerCase().equals(validationCode.toLowerCase())){
        Subject s = SecurityUtils.getSubject();
        try {
            if(!s.isAuthenticated()){
                s.login(new UsernamePasswordToken(jobNumber, Encrypte.jdkSHA1(password)));
                TeacherQuery teacherQuery = new TeacherQuery();
                teacherQuery.setJobNumber(jobNumber);
                Teacher t = ((List<TeacherVO>)teacherService.getTeacher(teacherQuery).get("teacher")).get(0);
                if (s.hasRole("admin")){
                    t.setPermission("1");
                }else {
                    t.setPermission("0");
                }
                session.setAttribute("teacher",t);
                map.put("msg","success");
                map.put("teacher",t);
                baseService.saveLog("登录",t.getName(),t.getJobNumber());
                return map;
            }
            if(s.isAuthenticated()){
                map.put("msg","success");
                map.put("teacher",session.getAttribute("teacher"));
                return map;
            }
        } catch (AuthenticationException e) {
            e.printStackTrace();
            map.put("msg","error");
            return map;
        }
            return map;
        }else {
            map.put("msg","验证码错误");

            return map;
        }
    }

    @GetMapping("logout")
    public String logOut(HttpSession session){
        session.removeAttribute("teacher");
        Subject s = SecurityUtils.getSubject();
        s.logout();
        return "success";
    }

    @GetMapping("getImg")
    public void loginImg(HttpServletResponse response ,HttpSession session) throws IOException {
        // 获得验证码集合的长度
        String codeChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int charsLength = codeChars.length();
        // 下面3条记录是关闭客户端浏览器的缓冲区

        // 这3条语句都可以关闭浏览器的缓冲区，但是由于浏览器的版本不同，对这3条语句的支持也不同

        // 因此，为了保险起见，同时使用这3条语句来关闭浏览器的缓冲区
        response.setHeader("ragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        // 设置图形验证码的长和宽
        int width = 90, height = 30;
        BufferedImage image = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_RGB);
        Graphics g = image.getGraphics();
        Random random = new Random();
        g.setColor(getRandomColor(180, 250));

        g.fillRect(0, 0, width, height);

        g.setFont(new Font("Times New Roman", Font.ITALIC, height));

        g.setColor(getRandomColor(120, 180));
        // 用户保存最后随机生成的验证码
        StringBuffer validationCode = new StringBuffer();
        // 验证码的随机字体
        String[] fontNames = { "Times New Roman", "Book antiqua", "Arial" };

        // 随机生成4个验证码
        for (int i = 0; i < 4; i++) {
            // 随机设置当前验证码的字符的字体
            g.setFont(new Font(fontNames[random.nextInt(3)], Font.ITALIC,
                    height));
            // 随机获得当前验证码的字符
            char codeChar = codeChars.charAt(random.nextInt(charsLength));
            validationCode.append(codeChar);
            // 随机设置当前验证码字符的颜色
            g.setColor(getRandomColor(10, 100));
            // 在图形上输出验证码字符，x和y都是随机生成的
            g.drawString(String.valueOf(codeChar), 16 * i + random.nextInt(7),
                    height - random.nextInt(6));
        }

        // 获得HttpSession对象



        // 设置session对象5分钟失效

//        session.setMaxInactiveInterval(5 * 60);

        // 将验证码保存在session对象中,key为validation_code

        session.setAttribute("validationCode", validationCode.toString());
        //关闭Graphics对象

        g.dispose();

        OutputStream outS = response.getOutputStream();

        ImageIO.write(image, "JPEG", outS);
    }

    private Color getRandomColor(int minColor, int maxColor) {
        Random random = new Random();
        if(minColor > 255){
            minColor = 255;
        }
        if(maxColor > 255){
            maxColor = 255;
        }
        //获得r的随机颜色值
        int red = minColor+random.nextInt(maxColor-minColor);
        int green = minColor + random.nextInt(maxColor-minColor);
        int blue = minColor + random.nextInt(maxColor-minColor);
        return new Color(red,green,blue);
    }





}
