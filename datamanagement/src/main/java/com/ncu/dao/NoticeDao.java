package com.ncu.dao;

import com.ncu.model.Notice;
import com.ncu.model.Query;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 黄重杨 on 2018/1/24.
 * ClassName: NoticeDao
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 11:12 2018/1/24
 * @Modified By:
 */
@Repository
public interface NoticeDao {
    Integer addNotice(Notice notice);
    Integer updateNotice(Notice notice);
    List<Notice> getNotice(Query query);
    Integer deleteNotice(List<Integer> ids);
}
