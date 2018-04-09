package com.ncu.model;

import java.io.Serializable;

/**
 * Created by 黄重杨 on 2018/4/8.
 * ClassName: PathVO
 *
 * @Author:12909
 * @Description: deleteAttachment 入参类
 * @Date:Created in 20:53 2018/4/8
 * @Modified By:
 */
public class PathVO implements Serializable {
    String dataPath;
    String dataName;

    public String getDataPath() {
        return dataPath;
    }

    public void setDataPath(String dataPath) {
        this.dataPath = dataPath;
    }

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName;
    }
}
