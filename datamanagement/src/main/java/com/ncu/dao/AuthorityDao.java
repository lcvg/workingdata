package com.ncu.dao;

import com.ncu.model.Authority;
import com.ncu.model.Data;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
@Repository
public interface AuthorityDao {
    Integer addAuthority(Authority authority) ;
    Integer updateAuthority(Authority authority) ;
    List<Authority> getAuthority(@Param("id") Integer id);
    void deleteAuthority(@Param("id") Integer id);

}
