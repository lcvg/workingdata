package com.ncu.model;

import java.io.Serializable;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
public class Authority implements Serializable {
    private Integer id;
    private String name ;
    private String authorityCode;

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

    public String getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(String authorityCode) {
        this.authorityCode = authorityCode;
    }
}
