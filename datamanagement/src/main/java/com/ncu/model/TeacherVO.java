package com.ncu.model;

/**
 * Created by 黄重杨 on 2018/1/23.
 * ClassName: TeacherVO
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 10:55 2018/1/23
 * @Modified By:
 */
public class TeacherVO extends Teacher {
    /**
     * 获奖记录数
     */
    private Integer records;
    private Integer buildProject;
    private Integer textBook;
    private Integer teacherReform;

    private String depId;
    private String permiss;

    public String getDepId() {
        return depId;
    }

    public String getPermiss() {
        return permiss;
    }

    public void setPermiss(String permiss) {
        this.permiss = permiss;
    }

    public void setDepId(String depId) {
        this.depId = depId;
    }

    public Integer getBuildProject() {
        return buildProject;
    }

    public void setBuildProject(Integer buildProject) {
        this.buildProject = buildProject;
    }

    public Integer getTextBook() {
        return textBook;
    }

    public void setTextBook(Integer textBook) {
        this.textBook = textBook;
    }

    public Integer getTeacherReform() {
        return teacherReform;
    }

    public void setTeacherReform(Integer teacherReform) {
        this.teacherReform = teacherReform;
    }

    public Integer getRecords() {
        return records;
    }

    public void setRecords(Integer records) {
        this.records = records;
    }
}
