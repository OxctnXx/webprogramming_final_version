package com.my.question.servlet;

import com.my.question.common.JDBCUtils;
import com.my.question.common.R;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegisterServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        String number = request.getParameter("number");
        String age = request.getParameter("age");
        String school = request.getParameter("school");
        String name = request.getParameter("name");
        try {
            JDBCUtils.executeUpdate("INSERT INTO `t_user`(`userName`, `passWord`,`number`,`age`,`school`,`name`) VALUES (?, ?,?,?,?,?)", userName, passWord, number, age, school, name);
            R.sucess(response);
        } catch (Exception e) {
            e.printStackTrace();
            R.fail(response, "fail");
        }

    }
}