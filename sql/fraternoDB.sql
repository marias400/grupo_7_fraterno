CREATE SCHEMA `fraterno`;
USE `fraterno` ;

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) ,
  `price` INT NOT NULL,
  `category` VARCHAR(45) ,
  `size` VARCHAR(45) ,
  `ingredients` VARCHAR(200) ,
  `image` VARCHAR(45) ,
  `suitability` VARCHAR(200) ,
  `stock` INT ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) UNIQUE,
  `phone` VARCHAR(45) UNIQUE ,
  `address` VARCHAR(45) ,
  `password` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `isAdmin` INT NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `cart` (
  `id` INT  PRIMARY KEY NOT NULL AUTO_INCREMENT   ,
  `products_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `amount` INT NOT NULL,
  INDEX `fk_cart_products_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_cart_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_products`
    FOREIGN KEY (`products_id`)
    REFERENCES `fraterno`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `fraterno`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



