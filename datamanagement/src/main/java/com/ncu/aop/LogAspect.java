package com.ncu.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by wuwf on 17/4/27.
 * 日志切面
 */
@Aspect
@Component
public class LogAspect {
    @Autowired
    HttpSession session;
    @Autowired
    HttpServletResponse response;

    @Pointcut(" execution(public * com.ncu.controller.*.*a(..))")
    public void all(){}


    //环绕通知,环绕增强，相当于MethodInterceptor
    @Around("all()")
    public Object arround(ProceedingJoinPoint pjp) {
        System.out.println("方法环绕start.....");
        if(session.getAttribute("teacher")==null){
            response.setStatus(401);
            return null;
        }
        Object o = null;
        try {
            o = pjp.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        System.out.println("方法环绕proceed，结果是 :" + o);
        return o;

    }
}