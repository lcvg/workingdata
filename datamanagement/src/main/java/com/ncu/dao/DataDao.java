package com.ncu.dao;

import com.ncu.model.Data;
import com.ncu.model.Log;
import com.ncu.model.Query;
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
    List<Data> getData(Query query);
    void deleteDataByBatch(List<Integer> ids);
    void deleteByRecord(@Param("recordId") Integer recordId,@Param("dataType") String dataType);
}
