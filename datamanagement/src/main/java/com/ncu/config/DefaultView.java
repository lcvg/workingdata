package com.ncu.config;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.List;

@Configuration
public class DefaultView extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers( ViewControllerRegistry registry ) {
        super.addViewControllers( registry );
        registry.addViewController( "/" ).setViewName( "/index" );
        registry.setOrder( Ordered.HIGHEST_PRECEDENCE );

    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        super.configureViewResolvers(registry);

    }

    @Bean
    public InternalResourceViewResolver resourceViewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        //请求视图文件的前缀地址
        internalResourceViewResolver.setPrefix("/static/");
        // 请求视图文件的后缀
        internalResourceViewResolver.setSuffix(".html");
        return internalResourceViewResolver; }

    /** * 消息内容转换配置 * 配置fastJson返回json转换 * @param converters */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        //调用父类的配置
        super.configureMessageConverters(converters);
        //创建fastJson消息转换器
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter(); //创建配置类
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        //修改配置返回内容的过滤
        fastJsonConfig.setSerializerFeatures(
                SerializerFeature.DisableCircularReferenceDetect,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty );
        fastConverter.setFastJsonConfig(fastJsonConfig);
        //将fastjson添加到视图消息转换器列表内
        converters.add(fastConverter);
    }


    /** * 跨域CORS配置 * @param registry */
    @Override public void addCorsMappings(CorsRegistry registry) {
        super.addCorsMappings(registry);
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedMethods("POST","GET")
                .allowedOrigins("*"); }






}
