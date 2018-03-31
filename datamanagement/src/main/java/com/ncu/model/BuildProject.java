package com.ncu.model;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 建设课程
 * Created by 1290995884@qq.com on 2018/1/15.
 */
public class BuildProject extends Attachment implements Serializable{
    /**
     * 编号
     */
    private Integer id;
    /**
     * 课程编号
     */
    private String projectId;
    /**
     * 课程名称
     */
    private String projectName;
    /**
     * 建设时间
     */
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date buildDate;
    /**
     * 上课方式
     */
    private String teachingMethod;
    /**
     * 专业
     */
    private String major;
    /**
     * 审核状态
     */
    private String state;

    private String jobNumber;
    private String name;



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Date getBuildDate() {
        return buildDate;
    }

    public void setBuildDate(Date buildDate) {
        this.buildDate = buildDate;
    }

    public String getTeachingMethod() {
        return teachingMethod;
    }

    public void setTeachingMethod(String teachingMethod) {
        this.teachingMethod = teachingMethod;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",projectId" + projectId + ",projectName=" + projectName + ",buildDate=" + buildDate +
                ",teachingMethod" + teachingMethod + ",major=" + major + ",state=" + state;
    }
}
