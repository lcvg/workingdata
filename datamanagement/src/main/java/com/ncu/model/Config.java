package com.ncu.model;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/23.
 * ClassName: Config
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:04 2018/1/23
 * @Modified By:
 */
public class Config implements Serializable {
    private Integer id;
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date beginDate;
    @JSONField(format="yyyy-MM-dd HH:mm")
    private Date endDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}
