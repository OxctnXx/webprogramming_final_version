SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_quiz
-- ----------------------------
USE web;
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `userName`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `passWord`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `number`      varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL,
    `age`         varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL,
    `school`      varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL,
    `name`        varchar(255)                                                  DEFAULT NULL,
    `guide_score` varchar(255) COLLATE utf8mb4_general_ci                       DEFAULT NULL,
    `map_score`   INT NULL,
    `user_type`   varchar(255) COLLATE utf8mb3_general_ci                       DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `username_index` (`userName`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user`
VALUES (1, '1', '1', NULL, NULL, NULL, '1NAME', NULL, NULL, NULL);
INSERT INTO `t_user`
VALUES (2, '2', '2', NULL, NULL, NULL, '2NAME', NULL, NULL, NULL);
INSERT INTO `t_user`
VALUES (4, '11', '11', '11', '11', NULL, '11NAME', NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
