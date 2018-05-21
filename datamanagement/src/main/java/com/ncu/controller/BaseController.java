package com.ncu.controller;

import com.ncu.aop.OpeartionName;
import com.ncu.env.TypeEnum;
import com.ncu.model.*;
import com.ncu.service.BaseService;
import com.ncu.shiro.Role;
import com.ncu.shiro.RoleToPermission;
import com.ncu.shiro.UserToRole;
import com.ncu.utils.WriteExcel;
import com.ncu.websocket.WebSocketServer;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import static com.ncu.env.TypeEnum.BUILDPROJECT;

//import org.apache.shiro.authz.annotation.RequiresGuest;
//import org.apache.shiro.authz.annotation.RequiresRoles;
//import org.apache.shiro.authz.annotation.RequiresUser;

/**
 * Created by 黄重杨 on 2018/2/5.
 * ClassName: BaseController
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 10:24 2018/2/5
 * @Modified By:
 */
@RestController
@CrossOrigin
public class BaseController {
    @Autowired
    BaseService baseService ;
    @Autowired
    HttpSession session;

//    @Autowired
//    HttpServletResponse response;
    @Value("${attachmentUrl}")
    String basePath;



    @GetMapping(value = "find",produces="application/json;charset=UTF-8")
    public Map<String ,Object> findInfoa(Query query){
        return baseService.find(query);

    }
    @PostMapping(value = "addBuildProject",produces="application/json;charset=UTF-8")

    public Map<String ,Object> addBuildProjecta(@RequestBody List<BuildProject> json ){
        return baseService.addBuildProjectByBatch(json);
    }
    @PostMapping(value = "addAwardRecords",produces="application/json;charset=UTF-8")

    public Map<String ,Object> addAwardRecordsa(@RequestBody List<AwardRecords> json){
        return baseService.addAwardRecordsByBatch(json);
    }
    @PostMapping(value = "addGuideRecord",produces="application/json;charset=UTF-8")

