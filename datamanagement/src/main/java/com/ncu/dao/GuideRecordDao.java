package com.ncu.dao;

import com.ncu.model.GuideRecord;
import com.ncu.model.Query;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GuideRecordDao {
    Integer addGuideRecord(GuideRecord guideRecord) ;
    Integer addGuideRecordByBatch(List<GuideRecord> guideRecords) ;
    Integer updateGuideRecord(GuideRecord guideRecord);
    List<GuideRecord> getGuideRecord(Query query);
    int getSize(Query query);
    void deleteGuideRecordByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
