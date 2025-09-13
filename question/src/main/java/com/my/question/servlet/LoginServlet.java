package com.my.question.servlet;

import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from t_user where userName=? and password=?", userName, passWord);
        try {
          if (resultSet.next()) {
              HttpSession session = request.getSession();
              session.setAttribute("userName" , userName);
                R.sucess(response);
            } else {
                R.fail(response, "invalid_user");
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
            throw new RuntimeException(e);
        }
    }
}