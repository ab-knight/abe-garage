CREATE TABLE IF NOT EXISTS `common_services` (
  `service_id` INT NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(255) NOT NULL,
  `service_description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE (`service_name`)
) ENGINE=InnoDB