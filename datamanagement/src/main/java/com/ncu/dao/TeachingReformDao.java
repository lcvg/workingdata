package com.ncu.dao;

import com.ncu.model.Query;
import com.ncu.model.TeachingReform;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/16.
 */
@Repository
public interface TeachingReformDao {
    Integer addTeachingReform(TeachingReform buildProject) ;
    Integer addTeachingReformByBatch(List<TeachingReform> buildProjects) ;
    Integer updateTeachingReform(TeachingReform guideRecord);
    List<TeachingReform> getTeachingReform(Query query);
    int getSize(Query query);
    void deleteTeachingReformByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