    public Map<String ,Object> addGuideRecorda(@RequestBody List<GuideRecord> json){
        return baseService.addGuideRecordByBatch(json);
    }
    @PostMapping(value = "addProjectAssess",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addProjectAssessa(@RequestBody List<ProjectAssess> json){
        return baseService.addProjectAssessByBatch(json);
    }
    @PostMapping(value = "addTeachingReform",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addTeachingReforma(@RequestBody List<TeachingReform> json){
        return baseService.addTeachingReformByBatch(json);
    }
    @PostMapping(value = "addTextBook",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addTextBooka(@RequestBody List<TextBook> json){
        return baseService.addTextBookByBatch(json);
    }
    @PostMapping(value = "addNotice",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addNoticea(@RequestBody Notice notice){
        return baseService.addNotice(notice);
    }

    @PostMapping(value = "addDepartment",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addDepartmenta(@RequestBody Department department){
        return baseService.addDepartment(department);
    }


    @PostMapping(value = "remove",produces="application/json;charset=UTF-8")
//    @OpeartionName(name = "remove")
//    @RequiresUser
    public Map<String ,Object> removea(@RequestBody List<Integer> ids, @RequestParam int type){
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "token,Access-Control-Allow-Origin,Access-Control-Allow-   Methods,Access-Control-Max-Age,authorization");
//        response.setHeader("(Content-Type","application/json; charset=utf-8");
        return baseService.remove(ids,type);
    }

    @PostMapping(value = "addConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addConfiga(@RequestBody Config config,@RequestParam int type){
        return  baseService.addConfig(config,type);
    }

    @PostMapping(value = "updateConfigByBatch",produces="application/json;charset=UTF-8")
    public Map<String ,Object> updateConfigByBatcha(@RequestBody List<Config> config){
        return baseService.updateConfigByBatch(config);
    }
    @PostMapping(value = "removeConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> removeConfiga(@RequestBody int id){
       return baseService.deleteConfig(id);
    }
    @GetMapping(value = "findConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> findConfiga(@RequestParam(defaultValue = "0") Integer id){
        return baseService.getConfig(id);
    }
    @PostMapping(value = "check/{state}",produces="application/json;charset=UTF-8")
    public Map<String ,Object> checka(@RequestBody List<Integer> ids,@RequestParam int type,@PathVariable int state){
        if (state == 0){
            return baseService.checkByBatch(ids,type);
        }
        return baseService.checkNoByBatch(ids,type);

    }


    @PostMapping("uploadCover")
    public Map<String ,Object> uploadCoverToLocal(MultipartFile[]file) throws FileNotFoundException {
        Map<String ,Object> map = new HashMap<>();
//        String basePath = ResourceUtils.getURL("classpath:").getPath()+"static";
//        String basePath = "C:\\project\\dingding\\工作资料管理\\workingdata-master\\datamanagement\\target\\classes\\static\\attachment\\";
//        System.out.println(basePath.substring(1,basePath.length()));
        String pathName = "";
        List<String> paths = new ArrayList<>();
        for (MultipartFile f: file) {

            pathName = System.currentTimeMillis()+f.getOriginalFilename();
            System.out.println(basePath+pathName);
            try {
                f.transferTo(new File(basePath+pathName));
                paths.add(basePath+pathName);

            } catch (IOException e) {
                e.printStackTrace();
                map.put("errmsg","upload error");
                map.put("errcode","9909");
                return map;
            }
        }
        map.put("paths",paths);
        map.put("errmsg","success");
        map.put("errcode","ok");
        return map;
    }
    @PostMapping("uploadPlan")
    public Map<String ,Object> uploadPlan(MultipartFile[]file,String jobNumber,String name) throws FileNotFoundException {
        System.out.println(jobNumber+name);
        Map<String ,Object> map = new HashMap<>();
//        String basePath = ResourceUtils.getURL("classpath:").getPath()+"static";
//        String basePath = "C:\\project\\dingding\\工作资料管理\\workingdata-master\\datamanagement\\target\\classes\\static\\attachment\\";
//        System.out.println(basePath.substring(1,basePath.length()));
        Data data = new Data();
        data.setDataId("9"+"8081"+System.currentTimeMillis());
        data.setDataType("9");
        data.setOwner(jobNumber);
        data.setOwnerName(name);
        data.setRecordId(0);
        data.setUploadDate(new Date());
        data.setDataPath(basePath);

        String pathName = "";
        for (MultipartFile f: file) {

            pathName = System.currentTimeMillis()+f.getOriginalFilename();
            System.out.println(basePath+pathName);
            data.setDataName(pathName);
            try {
                f.transferTo(new File(basePath+pathName));

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return  baseService.updateAttach(data);
    }



    @PostMapping("deleteAttachment")
    public Map<String ,Object> deleteAttachmenta(@RequestBody PathVO path) throws FileNotFoundException {
        Map<String ,Object> map = new HashMap<>();
            try {
                System.out.println(path.getDataPath()+"/"+path.getDataName());
//                String basePath = "C:\\project\\dingding\\工作资料管理\\workingdata-master\\datamanagement\\target\\classes\\static\\attachment\\";
                new File(path.getDataPath()+"/"+path.getDataName()).delete();
            } catch (Exception e) {
                e.printStackTrace();
                map.put("errmsg", "upload error");
                map.put("errcode", "9909");
                return map;
            }
        map.put("errmsg", "success");
        map.put("errcode", "ok");
        return map;
    }
//    @PostMapping("test")
//    public String test(@RequestBody Map<String ,Object> map){
//        System.out.println(map.get("id"));
//        return "ok";
//    }
    @GetMapping("download")
    public void downloada(@RequestParam int id, HttpServletResponse response) {
        Query query = new Query();
        query.setId(id);
        query.setType(9);
        Data data = ((List<Data>) baseService.find(query).get("list")).get(0);
        String path = data.getDataPath() + File.separator + data.getDataName();
        File f = new File(path);
        try (InputStream in = new FileInputStream(f)) {
            response.setContentType("application/force-download");
//        response.setContentType("application/octet-stream");
            response.addHeader("Content-Disposition",
                    "attachment;fileName=\"" + new String(data.getDataName().substring(13).getBytes("gbk"), "iso-8859-1") + "\"");

            IOUtils.copy(in, response.getOutputStream());
            response.flushBuffer();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

        @GetMapping("infoDownload")
        public void infoDownloada( HttpServletResponse response){

            File f = new File(basePath+"教师信息.xls");
            System.out.println(basePath+"教师信息.xls");
            try(InputStream in = new FileInputStream(f)) {
                response.setContentType("application/force-download");

                response.addHeader("Content-Disposition",
                        "attachment;fileName=\"" + new String("教师信息表.xls".getBytes("gbk"), "iso-8859-1")  + "\"");

                IOUtils.copy(in,response.getOutputStream());
                response.flushBuffer();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }


    }
    @GetMapping("downloadBybatch")
    public void downloadBybatcha(@RequestParam List<Integer> ids, HttpServletResponse response) {
        List<String> path=new ArrayList<>();
        Query query = new Query();
        Data data;
        query.setType(9);
        for (Integer id : ids) {
            query.setId(id);
            data = ((List<Data>)baseService.find(query).get("list")).get(0);
            path.add(data.getDataPath()+File.separator+data.getDataName());
        }
        //需要压缩的文件--包括文件地址和文件名
//        String []path ={"C:\\Users\\12909\\Desktop\\index.js",
//                "C:\\Users\\12909\\Desktop\\公告和企业诉求.docx"};
        // 要生成的压缩文件地址和文件名称

        response.setContentType("application/force-download");
        response.addHeader("Content-Disposition",
                "attachment;fileName=" + "DownLoad.zip");
        ZipOutputStream zipStream = null;
        FileInputStream zipSource = null;
        BufferedInputStream bufferStream = null;
        try {
            //构造最终压缩包的输出流
            zipStream = new ZipOutputStream(response.getOutputStream());
            for(int i =0;i<path.size();i++){
                File file = new File(path.get(i));
                //将需要压缩的文件格式化为输入流
                zipSource = new FileInputStream(file);
                //压缩条目不是具体独立的文件，而是压缩包文件列表中的列表项，称为条目，就像索引一样

                ZipEntry zipEntry = new ZipEntry(file.getName().substring(13));
                //定位该压缩条目位置，开始写入文件到压缩包中

                zipStream.putNextEntry(zipEntry);

                //输入缓冲流
                bufferStream = new BufferedInputStream(zipSource, 1024 * 10);
                int read = 0;
                //创建读写缓冲区
                byte[] buf = new byte[1024 * 10];
                while((read = bufferStream.read(buf, 0, 1024 * 10)) != -1)
                {
                    zipStream.write(buf, 0, read);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //关闭流
            try {
                if(null != bufferStream) bufferStream.close();
                if(null != zipStream) zipStream.close();
                if(null != zipSource) zipSource.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    @PostMapping("addRole")
    public Map addRolea(@RequestBody Role role){
        return baseService.addRole(role);
    }
    @GetMapping("finRole")
    public Map findRolea(){
        return baseService.findRole();
    }

    @GetMapping("isLive")
    public String isLivea(){
        return"ok";
    }
    @PostMapping("addPermission")
    public Map addPermissiona(@RequestBody RoleToPermission role){
        return baseService.addRoleToPermission(role);
    }

    @PostMapping("addUserToRole")
    public Map addUserToRolea(@RequestBody UserToRole role){
        return baseService.addUserToRole(role);
    }

    @GetMapping("/exportBuildProject")
    public String exportBuildProject(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<BuildProject> list = (List<BuildProject>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","课程编号","课程名称","建设时间","所属专业","授课方式"};

        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(BuildProject a : list){
            Object[] obj=new Object[7];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getProjectId();
            obj[3]=a.getProjectName();
            obj[4]=slf.format(a.getBuildDate());
            obj[5]=a.getMajor();
            obj[6]=a.getTeachingMethod();
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
        String fileName ="建设课程"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    @GetMapping("/exportAwardRecord")
    public String exportAwardRecord(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<AwardRecords> list = (List<AwardRecords>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","获奖内容","获奖级别","获奖时间"};

        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(AwardRecords a : list){
            Object[] obj=new Object[5];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getAwardContent();
            obj[3]=a.getAwardLevel();
            obj[4]=slf.format(a.getAwardDate());
            for(int j=0;j<4;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();
        String fileName ="获奖记录"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/exportGuideRecord")
    public String exportGuideRecord(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<GuideRecord> list = (List<GuideRecord>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","竞赛内容","竞赛类型","指导时间","学生姓名","学生学号","学生班级","学生类型"};

        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(GuideRecord a : list){
            Object[] obj=new Object[9];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getCompetitionName();
            obj[3]=a.getCompetitionType();
            obj[4]=slf.format(a.getGuideDate());
            obj[5]=a.getStudentName();
            obj[6]=a.getStudentNumber();
            obj[7]=a.getStudentClass();
            obj[8]=a.getStudentType().equals("1")?"本科":"研究生";
//            obj[9]=a.getTeacherReform();
//            obj[10]=a.getTextBook();
            for(int j=0;j<8;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();
        String fileName ="指导记录"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/exportProjectAssess")
    public String exportProjectAssess(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<ProjectAssess> list = (List<ProjectAssess>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","课程编号","课程名称","考核时间","考核方式"};

        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(ProjectAssess a : list){
            Object[] obj=new Object[6];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getProjectId();
            obj[3]=a.getProjectName();
            obj[4]=slf.format(a.getAssessDate());
            if("1".equals(a.getAssessMode())){
                obj[5]="试卷";
            }else if("2".equals(a.getAssessMode())){
                obj[5]="大作业";
            }else obj[5]="其他";

            for(int j=0;j<5;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();
        String fileName ="考核方式"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/exportTextBook")
    public String exportTextBook(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<TextBook> list = (List<TextBook>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","教材名称","教材类型","出版时间","撰写内容","教材简介","isbn","出版社"};

        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(TextBook a : list){
            Object[] obj=new Object[9];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getTextbook();
            obj[3]=a.getType();
            obj[4]=slf.format(a.getPublishDate());
            obj[5]=a.getCompose();
            obj[6]=a.getIntroduce();
            obj[7]=a.getIsbn();
            obj[8]=a.getPress();
            for(int j=0;j<8;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();
        String fileName ="出版教材"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/exportTeacherReform")
    public String exportTeacherReform(Query query,HttpServletResponse response) throws Exception {
        query.setPageSize(Integer.MAX_VALUE);
        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd");
        List<TeachingReform> list = (List<TeachingReform>) baseService.find(query).get("list");
        String[] title=new String[]{"工号","姓名","课题编号","课题名称","申报时间","课题类型","主持人","课题简介"};
        List<Object[]>  dataList = new ArrayList<Object[]>();
        for(TeachingReform a : list){
            Object[] obj=new Object[8];
            obj[0]=a.getJobNumber();
            obj[1]=a.getName();
            obj[2]=a.getProjectId();
            obj[3]=a.getProjectName();
            obj[4]=slf.format(a.getReportTime());
            obj[5]=a.getProjectType();
            obj[6]=a.getCompere();
            obj[7]=a.getProjectIntroduce();
            for(int j=0;j<7;j++){if(obj[j]==null||obj[j].equals("")){obj[j]=" ";}}
            dataList.add(obj);
        }
        WriteExcel ex = new WriteExcel(title, dataList);
        InputStream in;
        in = ex.export();
        String fileName ="教改课题"+".xls";
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"),"iso-8859-1"));
        try (OutputStream outputStream = response.getOutputStream()){
            org.apache.commons.io.IOUtils.copy(in,outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }




//    public static void main(String[] args) throws ParseException, UnknownHostException {
////        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd hh:ss");
////        System.out.println(slf.parse("Sun Mar 04 2018 00:00:00 GMT+08:00"));
//        InetAddress address = InetAddress.getLocalHost();//获取的是本地的IP地址 //PC-20140317PXKX/192.168.0.121
//        String hostAddress = address.getHostAddress();//192.168.0.121
//        System.out.println(hostAddress);
//    }

}
