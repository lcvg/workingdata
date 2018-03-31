package com.ncu.dao;

import com.ncu.model.AwardRecords;
import com.ncu.model.Query;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/16.
 */
@Repository
public interface AwardRecordsDao {
    Integer addAwardRecords(AwardRecords awardRecords) ;
    Integer addAwardRecordsByBatch(List<AwardRecords> awardRecordses) ;
    Integer updateAwardRecords(AwardRecords awardRecords);
    List<AwardRecords> getAwardRecords(Query query);
    int getSize(Query query);
    void deleteAwardRecordsByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
