package com.ncu.dao;

import com.ncu.model.ProjectAssess;
import com.ncu.model.Query;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/15.
 * ClassName: ProjectAssessDao
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 14:40 2018/1/15
 * @Modified By:
 */
@Repository
public interface ProjectAssessDao {
    Integer addProjectAssessByBatch(List<ProjectAssess> projectAssesses);
    Integer addProjectAssess(ProjectAssess projectAssess);
    Integer updateProjectAssess(ProjectAssess projectAssess);
    List<ProjectAssess> getProjectAssess(Query query);
    int getSize(Query query);
    void deleteProjectAssessByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
