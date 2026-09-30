CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `employee_email` VARCHAR(255) NOT NULL,
  `employee_active_status` TINYINT(1) NOT NULL DEFAULT 1,
  `employee_added_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE (`employee_email`)
) ENGINE=InnoDB