//package com.ncu.config;
//import com.alibaba.fastjson.serializer.SerializerFeature;
//import com.alibaba.fastjson.support.config.FastJsonConfig;
//import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
//import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.HttpMessageConverter;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
////
////import com.alibaba.fastjson.serializer.SerializerFeature;
////import com.alibaba.fastjson.support.config.FastJsonConfig;
////import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
////import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.http.MediaType;
////import org.springframework.http.converter.HttpMessageConverter;
////import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
////
////import java.util.ArrayList;
////import java.util.List;
////
/////**
//// * Created by 黄重杨 on 2018/2/13.
//// * ClassName: FastJson
//// *
//// * @Author:12909
//// * @Description: 这是一个描述
//// * @Date:Created in 20:24 2018/2/13
//// * @Modified By:
//// */
////@Configuration
////public class FastJson extends WebMvcConfigurerAdapter {
//////    @Bean
//////    public HttpMessageConverters fastJsonHttpMessageConverters(){
//////        FastJsonHttpMessageConverter fc = new FastJsonHttpMessageConverter();
//////        List<MediaType> supportedMediaTypes = new ArrayList<>();
//////        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
//////        supportedMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
//////        supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
//////        supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
//////        supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
//////        supportedMediaTypes.add(MediaType.APPLICATION_PDF);
//////        supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
//////        supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
//////        supportedMediaTypes.add(MediaType.APPLICATION_XML);
//////        supportedMediaTypes.add(MediaType.IMAGE_GIF);
//////        supportedMediaTypes.add(MediaType.IMAGE_JPEG);
//////        supportedMediaTypes.add(MediaType.IMAGE_PNG);
//////        supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
//////        supportedMediaTypes.add(MediaType.TEXT_HTML);
//////        supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
//////        supportedMediaTypes.add(MediaType.TEXT_PLAIN);
//////        supportedMediaTypes.add(MediaType.TEXT_XML);
//////        fc.setSupportedMediaTypes(supportedMediaTypes);
//////        FastJsonConfig fastJsonConfig = new FastJsonConfig();
//////
//////        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
//////
//////        fc.setFastJsonConfig(fastJsonConfig);
//////
//////        return new HttpMessageConverters(fc);
//////    }
////
////    @Override
////    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
////        super.configureMessageConverters(converters);
////        System.out.println("ssssssss");
////        /**
////         * 1.需要定义一个convert转换消息的对象
////         * 2.创建配置信息，加入配置信息：比如是否需要格式化返回的json
////         * 3.converter中添加配置信息
////         * 4.convert添加到converters当中
////         */
////        FastJsonHttpMessageConverter fastJsonHttpMessageConverter =
////                new FastJsonHttpMessageConverter();
////        FastJsonConfig fastJsonConfig = new FastJsonConfig();
////        fastJsonConfig.setSerializerFeatures(
////                SerializerFeature.PrettyFormat
////        );
////        fastJsonHttpMessageConverter.setFastJsonConfig(fastJsonConfig);
////        converters.add(fastJsonHttpMessageConverter);
////
////    }
////
////}
//@Configuration
//public class BeanConfig {
//
//    /*注入Bean : HttpMessageConverters，以支持fastjson*/
////    @Bean
////    public HttpMessageConverters fastJsonHttpMessageConverters() {
////        FastJsonHttpMessageConverter fastConvert = new FastJsonHttpMessageConverter();
////        FastJsonConfig fastJsonConfig = new FastJsonConfig();
////        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
////        fastConvert.setFastJsonConfig(fastJsonConfig);
////        return new HttpMessageConverters((HttpMessageConverter<?>) fastConvert);
////    }
//
//    @Bean
//    public HttpMessageConverters fastJsonHttpMessageConverters(){
//        FastJsonHttpMessageConverter fc = new FastJsonHttpMessageConverter();
//        List<MediaType> supportedMediaTypes = new ArrayList<>();
//        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
//        supportedMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
//        supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
//        supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
//        supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
//        supportedMediaTypes.add(MediaType.APPLICATION_PDF);
//        supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
//        supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
//        supportedMediaTypes.add(MediaType.APPLICATION_XML);
//        supportedMediaTypes.add(MediaType.IMAGE_GIF);
//        supportedMediaTypes.add(MediaType.IMAGE_JPEG);
//        supportedMediaTypes.add(MediaType.IMAGE_PNG);
//        supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
//        supportedMediaTypes.add(MediaType.TEXT_HTML);
//        supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
//        supportedMediaTypes.add(MediaType.TEXT_PLAIN);
//        supportedMediaTypes.add(MediaType.TEXT_XML);
//        fc.setSupportedMediaTypes(supportedMediaTypes);
//        FastJsonConfig fastJsonConfig = new FastJsonConfig();
//
//        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
//
//        fc.setFastJsonConfig(fastJsonConfig);
//
//        return new HttpMessageConverters(fc);
//    }
//}