CREATE TABLE IF NOT EXISTS `employee_role` (
  `employee_role_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `company_role_id` INT NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  UNIQUE (`employee_id`),
  CONSTRAINT `fk_employee_role_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_employee_role_role` FOREIGN KEY (`company_role_id`) REFERENCES `company_roles`(`company_role_id`)
) ENGINE=InnoDB