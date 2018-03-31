package com.ncu.model;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 1290995884@qq.com on 2018/1/16.
 */
public class AwardRecords extends Attachment implements Serializable {
    /**
     * 编号
     */
    private Integer id;
    /**
     * 获奖内容
     */
    private String awardContent;
    /**
     * 获奖级别
     */
    private String awardLevel;
    /**
     * 获奖时间
     */
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date awardDate;
    /**
     * 审核状态
     */
    private String state;
    /**
     * 获奖教师工号
     */
    private String jobNumber;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;


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

    public String getAwardContent() {
        return awardContent;
    }

    public void setAwardContent(String awardContent) {
        this.awardContent = awardContent;
    }

    public String getAwardLevel() {
        return awardLevel;
    }

    public void setAwardLevel(String awardLevel) {
        this.awardLevel = awardLevel;
    }

    public Date getAwardDate() {
        return awardDate;
    }

    public void setAwardDate(Date awardDate) {
        this.awardDate = awardDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",awardContent" + awardContent + ",awardLevel=" + awardLevel + ",awardDate=" + awardDate +
                ",state=" + state +",name=" + name +"]";
    }
}
