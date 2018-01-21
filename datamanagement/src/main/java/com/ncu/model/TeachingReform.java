package com.ncu.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 1290995884@qq.com on 2018/1/16.
 */
public class TeachingReform implements Serializable {
    /**
     * 编号
     */
    private Integer id;
    /**
     * 课题编号
     */
    private String projectId;
    /**
     * 课题名称
     */
    private String projectName;
    /**
     * 课题类型
     */
    private String projectType;
    /**
     * 申报时间
     */
    private Date reportTime;
    /**
     * 主持人
     */
    private String compere;
    /**
     * 课题简介
     */
    private String projectIntroduce;
    /**
     * 审核状态
     */
    private String state;

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

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public Date getReportTime() {
        return reportTime;
    }

    public void setReportTime(Date reportTime) {
        this.reportTime = reportTime;
    }

    public String getCompere() {
        return compere;
    }

    public void setCompere(String compere) {
        this.compere = compere;
    }

    public String getProjectIntroduce() {
        return projectIntroduce;
    }

    public void setProjectIntroduce(String projectIntroduce) {
        this.projectIntroduce = projectIntroduce;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",projectId" + projectId + ",projectName=" + projectName + ",projectType=" + projectType +
                ",reportTime" + reportTime + ",compere=" + compere +
                ",projectIntroduce=" + projectIntroduce + ",state" + state ;
    }
}
