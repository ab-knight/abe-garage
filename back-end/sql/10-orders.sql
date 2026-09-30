CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `order_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_hash` VARCHAR(255) NOT NULL,
  `order_status` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE (`order_hash`),
  CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`),
  CONSTRAINT `fk_orders_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`)
) ENGINE=InnoDB