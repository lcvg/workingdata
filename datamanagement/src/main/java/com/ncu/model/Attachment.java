package com.ncu.model;

import java.io.Serializable;
import java.util.List;

/**
 * Created by 黄重杨 on 2018/3/7.
 * ClassName: Attachment
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 10:42 2018/3/7
 * @Modified By:
 */
public class Attachment implements Serializable {
    private List<Data> listData;

    public List<Data> getListData() {
        return listData;
    }

    public void setListData(List<Data> listData) {
        this.listData = listData;
    }
}
