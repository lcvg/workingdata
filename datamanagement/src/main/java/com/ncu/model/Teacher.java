package com.ncu.model;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/1/12.
 * ClassName: TeacherDao
 *
 * @Author:12909
 * @Description: 教师实体类
 * @Date:Created in 14:38 2018/1/12
 */
public class Teacher implements Serializable{
    /**
     * 主键id
     */
    private Integer id;
    /**
     * 姓名
     */
    private String name;
    /**
     * 工号
     */
    private String jobNumber;
    /**
     * 性别
     */
    private String sex;
    /**
     *部门
     */
    private String department;
    /**
     * 职称
     */
    private String professionalTitle;
    /**
     * 职务
     */
    private String duty;
    /**
     * 联系电话
     */
    private String phoneNumber;
    /**
     * 权限
     */
    private String permission;

    private String password;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProfessionalTitle() {
        return professionalTitle;
    }

    public void setProfessionalTitle(String professionalTitle) {
        this.professionalTitle = professionalTitle;
    }

    public String getDuty() {
        return duty;
    }

    public void setDuty(String duty) {
        this.duty = duty;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",name" + name + ",jobNumber=" + jobNumber + ",sex=" + sex +
                ",department" + department + ",professionalTitle=" + professionalTitle +
                ",duty=" + duty + ",phoneNumber" + phoneNumber + ",permission=" + permission;
    }
}
