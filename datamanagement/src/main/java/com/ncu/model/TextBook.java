package com.ncu.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄重杨 on 2018/1/16.
 * ClassName: TextBook
 *
 * @Author:12909
 * @Description: 出版教材
 * @Date:Created in 11:32 2018/1/16
 * @Modified By:
 */
public class TextBook implements Serializable {
    /**
     * 编号
     */
    private Integer id;
    /**
     * 教材名称
     */
    private String textbook;
    /**
     * 类型
     */
    private String type;
    /**
     * isbn
     */
    private String isbn;
    /**
     * 出版社
     */
    private String press;
    /**
     * 出版时间
     */
    private Date publishDate;
    /**
     * 撰写内容
     */
    private String compose;
    /**
     * 教材简介
     */
    private String introduce ;
    /**
     * 审核状态
     */
    private String state;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTextbook() {
        return textbook;
    }

    public void setTextbook(String textbook) {
        this.textbook = textbook;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPress() {
        return press;
    }

    public void setPress(String press) {
        this.press = press;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getCompose() {
        return compose;
    }

    public void setCompose(String compose) {
        this.compose = compose;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",textbook" + textbook + ",type=" + type + ",isbn=" + isbn +
                ",press" + press + ",publishDate=" + publishDate +
                ",compose=" + compose + ",introduce" + introduce + ",state=" + state;
    }
}
