SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for freshman_quiz
-- ----------------------------
USE web;
DROP TABLE IF EXISTS `freshman_quiz`;
CREATE TABLE `freshman_quiz`
(
    `id`          INT NOT NULL AUTO_INCREMENT,
    `quiz_text`   VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `quiz_answer` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 11
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC;

-- Insert quiz data
INSERT INTO `freshman_quiz` (`id`, `quiz_text`, `quiz_answer`)
VALUES (1, 'QUESTION1', 'o'),
       (2, 'QUESTION2', 'o'),
       (3, 'QUESTION3', 'x'),
       (4, 'QUESTION4', 'x'),
       (5, 'QUESTION5', 'o'),
       (6, 'QUESTION6', 'o'),
       (7, 'QUESTION7', 'o'),
       (8, 'QUESTION8', 'x'),
       (9, 'QUESTION9', 'x'),
       (10, 'QUESTION10', 'o');

SET FOREIGN_KEY_CHECKS = 1;

