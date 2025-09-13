package com.my.question.servlet;

import com.alibaba.fastjson.JSONObject;
import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.LinkedHashMap;

public class ViewQuestionServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        String questionId = request.getParameter("questionId");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from  `t_answer` where id=?", questionId);
        try {
            if (resultSet.next()) {
                String content = resultSet.getString("content");
                int userId = resultSet.getInt("userId");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("content", content);
                jsonObject.put("userId", userId);
                R.sucess(response);
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String questionId = request.getParameter("questionId");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from  `t_answer` where id=?", questionId);
        try {
            if (resultSet.next()) {
                String content = resultSet.getString("content");
                int userId = resultSet.getInt("userId");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("content", content);
                jsonObject.put("userId", userId);
                R.sucess(response);
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
        }

    }
}
