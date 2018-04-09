package com.ncu.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/26.
 * ClassName: Query
 *
 * @Author:12909
 * @Description: 查询参数
 * @Date:Created in 14:04 2018/1/26
 * @Modified By:
 */
public class Query {
    /**
     * 是否查询时间段
     */
    private Integer timeQuantum;

    private String condition;
    private String nameCondition;
    private String idCondition;
    private String majorCondition;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date beginDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date endDate;
    private Integer id;
    private String jobNumber;
    private String projectId;
    private Integer pageSize;
    private Integer pageNum;
    private String department;

    private String step;
    private Integer type;
    private String name;

    private String state;
    private String assessMode;
    private String sortType;
    private String dataType;
    private Integer recordId;

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public String getAssessMode() {
        return assessMode;
    }

    public void setAssessMode(String assessMode) {
        this.assessMode = assessMode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
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

    public Integer getTimeQuantum() {
        return timeQuantum;
    }

    public void setTimeQuantum(Integer timeQuantum) {
        this.timeQuantum = timeQuantum;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getNameCondition() {
        return nameCondition;
    }

    public void setNameCondition(String nameCondition) {
        this.nameCondition = nameCondition;
    }

    public String getIdCondition() {
        return idCondition;
    }

    public void setIdCondition(String idCondition) {
        this.idCondition = idCondition;
    }

    public String getMajorCondition() {
        return majorCondition;
    }

    public void setMajorCondition(String majorCondition) {
        this.majorCondition = majorCondition;
    }
}
