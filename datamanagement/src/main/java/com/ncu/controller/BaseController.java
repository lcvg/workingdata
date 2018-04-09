package com.ncu.controller;

import com.ncu.aop.OpeartionName;
import com.ncu.model.*;
import com.ncu.service.BaseService;
import com.ncu.shiro.Role;
import com.ncu.shiro.RoleToPermission;
import com.ncu.shiro.UserToRole;
import com.ncu.websocket.WebSocketServer;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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
    public Map<String ,Object> findInfo(Query query){
        return baseService.find(query);

    }
    @PostMapping(value = "addBuildProject",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加建设课程")
    public Map<String ,Object> addBuildProject(@RequestBody List<BuildProject> json ){
        return baseService.addBuildProjectByBatch(json);
    }
    @PostMapping(value = "addAwardRecords",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加获奖记录")
    public Map<String ,Object> addAwardRecords(@RequestBody List<AwardRecords> json){
        return baseService.addAwardRecordsByBatch(json);
    }
    @PostMapping(value = "addGuideRecord",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加指导记录")
    public Map<String ,Object> addGuideRecord(@RequestBody List<GuideRecord> json){
        return baseService.addGuideRecordByBatch(json);
    }
    @PostMapping(value = "addProjectAssess",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加课程考核")
    public Map<String ,Object> addProjectAssess(@RequestBody List<ProjectAssess> json){
        return baseService.addProjectAssessByBatch(json);
    }
    @PostMapping(value = "addTeachingReform",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加教改课题")
    public Map<String ,Object> addTeachingReform(@RequestBody List<TeachingReform> json){
        return baseService.addTeachingReformByBatch(json);
    }
    @PostMapping(value = "addTextBook",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "添加出版教材")
    public Map<String ,Object> addTextBook(@RequestBody List<TextBook> json){
        return baseService.addTextBookByBatch(json);
    }
    @PostMapping(value = "addNotice",produces="application/json;charset=UTF-8")
    @OpeartionName(name = "发布公告")
    public Map<String ,Object> addNotice(@RequestBody Notice notice){
        return baseService.addNotice(notice);
    }

    @PostMapping(value = "addDepartment",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addDepartment(@RequestBody Department department){
        return baseService.addDepartment(department);
    }


    @PostMapping(value = "remove",produces="application/json;charset=UTF-8")
//    @OpeartionName(name = "remove")
//    @RequiresUser
    public Map<String ,Object> remove(@RequestBody List<Integer> ids, @RequestParam int type){
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "token,Access-Control-Allow-Origin,Access-Control-Allow-   Methods,Access-Control-Max-Age,authorization");
//        response.setHeader("(Content-Type","application/json; charset=utf-8");
        return baseService.remove(ids,type);
    }

    @PostMapping(value = "addConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> addConfig(@RequestBody Config config,@RequestParam int type){
        return  baseService.addConfig(config,type);
    }

    @PostMapping(value = "updateConfigByBatch",produces="application/json;charset=UTF-8")
    public Map<String ,Object> updateConfigByBatch(@RequestBody List<Config> config){
        return baseService.updateConfigByBatch(config);
    }
    @PostMapping(value = "removeConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> removeConfig(@RequestBody int id){
       return baseService.deleteConfig(id);
    }
    @GetMapping(value = "findConfig",produces="application/json;charset=UTF-8")
    public Map<String ,Object> findConfig(@RequestParam(defaultValue = "0") Integer id){
        return baseService.getConfig(id);
    }
    @PostMapping(value = "check/{state}",produces="application/json;charset=UTF-8")
    public Map<String ,Object> check(@RequestBody List<Integer> ids,@RequestParam int type,@PathVariable int state){
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
        data.setDataId("9"+System.currentTimeMillis()+"123");
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
    public Map<String ,Object> deleteAttachment(@RequestBody PathVO path) throws FileNotFoundException {
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
    public void download(@RequestParam int id, HttpServletResponse response){
        Query query = new Query();
        query.setId(id);
        query.setType(9);
//        Map data = baseService.find(query);
        Data data = ((List<Data>)baseService.find(query).get("list")).get(0);
        String path = data.getDataPath()+File.separator+data.getDataName();
//        String templateFile = "template.xls";
        File f = new File(path);
        try(InputStream in = new FileInputStream(f)) {
        response.setContentType("application/force-download");
//        response.setContentType("application/octet-stream");

        response.addHeader("Content-Disposition",
                "attachment;fileName=\"" +  new String(data.getDataName().substring(13).getBytes("gbk"),"iso-8859-1")  + "\"");

            IOUtils.copy(in,response.getOutputStream());
            response.flushBuffer();
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
    @GetMapping("downloadBybatch")
    public void downloadBybatch(@RequestParam List<Integer> ids, HttpServletResponse response) {
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
    public Map addRole(@RequestBody Role role){
        return baseService.addRole(role);
    }
    @GetMapping("finRole")
    public Map findRole(){
        return baseService.findRole();
    }

    @PostMapping("addPermission")
    public Map addPermission(@RequestBody RoleToPermission role){
        return baseService.addRoleToPermission(role);
    }

    @PostMapping("addUserToRole")
    public Map addUserToRole(@RequestBody UserToRole role){
        return baseService.addUserToRole(role);
    }






//    public static void main(String[] args) throws ParseException, UnknownHostException {
////        SimpleDateFormat slf = new SimpleDateFormat("yyyy-MM-dd hh:ss");
////        System.out.println(slf.parse("Sun Mar 04 2018 00:00:00 GMT+08:00"));
//        InetAddress address = InetAddress.getLocalHost();//获取的是本地的IP地址 //PC-20140317PXKX/192.168.0.121
//        String hostAddress = address.getHostAddress();//192.168.0.121
//        System.out.println(hostAddress);
//    }

}
