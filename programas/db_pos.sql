-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for pos
CREATE DATABASE IF NOT EXISTS `pos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pos`;

-- Dumping structure for table pos.bitacora
CREATE TABLE IF NOT EXISTS `bitacora` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `suceso` varchar(245) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bitacora_usuario_idx` (`idUsuario`),
  CONSTRAINT `fk_bitacora_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos.bitacora: ~0 rows (approximately)
DELETE FROM `bitacora`;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;

-- Dumping structure for procedure pos.calcularTotalOrden
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcularTotalOrden`(LidOrden int)
BEGIN

update orden set total=(select sum(d.precioUnitario * d.cantidad) from detalleorden d where d.idOrden=LidOrden) where id=LidOrden;

END//
DELIMITER ;

-- Dumping structure for table pos.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Dumping data for table pos.categoria: ~5 rows (approximately)
DELETE FROM `categoria`;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;

-- Dumping structure for table pos.compra
CREATE TABLE IF NOT EXISTS `compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `Ndocumento` varchar(45) DEFAULT NULL,
  `NRC` varchar(45) DEFAULT NULL,
  `NITDUI` varchar(45) DEFAULT NULL,
  `nombreProveedor` varchar(145) NOT NULL,
  `montoInterno` decimal(10,4) NOT NULL,
  `iva` decimal(8,2) NOT NULL,
  `percepcion` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table pos.compra: ~11 rows (approximately)
DELETE FROM `compra`;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;

