package com.my.question.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class GetClearStatusServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json; charset=UTF-8");

        // Database connection parameters
        String dbUrl = "jdbc:mysql://localhost:3306/web?useSSL=true&verifyServerCertificate=false&serverTimezone=Asia/Seoul";
        String dbUser = "root";
        String dbPassword = "cqz13579*";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        // Prepare JSON object to send response
        JSONObject jsonResponse = new JSONObject();

        try {
            // Establish connection
            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);

            // Query to check clear status and scores
            String sql = "SELECT guide_cleared, guide_score, map_cleared, map_score, user_type FROM t_user WHERE id = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, getUserIdFromSession(request)); // Replace with your session user ID retrieval logic
            rs = pstmt.executeQuery();

            if (rs.next()) {
                // Populate JSON response with data
                jsonResponse.put("guideCleared", rs.getBoolean("guide_cleared"));
                jsonResponse.put("guideScore", rs.getInt("guide_score"));
                jsonResponse.put("mapCleared", rs.getBoolean("map_cleared"));
                jsonResponse.put("mapScore", rs.getInt("map_score"));
                jsonResponse.put("typeCleared", rs.getBoolean("type_cleared"));
                jsonResponse.put("typeScore", rs.getInt("type_score"));
            } else {
                // Default response if no data is found
                jsonResponse.put("guideCleared", false);
                jsonResponse.put("guideScore", 0);
                jsonResponse.put("mapCleared", false);
                jsonResponse.put("mapScore", 0);
                jsonResponse.put("typeCleared", false);
                jsonResponse.put("typeScore", 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
            jsonResponse.put("error", "Failed to retrieve data");
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Write JSON response
        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toString());
        out.flush();
    }

    // Example: Replace this method with your session handling logic
    private int getUserIdFromSession(HttpServletRequest request) {
        // Retrieve user ID from session (example)
        Object userId = request.getSession().getAttribute("user_id");
        return (userId != null) ? (int) userId : 0;
    }
}
