package com.ncu.model;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/1/25.
 * ClassName: TeacherQuery
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 15:30 2018/1/25
 * @Modified By:
 */
public class TeacherQuery implements Serializable {
    /**
     * 查询id
     */
    private Integer id;
    /**
     * 按名字查询
     */
    private String teacherName;
    /**
     * 按部门查询
     */
    private String department;
    /**
     * 按工号查询
     */
    private String jobNumber;
    /**
     * 按权限查询
     */
    private Integer pageSize;
    private Integer pageNum;
    private String permission;

    private String buildProjectSort;
    private String awardRecordSort;
    private String teacherRefromSort;
    private String textBookSort;

    private String sortType;

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public String getBuildProjectSort() {
        return buildProjectSort;
    }

    public void setBuildProjectSort(String buildProjectSort) {
        this.buildProjectSort = buildProjectSort;
    }

    public String getAwardRecordSort() {
        return awardRecordSort;
    }

    public void setAwardRecordSort(String awardRecordSort) {
        this.awardRecordSort = awardRecordSort;
    }

    public String getTeacherRefromSort() {
        return teacherRefromSort;
    }

    public void setTeacherRefromSort(String teacherRefromSort) {
        this.teacherRefromSort = teacherRefromSort;
    }

    public String getTextBookSort() {
        return textBookSort;
    }

    public void setTextBookSort(String textBookSort) {
        this.textBookSort = textBookSort;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }
}
