CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `user_email` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `user_password` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin