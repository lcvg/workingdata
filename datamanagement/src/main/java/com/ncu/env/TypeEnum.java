package com.ncu.env;

/**
 * Created by 黄重杨 on 2018/2/5.
 * ClassName: TypeEnum
 *
 * @Author:12909
 * @Description: 类型枚举
 * @Date:Created in 10:34 2018/2/5
 * @Modified By:
 */
public enum TypeEnum {
    BUILDPROJECT(1),
    GUIDERECORD(2),
    PROJECTASSESS(3),
    TEACHERREFORM(4),
    TEXTBOOK(5),
    AWARDRECORDS(6),
    NOTICE(7),
    LOG(8),
    DATA(9),
    DEPARTMENT(10);

    private int index;

    TypeEnum(int index){
        this.index = index;

    }
    public int getIndex(){
        return this.index;
    }
    public static TypeEnum find(int index){
        for (TypeEnum t : TypeEnum.values()){
            if (t.getIndex() == index){
                return t;
            }
        }
        return null;
    }

}
