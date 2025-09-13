SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for question_bank
-- ----------------------------
USE web;
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank`
(
    `id`            int                                                           NOT NULL AUTO_INCREMENT,
    `question_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `alias`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 13
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question_bank
-- ----------------------------
INSERT INTO `question_bank`
VALUES (1, 'question1', 'IE');
INSERT INTO `question_bank`
VALUES (2, 'question2', 'IE');
INSERT INTO `question_bank`
VALUES (3, 'question3', 'IE');
INSERT INTO `question_bank`
VALUES (4, 'question4', 'IE');
INSERT INTO `question_bank`
VALUES (5, 'question5', 'IE');
INSERT INTO `question_bank`
VALUES (6, 'question6', 'IE');
INSERT INTO `question_bank`
VALUES (7, 'question7', 'SN');
INSERT INTO `question_bank`
VALUES (8, 'question8', 'SN');
INSERT INTO `question_bank`
VALUES (9, 'question9', 'SN');
INSERT INTO `question_bank`
VALUES (10, 'question10', 'SN');
INSERT INTO `question_bank`
VALUES (11, 'question11', 'SN');
INSERT INTO `question_bank`
VALUES (12, 'question12', 'SN');
INSERT INTO `question_bank`
VALUES (13, 'question13', 'FT');
INSERT INTO `question_bank`
VALUES (14, 'question14', 'FT');
INSERT INTO `question_bank`
VALUES (15, 'question15', 'FT');
INSERT INTO `question_bank`
VALUES (16, 'question16', 'FT');
INSERT INTO `question_bank`
VALUES (17, 'question17', 'FT');
INSERT INTO `question_bank`
VALUES (18, 'question18', 'FT');
INSERT INTO `question_bank`
VALUES (19, 'question19', 'PJ');
INSERT INTO `question_bank`
VALUES (20, 'question20', 'PJ');
INSERT INTO `question_bank`
VALUES (21, 'question21', 'PJ');
INSERT INTO `question_bank`
VALUES (22, 'question22', 'PJ');
INSERT INTO `question_bank`
VALUES (23, 'question23', 'PJ');
INSERT INTO `question_bank`
VALUES (24, 'question24', 'PJ');


SET FOREIGN_KEY_CHECKS = 1;
