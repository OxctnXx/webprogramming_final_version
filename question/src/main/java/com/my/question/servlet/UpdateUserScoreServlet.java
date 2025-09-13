package com.my.question.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

import com.my.question.common.JDBCUtils;
import com.my.question.common.R;
import org.json.JSONObject;

@WebServlet("/updateUserScore")
public class UpdateUserScoreServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String score = request.getParameter("score");
        String userName = request.getSession().getAttribute("userName").toString();
        try {
            // Update user score
            String sql = "UPDATE t_user SET guide_score = ? WHERE userName = ?";
            JDBCUtils.executeUpdate(sql, score, userName);
            R.sucess(response);
        } catch (Exception e) {
            e.printStackTrace();
            R.fail(response);
        }
    }
}
