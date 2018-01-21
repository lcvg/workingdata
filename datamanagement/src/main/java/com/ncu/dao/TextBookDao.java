package com.ncu.dao;

import com.ncu.model.TextBook;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextBookDao {
    Integer addTextBookByBatch(List<TextBook> textBooks);
    Integer addTextBook(TextBook textBook);
    Integer updateTextBook(TextBook textBook);
    List<TextBook> getTextBook(@Param("id") Integer id);
    void deleteTextBookByBatch(List<Integer> ids);
    void checkByBatch(List<Integer> ids);
    void checkNoByBatch(List<Integer> ids);
}
