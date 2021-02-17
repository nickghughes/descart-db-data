DROP DATABASE `descart`;
CREATE DATABASE `descart`;
USE `descart`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `display_name` TEXT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);

DROP TABLE IF EXISTS `manufacturer`;
CREATE TABLE `manufacturer`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `manufacturer_id_UNIQUE` (`id` ASC) VISIBLE
);

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `image_url` TEXT,
  `manufacturer_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`id`),
  UNIQUE INDEX `product_id_UNIQUE` (`id` ASC) VISIBLE
);

DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `image_url` TEXT,
  `website_url` TEXT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `store_id_UNIQUE` (`id` ASC) VISIBLE
);

DROP TABLE IF EXISTS `storeproduct`;
CREATE TABLE `storeproduct`(
  `store_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  FOREIGN KEY (`store_id`) REFERENCES `store`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `store_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `price` TEXT NOT NULL,
  `purchased_at` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`) REFERENCES `store`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  UNIQUE INDEX `purchase_id_UNIQUE` (`id` ASC) VISIBLE
);

DROP TABLE IF EXISTS `purchaseproduct`;
CREATE TABLE `purchaseproduct`(
  `purchase_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `price` TEXT NOT NULL,
  `quantity` INT NOT NULL,
  `index` INT NOT NULL,
  FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

DROP TABLE IF EXISTS `purchasecustomproduct`;
CREATE TABLE `purchasecustomproduct`(
  `purchase_id` INT NOT NULL,
  `name` TEXT NOT NULL,
  `price` TEXT NOT NULL,
  `quantity` INT NOT NULL,
  `index` INT NOT NULL,
  FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`)
);

DROP TABLE IF EXISTS `favoriteproduct`;
CREATE TABLE `favoriteproduct`(
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

DROP TABLE IF EXISTS `favoritepurchase`;
CREATE TABLE `favoritepurchase`(
  `purchase_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);