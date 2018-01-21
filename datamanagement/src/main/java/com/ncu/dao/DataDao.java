package com.ncu.dao;

import com.ncu.model.Data;
import com.ncu.model.Log;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
@Repository
public interface DataDao {
    Integer addData(Data data) ;
    Integer addDataByBatch(List<Data> datas) ;
    List<Data> getData(@Param("id") Integer id);
    void deleteDataByBatch(List<Integer> ids);

}
