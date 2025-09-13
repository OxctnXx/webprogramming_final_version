package com.my.question.common;

import java.io.IOException;
import java.sql.*;
import java.util.Properties;


public class JDBCUtils {
    private static String driver;       //Driver驱动
    private static String url;          //Uniform Resource Locator，包含数据库信息
    private static String user;         //用户名
    private static String password;     //用户密码

    static {
        Properties properties = new Properties();
        try {
            properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("db.properties"));
            driver = properties.getProperty("driver");
            Class.forName(driver);
            url = properties.getProperty("url");
            user = properties.getProperty("user");
            password = properties.getProperty("password");
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    //获取连接
    private static Connection getConnection() {
        try {
            return DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static PreparedStatement createPreparedStatement(String sql, Object... params) {
        PreparedStatement stmt = null;
        try {
            stmt = getConnection().prepareStatement(sql);
            for (int i = 0; i < params.length; ++i) {
                stmt.setObject(i + 1, params[i]);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return stmt;
    }

    public static ResultSet executeQuery(String sql, Object... params) {
        try {
            ResultSet resultSet = createPreparedStatement(sql, params).executeQuery();
            return resultSet;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

        public static int executeUpdate(String sql, Object... params) {
        try {
          return createPreparedStatement(sql, params).executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    //释放资源

    public static void close(ResultSet resultSet, Statement statement, Connection connection) {
        try {
            if (resultSet != null) {
                resultSet.close();
            }
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}