package com.ncu.model;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/24.
 * ClassName: Notice
 *
 * @Author:12909
 * @Description: 公告
 * @Date:Created in 11:02 2018/1/24
 * @Modified By:
 */
public class Notice extends Attachment implements  Serializable {
    private Integer id;
    private String title;
    private String content;
    private String department;
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date createDate;
    private String state;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
