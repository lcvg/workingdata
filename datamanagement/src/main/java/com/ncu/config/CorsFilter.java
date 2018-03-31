//package com.ncu.config;
//
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.*;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//public class CorsFilter implements Filter {
//
//
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        HttpServletResponse httpResponse = (HttpServletResponse) response;
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//        httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:8070");
//        httpResponse.setHeader("Access-Control-Allow-Methods", httpRequest.getMethod());
//        httpResponse.setHeader("Access-Control-Max-Age", "3600");
//        httpResponse.setHeader("Access-Control-Allow-Headers", httpRequest.getHeader("Access-Control-Request-Headers"));
//        chain.doFilter(request, response);
//    }
//
//    @Override
//    public void destroy() {
//
//    }
//
//
//}