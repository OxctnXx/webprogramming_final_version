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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetTypeQuestionServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        ResultSet resultSet = JDBCUtils.executeQuery("select * from  `question_bank` ");
        try {
            List<JSONObject> rs=new ArrayList<>();
            if (resultSet.next()) {
                String typeQuestionText = resultSet.getString("question_text");
                int id = resultSet.getInt("id");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("typeQuestionText", typeQuestionText);
                jsonObject.put("id", id);
                rs.add(jsonObject);
            }
            R.sucess(response,rs);
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
        }

    }
}
