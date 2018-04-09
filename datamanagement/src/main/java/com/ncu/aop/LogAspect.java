//package com.ncu.aop;
//import com.ncu.dao.LogDao;
//import com.ncu.env.TypeEnum;
//import com.ncu.model.Log;
//import com.ncu.model.Query;
//import com.ncu.service.BaseService;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.*;
//import org.aspectj.lang.reflect.MethodSignature;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpSession;
//import java.lang.reflect.Method;
//import java.util.Arrays;
//import java.util.Date;
//
//import static com.ncu.env.TypeEnum.*;
//import static com.sun.xml.internal.ws.dump.LoggingDumpTube.Position.Before;
//
///**
// * Created by wuwf on 17/4/27.
// * 日志切面
// */
//@Aspect
//@Component
//public class LogAspect {
//    @Autowired
//    BaseService baseService;
//    @Autowired
//    HttpSession session;
////    @Pointcut("execution(public * com.ncu.controller.*.*(..))")
////    public void webLog(){}
//
//    @Pointcut("execution(public * com.ncu.controller.*.add*(..))")
//    public void addLog(){}
//
//
////    @Before("webLog()")
////    public void deBefore(JoinPoint joinPoint) throws Throwable {
////        // 接收到请求，记录请求内容
////        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
////        HttpServletRequest request = attributes.getRequest();
////        // 记录下请求内容
////        System.out.println("URL : " + request.getRequestURL().toString());
////        System.out.println("HTTP_METHOD : " + request.getMethod());
////        System.out.println("IP : " + request.getRemoteAddr());
////        System.out.println("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
////        System.out.println("ARGS : " + Arrays.toString(joinPoint.getArgs()));
////
////    }
////
////    @AfterReturning(returning = "ret", pointcut = "webLog()")
////    public void doAfterReturning(Object ret) throws Throwable {
////        // 处理完请求，返回内容
////        System.out.println("方法的返回值 : " + ret);
////    }
//
//
//
////    //后置异常通知
////    @AfterThrowing("webLog()")
////    public void throwss(JoinPoint jp){
////        System.out.println("方法异常时执行.....");
////    }
//
//    //后置最终通知,final增强，不管是抛出异常或者正常退出都会执行
////    @After("webLog()")
////    public void after(JoinPoint jp){
////        System.out.println("方法最后执行.....");
////    }
//
//    //环绕通知,环绕增强，相当于MethodInterceptor
//    @Around("addLog()")
//    public Object arround(ProceedingJoinPoint pjp) {
//        System.out.println("方法环绕start.....");
//        try {
//            Object[] args = pjp.getArgs();
//            System.out.println(args.length);
//            System.out.println(((Query) args[0]));
//            Object o =  pjp.proceed();
//
//
//
//            MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
//            Method targetMethod = methodSignature.getMethod();
//            OpeartionName on = targetMethod.getAnnotation(OpeartionName.class);
//            if(on == null){
//                System.out.println("null");
//            }else {
//                Log log = new Log();
//                log.setOperationTime(new Date());
//                log.setOperator("123");
//                log.setOperatorName("hcy");
//                if ("remove".equals(on.name())) {
//                    Object[] args = pjp.getArgs();
//                    TypeEnum t = TypeEnum.find(((Query) args[0]).getType()) ;
//                    if (t == null){
//                        return null;
//                    }
//                    switch (t){
//                        case BUILDPROJECT:
//                            log.setStep("移除建设课程");
//                            break;
//                        case AWARDRECORDS:
//                            log.setStep("移除获奖记录");
//                            break;
//                        case GUIDERECORD:
//                            log.setStep("移除指导记录");
//                            break;
//                        case PROJECTASSESS:
//                            log.setStep("移除课程考核");
//                            break;
//                        case TEACHERREFORM:
//                            log.setStep("移除教改课题");
//                            break;
//                        case TEXTBOOK:
//                            log.setStep("移除出版教材");
//                            break;
//                        case NOTICE:
//                            log.setStep("移除公告");
//                            break;
//                        default:
//                            break;
//                    }
//                }else{
//                    System.out.println(on.name());
//                    log.setStep(on.name());
//                }
//
//
//                baseService.addLog(log);
//            }
//
//
//
//
//
//            System.out.println("方法环绕proceed，结果是 :" + o);
//            return o;
//        } catch (Throwable e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}