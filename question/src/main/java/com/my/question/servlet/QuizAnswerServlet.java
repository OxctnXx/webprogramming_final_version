package com.my.question.servlet;

import com.alibaba.fastjson.JSONObject;
import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QuizAnswerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from `t_quiz` where userName=?", userName);
        try {
            List<JSONObject> rs = new ArrayList<>();
            while (resultSet.next()) {
                String userAnswer = resultSet.getString("userAnswer");
                String correctAnswer = resultSet.getString("correctAnswer");
                String quizKey = resultSet.getString("quizKey");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("userAnswer", userAnswer);
                jsonObject.put("correctAnswer", correctAnswer);
                jsonObject.put("quizKey", quizKey);
                rs.add(jsonObject);
            }
            R.sucess(response, JSONObject.toJSONString(rs));
        } catch (SQLException e) {
            R.fail(response, "fail");

        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from `t_quiz` where userName=?);", userName);
        try {
            List<JSONObject> rs = new ArrayList<>();
            if (resultSet.next()) {
                String userAnswer = resultSet.getString("userAnswer");
                String correctAnswer = resultSet.getString("correctAnswer");
                String quizKey = resultSet.getString("quizKey");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("userAnswer", userAnswer);
                jsonObject.put("correctAnswer", correctAnswer);
                jsonObject.put("quizKey", quizKey);
                rs.add(jsonObject);
            }
            R.sucess(response, JSONObject.toJSONString(rs));
        } catch (SQLException e) {
            R.fail(response, "fail");

        }
    }
}