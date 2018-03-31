package com.ncu.model;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/15.
 * ClassName: GuideRecord
 *
 * @Author:12909
 * @Description: 指导记录
 * @Date:Created in 9:16 2018/1/15
 * @Modified By:
 */
public class GuideRecord extends Attachment implements Serializable {
    /**
     * 编号
     */
    private Integer id ;
    /**
     * 获奖名称
     */
    private String competitionName;
    /**
     * 获奖类型
     */
    private String competitionType;
    /**
     * 指导学生姓名
     */
    private String studentName;
    /**
     * 指导学生学号
     */
    private String studentNumber;
    /**
     * 指导学生类型
     */
    private String studentType;
    /**
     * 指导学生班级
     */
    private String studentClass;
    /**
     * 指导时间
     */
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date guideDate;
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

    public String getCompetitionName() {
        return competitionName;
    }

    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    public String getCompetitionType() {
        return competitionType;
    }

    public void setCompetitionType(String competitionType) {
        this.competitionType = competitionType;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentType() {
        return studentType;
    }

    public void setStudentType(String studentType) {
        this.studentType = studentType;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public Date getGuideDate() {
        return guideDate;
    }

    public void setGuideDate(Date guideDate) {
        this.guideDate = guideDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",competitionName" + competitionName + ",competitionType=" + competitionType + ",studentName=" + studentName +
                ",studentNumber" + studentNumber + ",studentType=" + studentType +
                ",studentClass=" + studentClass + ",guideDate" + guideDate + ",state=" + state;
    }
}
