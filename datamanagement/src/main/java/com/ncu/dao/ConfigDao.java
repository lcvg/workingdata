package com.ncu.dao;

import com.ncu.model.Config;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/23.
 * ClassName: ConfigDao
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:07 2018/1/23
 * @Modified By:
 */
@Repository
public interface ConfigDao {
    int addConfig(Config config);
    int updateConfig(Config config);
    void updateConfigByBatch(List<Config> configList);
    List<Config> getConfig(@Param("id") Integer id);
    int deleteConfig(@Param("id") Integer id);
}
