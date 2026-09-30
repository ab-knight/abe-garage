CREATE TABLE IF NOT EXISTS `order_status` (
  `order_status_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `order_status` INT NOT NULL,
  PRIMARY KEY (`order_status_id`),
  UNIQUE (`order_id`),
  CONSTRAINT `fk_order_status_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB