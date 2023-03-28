-- DATA MANIPULATION: CREATE SAMPLE VALUES FOR DATABASE

INSERT INTO empleado VALUES ("pablo@example.com", "pablo"), ("james@example.com", "james");

INSERT INTO producto VALUES
	(1, "Pencil - Pack of 10", "Bic pencils 10-pack", "Home & Office", 27),
    (2, "Scissor", "Stainless steel scissors", "Home & Office", 15),
    (3, "Detergent", "3-pound bag of detergent poweder", "Cleaning Supplies", 45),
    (4, "Cherios", "1 pound box of Cherios, original flavor", "Food & Drink", 34),
    (5, "Almond Milk", "1-liter tetra pack of Orignal Almond Milk", "Food & Drink", 29);
INSERT INTO proveedor VALUES
	(1, "Great Value", "customers@greatvalue.com"),
	(2, "Dos Pinos", "sc@dospinos.com"),
	(3, "Libreria Progreso", "info@progreso.com"),
	(4, "Libreria Tivoli", "info@tivoli.com"),
	(5, "Distribuidora el Caribe", "info@delcaribe.com");

INSERT INTO proveedor_has_producto VALUES
	(1, 5),
    (2, 5),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 2),
    (5, 3);