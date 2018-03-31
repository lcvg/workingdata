package com.ncu.utils;

import org.apache.commons.codec.binary.Hex;
import org.jetbrains.annotations.Nullable;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by 黄重杨 on 2018/3/21.
 * ClassName: Encrypte
 *
 * @Author:12909
 * @Description: 这是一个描述
 * @Date:Created in 11:48 2018/3/21
 * @Modified By:
 */
public class Encrypte {
    @Nullable
    public static String jkdMD5(String src){

        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(src.getBytes());
            return Hex.encodeHexString(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
    @Nullable
    public static String jdkSHA1(String src){
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(src.getBytes());
            return Hex.encodeHexString(digest.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }


    public static void main(String[] args) {
        String src = "184593";
        jkdMD5(src);
        System.out.println(jdkSHA1(src).length());
        jdkSHA1(src);
    }
}
