package com.ncu.dao;

import com.ncu.model.BuildProject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/15.
 */
@Repository
public interface BuildProjectDao {
    Integer addBuildProject(BuildProject buildProject) ;
    Integer addBuildProjectByBatch(List<BuildProject> buildProjects) ;
    Integer updateBuildProject(BuildProject guideRecord);
    List<BuildProject> getBuildProject(@Param("id") Integer id);
    void deleteBuildProjectByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
}
