CREATE TABLE IF NOT EXISTS `customer_identifier` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone_number` VARCHAR(255) NOT NULL,
  `customer_added_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE (`customer_email`),
  UNIQUE (`customer_phone_number`),
  UNIQUE (`customer_hash`)
) ENGINE=InnoDB