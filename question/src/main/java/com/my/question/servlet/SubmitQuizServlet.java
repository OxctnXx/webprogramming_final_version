package com.my.question.servlet;

import com.alibaba.fastjson.JSONObject;
import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/submitQuiz")
public class SubmitQuizServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        try {
            // 요청 데이터 파싱
            String body = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
            JSONObject jsonObject=JSONObject.parseObject(body);
            String userName= (String) request.getSession().getAttribute("userName");
            String result=jsonObject.getString("result");
            JDBCUtils.executeUpdate("update t_user set user_type=? where userName=?",result,userName);
            R.sucess(response);
        } catch (Exception e) {
            e.printStackTrace();
            R.fail(response);
        }
    }
}
