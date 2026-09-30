CREATE TABLE IF NOT EXISTS `employee_pass` (
  `employee_pass_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `employee_password_hashed` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_pass_id`),
  UNIQUE (`employee_id`),
  CONSTRAINT `fk_employee_pass_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB