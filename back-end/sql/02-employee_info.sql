CREATE TABLE IF NOT EXISTS `employee_info` (
  `employee_info_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `employee_first_name` VARCHAR(255) NOT NULL,
  `employee_last_name` VARCHAR(255) NOT NULL,
  `employee_phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_info_id`),
  CONSTRAINT `fk_employee_info_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB