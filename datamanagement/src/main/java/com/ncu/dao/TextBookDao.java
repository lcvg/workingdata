package com.ncu.dao;

import com.ncu.model.Query;
import com.ncu.model.TextBook;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextBookDao {
    Integer addTextBookByBatch(List<TextBook> textBooks);
    Integer addTextBook(TextBook textBook);
    Integer updateTextBook(TextBook textBook);
    List<TextBook> getTextBook(Query query);
    int getSize(Query query);
    void deleteTextBookByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
