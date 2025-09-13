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
@WebServlet("/mapQuiz")
public class MapquizServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        ResultSet resultSet = JDBCUtils.executeQuery("select * from  `map_quiz` ");
        try {
            List<JSONObject> rs = new ArrayList<>();
            while (resultSet.next()) {
                String quizText = resultSet.getString("quiz_text");
                String quizAnswer = resultSet.getString("quiz_answer");
                int id = resultSet.getInt("id");
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("quizText", quizText);
                jsonObject.put("quizAnswer", quizAnswer);
                jsonObject.put("id", id);
                rs.add(jsonObject);
            }
            R.sucess(response, rs);
        } catch (SQLException e) {
            e.printStackTrace();
            R.fail(response, e.getMessage());
        }

    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String userId = (String) request.getSession().getAttribute("userId");
        String id = request.getParameter("id");
        String userAnswer = request.getParameter("userAnswer");
        ResultSet resultSet = JDBCUtils.executeQuery("select * from  `map_quiz` where id=?", id);
        try {
            if (resultSet.next()) {
                String quiz_answer = resultSet.getString("quiz_answer");
                JDBCUtils.executeUpdate("INSERT INTO `t_answer`(`userId`,`quizId`, `userAnswer`,`correctAnswer`) VALUES (?,?,?,?,?)", userId, id, userAnswer, quiz_answer);
            }
        } catch (SQLException e) {
            R.fail(response, e.getMessage());
            throw new RuntimeException(e);
        }
        R.sucess(response);
    }
}
