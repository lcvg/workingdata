package com.ncu.dao;

import com.ncu.model.Log;
import com.ncu.model.Query;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
@Repository
public interface LogDao {
    Integer addLog(Log log) ;
    Integer updateLog(Log guideRecord);
    List<Log> getLog(Query query);
    void deleteLogByBatch(List<Integer> ids);
    int getSize(Query query);

}
