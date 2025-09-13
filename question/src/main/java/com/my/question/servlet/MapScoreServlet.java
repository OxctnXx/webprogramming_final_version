package com.my.question.servlet;

import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/mapscore")
public class MapScoreServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String score = request.getParameter("score");
        String userName = request.getSession().getAttribute("userName").toString();
        try {
            // Update user score
            String sql = "UPDATE t_user SET map_score = ? WHERE userName = ?";
            JDBCUtils.executeUpdate(sql, score, userName);
            R.sucess(response);
        } catch (Exception e) {
            e.printStackTrace();
            R.fail(response);
        }
    }
}
