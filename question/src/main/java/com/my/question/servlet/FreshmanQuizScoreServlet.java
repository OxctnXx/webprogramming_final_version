package com.my.question.servlet;

import com.alibaba.fastjson.JSONObject;
import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@WebServlet("/freshmanQuizScore")
public class FreshmanQuizScoreServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        String userName = (String) request.getSession().getAttribute("userName");
        ResultSet resultSet = JDBCUtils.executeQuery("select guide_score,map_score  from  `t_user` where `userName`=?", userName);
        try {
            if (resultSet.next()) {
                int guide_score = resultSet.getInt("guide_score");
                int map_score = resultSet.getInt("map_score");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("guide_score", guide_score);
                jsonObject.put("map_score", map_score);
                R.sucess(response, jsonObject);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            R.fail(response, e.getMessage());
        }
    }

}