-- Dumping structure for view pos.dashboardllevar
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `dashboardllevar` (
	`IdOrden` INT(11) NOT NULL,
	`id` INT(11) NOT NULL,
	`Mesero` VARCHAR(145) NOT NULL COLLATE 'utf8_general_ci',
	`Cliente` VARCHAR(145) NOT NULL COLLATE 'utf8_general_ci',
	`Total` DECIMAL(8,2) NULL,
	`Estado` VARCHAR(2) NOT NULL COMMENT 'CC -- Cobrado y Cerrado, CP -- Cobrado en preparacion, AA -- Activa sin Cobrar' COLLATE 'utf8_general_ci',
	`TiempoPreparado` DECIMAL(22,1) NULL,
	`Preparado` VARCHAR(8) NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Dumping structure for view pos.dashboardprincipal
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `dashboardprincipal` (
	`IdOrden` INT(11) NOT NULL,
	`id` INT(11) NOT NULL,
	`Mesa` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci',
	`Mesero` VARCHAR(145) NOT NULL COLLATE 'utf8_general_ci',
	`Cliente` VARCHAR(145) NOT NULL COLLATE 'utf8_general_ci',
	`Total` DECIMAL(8,2) NULL,
	`Estado` VARCHAR(2) NOT NULL COMMENT 'CC -- Cobrado y Cerrado, CP -- Cobrado en preparacion, AA -- Activa sin Cobrar' COLLATE 'utf8_general_ci',
	`llevar` INT(11) NOT NULL,
	`TiempoPreparado` DECIMAL(22,1) NULL,
	`Preparado` VARCHAR(8) NULL COLLATE 'utf8mb4_general_ci',
	`TiempoRapido` DECIMAL(22,1) NULL,
	`Rapido` VARCHAR(8) NULL COLLATE 'utf8mb4_general_ci',
	`tipo` VARCHAR(6) NOT NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Dumping structure for table pos.detallecompra
CREATE TABLE IF NOT EXISTS `detallecompra` (
  `idCompra` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` decimal(8,2) NOT NULL,
  `precioUnitario` decimal(8,2) NOT NULL,
  PRIMARY KEY (`idCompra`,`idProducto`),
  KEY `fk_detallecompra_producto_idx` (`idProducto`),
  CONSTRAINT `fk_detallecompra_compra` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detallecompra_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos.detallecompra: ~0 rows (approximately)
DELETE FROM `detallecompra`;
/*!40000 ALTER TABLE `detallecompra` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallecompra` ENABLE KEYS */;

-- Dumping structure for table pos.detalleorden
CREATE TABLE IF NOT EXISTS `detalleorden` (
  `idOrden` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` decimal(5,1) NOT NULL,
  `precioUnitario` decimal(8,2) NOT NULL,
  PRIMARY KEY (`idOrden`,`idProducto`),
  KEY `fk_detalle_producto_idx` (`idProducto`),
  CONSTRAINT `fk_detalle_orden` FOREIGN KEY (`idOrden`) REFERENCES `orden` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos.detalleorden: ~55 rows (approximately)
DELETE FROM `detalleorden`;
/*!40000 ALTER TABLE `detalleorden` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleorden` ENABLE KEYS */;

-- Dumping structure for table pos.mesa
CREATE TABLE IF NOT EXISTS `mesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mesa` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos.mesa: ~0 rows (approximately)
DELETE FROM `mesa`;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;

-- Dumping structure for table pos.orden
CREATE TABLE IF NOT EXISTS `orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMesa` int(11) DEFAULT NULL COMMENT 'Cuando la orden es para llevar, la mesa es NULL',
  `idUsuario` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `llevar` int(11) NOT NULL DEFAULT 0,
  `estado` varchar(2) NOT NULL COMMENT 'CC -- Cobrado y Cerrado, CP -- Cobrado en preparacion, AA -- Activa sin Cobrar',
  `observacion` varchar(245) DEFAULT NULL,
  `tiempoPreparado` datetime DEFAULT NULL,
  `tiempoRapido` datetime DEFAULT NULL,
  `total` decimal(8,2) DEFAULT 0.00,
  `propina` decimal(8,2) DEFAULT 0.00,
  `formaPago` varchar(1) DEFAULT 'E' COMMENT 'Indica la forma de pago: E--Efectivo T--Tarjeta de Credito',
  `cliente` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orden_usuario1_idx` (`idUsuario`),
  KEY `fk_orden_mesa_idx` (`idMesa`),
  CONSTRAINT `fk_orden_usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- Dumping data for table pos.orden: ~44 rows (approximately)
DELETE FROM `orden`;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;

-- Dumping structure for table pos.parametro
CREATE TABLE IF NOT EXISTS `parametro` (
  `id` int(11) NOT NULL,
  `nombre` varchar(145) NOT NULL,
  `valor` varchar(245) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table pos.parametro: ~13 rows (approximately)
DELETE FROM `parametro`;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
INSERT INTO `parametro` (`id`, `nombre`, `valor`) VALUES
	(1, 'ModoEntorno', 'MESA'),
	(2, 'Nombre', 'Café de Palo'),
	(3, 'Descripcion', 'Servicios de Cafetería'),
	(4, 'Telefono', '(503) 2453-5478'),
	(5, 'NIT', '0524-045374-102-8'),
	(6, 'Giro', 'Restaurante'),
	(7, 'Direccion', 'Barrio El Calvario calle libertad N23 Santa Ana'),
	(8, 'Imprimir Ticket de productos preparados', 'SI'),
	(9, 'Imprimir Ticket de productos NO preparados o rapidos', 'NO'),
	(10, 'Tiempo maximo ordenes RAPIDAS (minutos)', '1'),
	(11, 'Tiempo maximo Preparacion de Orden', '2'),
	(12, 'Login en cada pantalla', '0'),
	(13, 'Propina', '0.75');
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;

-- Dumping structure for table pos.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(145) NOT NULL,
  `precio` decimal(8,2) NOT NULL DEFAULT 0.00,
  `inventario` int(11) NOT NULL DEFAULT 0,
  `preparado` int(11) NOT NULL DEFAULT 1,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_producto_categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Dumping data for table pos.producto: ~13 rows (approximately)
DELETE FROM `producto`;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;

-- Dumping structure for table pos.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(145) NOT NULL,
  `login` varchar(45) NOT NULL,
  `clave` varchar(245) NOT NULL,
  `pin` varchar(5) NOT NULL,
  `rol` varchar(1) NOT NULL DEFAULT 'M' COMMENT 'G--Gerente\nM--Mesero',
  PRIMARY KEY (`id`),
  UNIQUE KEY `loggin_UNIQUE` (`login`),
  UNIQUE KEY `pin_UNIQUE` (`pin`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table pos.usuario: ~4 rows (approximately)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombreCompleto`, `login`, `clave`, `pin`, `rol`) VALUES
	(1, 'Administrador', 'admin', '22acb1a0beb75bd6854f515c27a2538da06ffdee', '1234', 'G'),
	(15, 'Admin', 'usuario', '745314840fcd9fd0da118d7b10d7787b9d7a0d37', '123', 'G');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Dumping structure for trigger pos.bitacora_BEFORE_INSERT
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `bitacora_BEFORE_INSERT` BEFORE INSERT ON `bitacora` FOR EACH ROW BEGIN
SET NEW.fecha = now();
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger pos.detalleCompra_AFTER_INSERT
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `detalleCompra_AFTER_INSERT` AFTER INSERT ON `detallecompra` FOR EACH ROW BEGIN
update producto set inventario=inventario+new.cantidad where id=new.idProducto;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger pos.detalleorden_AFTER_INSERT
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `detalleorden_AFTER_INSERT` AFTER INSERT ON `detalleorden` FOR EACH ROW BEGIN
declare tipoP int;
declare Linventario int;
	set tipoP=(select preparado from producto where id=new.idProducto);
	if tipoP=1 then
		update orden set tiempoPreparado=now() where id=new.idOrden;
    else
    		update orden set tiempoRapido=now() where id=new.idOrden;
    end if;
    set Linventario=(select inventario from producto where id=new.idProducto);
    set Linventario=Linventario - new.cantidad;
    if Linventario<0 then
		set Linventario=0;
	end if;
    update producto set inventario=Linventario where id=new.idProducto;
    call calcularTotalOrden(new.idOrden);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger pos.detalleorden_AFTER_UPDATE
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `detalleorden_AFTER_UPDATE` AFTER UPDATE ON `detalleorden` FOR EACH ROW BEGIN
declare tipoP int;
	set tipoP=(select preparado from producto where id=new.idProducto);
	if tipoP=1 then
		update orden set tiempoPreparado=now() where id=new.idOrden;
    else
    		update orden set tiempoRapido=now() where id=new.idOrden;
    end if;
    
    call calcularTotalOrden(new.idOrden);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger pos.detalleorden_BEFORE_UPDATE
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `detalleorden_BEFORE_UPDATE` BEFORE UPDATE ON `detalleorden` FOR EACH ROW BEGIN
declare Linventario int;
set Linventario=(select inventario from producto where id=new.idProducto);
    set Linventario=Linventario - (new.cantidad - old.cantidad);
    if Linventario<0 then
		set Linventario=0;
	end if;
    update producto set inventario=Linventario where id=new.idProducto;

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger pos.orden_BEFORE_INSERT
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `orden_BEFORE_INSERT` BEFORE INSERT ON `orden` FOR EACH ROW BEGIN
SET NEW.fecha = now();
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for view pos.dashboardllevar
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `dashboardllevar`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `dashboardllevar` AS select `o`.`id` AS `IdOrden`,`o`.`id` AS `id`,`u`.`nombreCompleto` AS `Mesero`,ifnull(`o`.`cliente`,'') AS `Cliente`,`o`.`total` AS `Total`,`o`.`estado` AS `Estado`,round(((now() - `o`.`tiempoPreparado`) / 60),1) AS `TiempoPreparado`,if(`o`.`tiempoPreparado`,ifnull(if((round(((now() - `o`.`tiempoPreparado`) / 60),1) > (select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 11))),'ROJO',NULL),if((((select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 11)) - round(((now() - `o`.`tiempoPreparado`) / 60),1)) > 1.5),'VERDE','AMARILLO')),NULL) AS `Preparado` from (`orden` `o` join `usuario` `u` on((`o`.`idUsuario` = `u`.`id`))) where ((`o`.`estado` <> 'CC') and (`o`.`llevar` = 1)) order by 1 ;

-- Dumping structure for view pos.dashboardprincipal
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `dashboardprincipal`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `dashboardprincipal` AS select `o`.`id` AS `IdOrden`,`o`.`id` AS `id`,`m`.`mesa` AS `Mesa`,`u`.`nombreCompleto` AS `Mesero`,ifnull(`o`.`cliente`,'') AS `Cliente`,`o`.`total` AS `Total`,`o`.`estado` AS `Estado`,`o`.`llevar` AS `llevar`,round(((now() - `o`.`tiempoPreparado`) / 60),1) AS `TiempoPreparado`,if(`o`.`tiempoPreparado`,ifnull(if((round(((now() - `o`.`tiempoPreparado`) / 60),1) > (select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 11))),'ROJO',NULL),if((((select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 11)) - round(((now() - `o`.`tiempoPreparado`) / 60),1)) > 1.5),'VERDE','AMARILLO')),NULL) AS `Preparado`,round(((now() - `o`.`tiempoRapido`) / 60),1) AS `TiempoRapido`,if(`o`.`tiempoRapido`,ifnull(if((round(((now() - `o`.`tiempoRapido`) / 60),1) > (select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 10))),'ROJO',NULL),if((((select `parametro`.`valor` from `parametro` where (`parametro`.`id` = 10)) - round(((now() - `o`.`tiempoRapido`) / 60),1)) > 1.5),'VERDE','AMARILLO')),NULL) AS `Rapido`,if((`o`.`llevar` = 1),'LLEVAR','AQUI') AS `tipo` from (`orden` `o` join `usuario` `u` on((`o`.`idUsuario` = `u`.`id`))) JOIN mesa m on o.idMesa = m.id where (`o`.`estado` <> 'CC') order by 1 ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
