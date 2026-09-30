CREATE TABLE IF NOT EXISTS `customer_info` (
  `customer_info_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `customer_first_name` VARCHAR(255) NOT NULL,
  `customer_last_name` VARCHAR(255) NOT NULL,
  `customer_active_status` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`customer_info_id`),
  UNIQUE (`customer_id`),
  CONSTRAINT `fk_customer_info_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB