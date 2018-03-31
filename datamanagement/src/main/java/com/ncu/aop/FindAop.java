//package com.ncu.aop;
//
//import com.ncu.model.Query;
//
//import java.lang.reflect.InvocationHandler;
//import java.lang.reflect.Method;
//import java.lang.reflect.Parameter;
//import java.lang.reflect.Proxy;
//import java.util.Map;
//import java.util.Objects;
//
///**
// * Created by 黄重杨 on 2018/2/5.
// * ClassName: FindAop
// *
// * @Author:12909
// * @Description: 这是一个描述
// * @Date:Created in 11:14 2018/2/5
// * @Modified By:
// */
//public class FindAop implements InvocationHandler {
//    private Object target;
//
//    public Map<String ,Object> find (){
//
//    }
//    /**
//     * 绑定委托对象并返回一个代理类
//     * @param target
//     * @return
//     */
//    public Object bind(Object target) {
//        this.target = target;
//        //取得代理对象
//        return Proxy.newProxyInstance(target.getClass().getClassLoader(),
//                target.getClass().getInterfaces(), this);   //要绑定接口(这是一个缺陷，cglib弥补了这一缺陷)
//    }
//
//    @Override
//    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//        Parameter parameter = method.getParameters()[0];
//        Query q = (Query) parameter;
//        return null;
//
//    }
//}
