CREATE TABLE IF NOT EXISTS `order_info` (
  `order_info_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `order_total_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `order_estimated_completion_date` DATETIME,
  `order_completion_date` DATETIME,
  `order_additional_requests` VARCHAR(255) NOT NULL,
  `order_additional_requests_completed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_info_id`),
  UNIQUE (`order_id`),
  CONSTRAINT `fk_order_info_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB