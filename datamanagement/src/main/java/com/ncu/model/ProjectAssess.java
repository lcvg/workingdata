package com.ncu.model;

import javax.swing.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/15.
 * ClassName: ProjectAssess
 *
 * @Author:12909
 * @Description: 教改课题
 * @Date:Created in 14:28 2018/1/15
 * @Modified By:
 */
public class ProjectAssess implements Serializable {
    /**
     * 编号
     */
    private Integer id;
    /**
     * 课题名称
     */
    private String projectName;
    /**
     * 课题编号
     */
    private String projectId;
    /**
     * 课题类别
     */
    private String assessMode;
    /**
     * 申报时间
     */
    private Date assessDate;
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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getAssessMode() {
        return assessMode;
    }

    public void setAssessMode(String assessMode) {
        this.assessMode = assessMode;
    }

    public Date getAssessDate() {
        return assessDate;
    }

    public void setAssessDate(Date assessDate) {
        this.assessDate = assessDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",projectName" + projectName + ",projectId=" + projectId + ",assessMode=" + assessMode +
                ",assessDate=" + assessDate + ",assessDate=" + assessDate +
                ",state=" + state ;
    }
}
