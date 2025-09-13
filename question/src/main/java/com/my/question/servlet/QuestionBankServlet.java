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

public class QuestionBankServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        ResultSet resultSet = JDBCUtils.executeQuery("select * from question_bank");
        List<JSONObject> jsonObjects = new ArrayList<>();
        try {
            if (resultSet.next()) {
                String name = resultSet.getString("name");
                String alias = resultSet.getString("alias");
                int id = resultSet.getInt("id");
                Double score = resultSet.getDouble("score");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", id);
                jsonObject.put("score", score);
                jsonObject.put("name", name);
                jsonObject.put("alias", alias);
                jsonObjects.add(jsonObject);
            }
            R.sucess(response, jsonObjects);
        } catch (SQLException e) {
            R.fail(response);
            throw new RuntimeException(e);
        }
    }

}


