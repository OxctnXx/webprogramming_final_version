package com.my.question.servlet;

import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UerNameValideServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from t_user where userName=?", userName);
        try {
            if (resultSet.next()) {
                R.fail(response, "exists");
            } else {
                R.sucess(response);
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
            throw new RuntimeException(e);
        }
    }
}