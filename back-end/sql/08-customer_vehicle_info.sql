CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
  `vehicle_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `vehicle_year` INT NOT NULL,
  `vehicle_make` VARCHAR(255) NOT NULL,
  `vehicle_model` VARCHAR(255) NOT NULL,
  `vehicle_type` VARCHAR(255) NOT NULL,
  `vehicle_mileage` INT,
  `vehicle_tag` VARCHAR(255) NOT NULL,
  `vehicle_serial_number` VARCHAR(255) NOT NULL,
  `vehicle_color` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  CONSTRAINT `fk_vehicle_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB