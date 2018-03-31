package com.ncu;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
@MapperScan("com.ncu.dao")
public class Application extends WebMvcConfigurerAdapter {

@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
	super.configureMessageConverters(converters);

	FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();

	FastJsonConfig fastJsonConfig = new FastJsonConfig();
	fastJsonConfig.setSerializerFeatures(
			SerializerFeature.PrettyFormat
	);
	fastConverter.setFastJsonConfig(fastJsonConfig);

	converters.add(fastConverter);
}
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}

