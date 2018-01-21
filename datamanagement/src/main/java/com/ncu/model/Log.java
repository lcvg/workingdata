package com.ncu.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by 1290995884@qq.com on 2018/1/21.
 */
public class Log implements Serializable{
    private Integer id;
    private String operator;
    private String operatorName;
    private String step;
    private Date operationTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public Date getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(Date operationTime) {
        this.operationTime = operationTime;
    }

    @Override
    public String toString() {
        return "[ id=" + id + ",operator" + operator + ",operatorName=" + operatorName + ",step=" + step +
                ",opertationTime" + operationTime +"]";
    }
}
