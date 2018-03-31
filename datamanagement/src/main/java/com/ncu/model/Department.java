package com.ncu.model;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/1/25.
 * ClassName: Department
 *
 * @Author:12909
 * @Description: 部门
 * @Date:Created in 14:48 2018/1/25
 * @Modified By:
 */
public class Department implements Serializable {
    private Integer id;
    private String depId;
    private String depName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDepId() {
        return depId;
    }

    public void setDepId(String depId) {
        this.depId = depId;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }
}
