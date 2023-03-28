-- DATA DEFINITION: CREATE THE DATABASE AND TABLES

-- -----------------------------------------------------
-- Schema supermercado
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `supermercado` ;

-- -----------------------------------------------------
-- Schema supermercado
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `supermercado` DEFAULT CHARACTER SET utf8 ;
USE `supermercado` ;

-- -----------------------------------------------------
-- Table `supermercado`.`empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermercado`.`empleado`;

CREATE TABLE IF NOT EXISTS `supermercado`.`empleado` (
  `idempleado` INT AUTO_INCREMENT NOT NULL,
  `email` VARCHAR(25) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idempleado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado`.`producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermercado`.`producto` ;

CREATE TABLE IF NOT EXISTS `supermercado`.`producto` (
  `sku` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripción` VARCHAR(200) NULL,
  `categoría` VARCHAR(45) NULL,
  `existencia` INT NOT NULL,
  PRIMARY KEY (`sku`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado`.`proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermercado`.`proveedor` ;

CREATE TABLE IF NOT EXISTS `supermercado`.`proveedor` (
  `idproveedor` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idproveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado`.`pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermercado`.`pedido` ;

CREATE TABLE IF NOT EXISTS `supermercado`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `sku` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `idproveedor` INT NOT NULL,
  PRIMARY KEY (`idpedido`, `sku`, `idproveedor`),
  INDEX `fk_pedido_producto1_idx` (`sku` ASC) VISIBLE,
  INDEX `fk_pedido_proveedor1_idx` (`idproveedor` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_producto1`
    FOREIGN KEY (`sku`)
    REFERENCES `supermercado`.`producto` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_proveedor1`
    FOREIGN KEY (`idproveedor`)
    REFERENCES `supermercado`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado`.`proveedor_has_producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermercado`.`proveedor_has_producto` ;

CREATE TABLE IF NOT EXISTS `supermercado`.`proveedor_has_producto` (
  `idproveedor` INT NOT NULL,
  `sku` INT NOT NULL,
  PRIMARY KEY (`idproveedor`, `sku`),
  INDEX `fk_proveedor_has_producto_producto1_idx` (`sku` ASC) VISIBLE,
  INDEX `fk_proveedor_has_producto_proveedor_idx` (`idproveedor` ASC) VISIBLE,
  CONSTRAINT `fk_proveedor_has_producto_proveedor`
    FOREIGN KEY (`idproveedor`)
    REFERENCES `supermercado`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedor_has_producto_producto1`
    FOREIGN KEY (`sku`)
    REFERENCES `supermercado`.`producto` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;