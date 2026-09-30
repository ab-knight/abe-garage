CREATE TABLE IF NOT EXISTS `order_services` (
  `order_service_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `service_completed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_service_id`),
  CONSTRAINT `fk_order_services_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_services_service` FOREIGN KEY (`service_id`) REFERENCES `common_services`(`service_id`)
) ENGINE=InnoDB