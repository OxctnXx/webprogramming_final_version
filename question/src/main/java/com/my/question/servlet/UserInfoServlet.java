
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

@WebServlet("/userInfo")
public class UserInfoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        if (request.getSession().getAttribute("userName")==null){
            R.sucess(response);
            return;
        }
        String userName = request.getSession().getAttribute("userName").toString();
        ResultSet resultSet = JDBCUtils.executeQuery("select * from t_user where userName=?", userName);
        try {
          if (resultSet.next()) {
              R.sucess(response,resultSet.getString("userName"));
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
            throw new RuntimeException(e);
        }
    }
}