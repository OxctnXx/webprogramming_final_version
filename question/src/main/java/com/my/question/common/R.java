package com.my.question.common;

import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class R {
    private String status;
    private int code = 200;
    private Object data;

    public R(String status, int code) {
        this(status, code, null);
    }

    public R(String status, int code, Object data) {
        this.status = status;
        this.code = code;
        this.data = data;
    }

    public static void sucess(HttpServletResponse response) {
        try {
            response.setContentType("text/html;charset=utf-8");
            R success = new R("success", 200);
            response.getWriter().append(JSONObject.toJSONString(success)).flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public static void sucess(HttpServletResponse response, Object data) {
        try {
            response.setContentType("text/html;charset=utf-8");
            R success = new R("success", 200, data);
            response.getWriter().append(JSONObject.toJSONString(success)).flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void fail(HttpServletResponse response) {
        try {
            response.setContentType("text/html;charset=utf-8");
            R success = new R("fail", 500);
            response.getWriter().append(JSONObject.toJSONString(success)).flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void fail(HttpServletResponse response, String message) {
        try {
            response.setContentType("text/html;charset=utf-8");
            R success = new R(message, 500);
            response.getWriter().append(JSONObject.toJSONString(success)).flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String getStatus() {
        return status;
    }

    public int getCode() {
        return code;
    }

    public Object getData() {
        return data;
    }
}
