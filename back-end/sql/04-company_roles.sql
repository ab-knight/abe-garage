CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` INT NOT NULL AUTO_INCREMENT,
  `company_role_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE (`company_role_name`)
) ENGINE=InnoDB