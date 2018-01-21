package com.ncu.dao;

import com.ncu.model.AwardRecords;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/16.
 */
@Repository
public interface AwardRecordsDao {
    Integer addAwardRecords(AwardRecords buildProject) ;
    Integer addAwardRecordsByBatch(List<AwardRecords> buildProjects) ;
    Integer updateAwardRecords(AwardRecords guideRecord);
    List<AwardRecords> getAwardRecords(@Param("id") Integer id);
    void deleteAwardRecordsByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
