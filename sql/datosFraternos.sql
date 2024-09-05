INSERT INTO `users` (`firstName`, `lastName`, `email`, `phone`, `address`, `password`, `image`)
VALUES
('Mateo', 'Díaz', 'mateo.diaz@example.com', '1234567890', 'Calle Falsa 123', 'password123', 'mateo.jpg'),
('Camila', 'Suárez', 'camila.suarez@example.com', '0987654321', 'Avenida Siempre Viva 456', 'password456', 'camila.jpg'),
('Lucas', 'Pereira', 'lucas.pereira@example.com', '1122334455', 'Boulevard de los Sueños 789', 'password789', 'lucas.jpg'),
('Sofía', 'Gómez', 'sofia.gomez@example.com', '5566778899', 'Plaza de la Constitución 101', 'password101', 'sofia.jpg'),
('Valentín', 'Rossi', 'valentin.rossi@example.com', '6677889900', 'Paseo de la Reforma 202', 'password202', 'valentin.jpg'),
('Martina', 'López', 'martina.lopez@example.com', '7788990011', 'Camino Real 303', 'password303', 'martina.jpg'),
('Tomás', 'Fernández', 'tomas.fernandez@example.com', '8899001122', 'Calle de la Paz 404', 'password404', 'tomas.jpg'),
('Florencia', 'Martínez', 'florencia.martinez@example.com', '9900112233', 'Callejón del Beso 505', 'password505', 'florencia.jpg'),
('Nicolás', 'Ramírez', 'nicolas.ramirez@example.com', '1010101010', 'Camino al Cielo 606', 'password606', 'nicolas.jpg'),
('Isabella', 'Sánchez', 'isabella.sanchez@example.com', '1212121212', 'Avenida del Sol 707', 'password707', 'isabella.jpg');


INSERT INTO `products` (`name`, `description`, `price`, `category`, `size`, `ingredients`, `image`, `suitability`, `stock`)
VALUES
('Sanguche de Milanesa', 'Milanesa de carne con lechuga, tomate y mayonesa en pan francés', 600, 'Sanguches', 'Grande', 'Carne, Pan Francés, Lechuga, Tomate, Mayonesa', 'sanguche_milanesa.jpg', 'Carnívoro', 20),
('Sanguche de Jamón y Queso', 'Jamón y queso derretido en pan baguette', 400, 'Sanguches', 'Mediano', 'Jamón, Queso, Pan Baguette', 'sanguche_jamon_queso.jpg', 'Sin Gluten', 30),
('Sanguche de Pollo', 'Pollo a la plancha con lechuga, tomate y salsa tártara en pan integral', 550, 'Sanguches', 'Mediano', 'Pollo, Pan Integral, Lechuga, Tomate, Salsa Tártara', 'sanguche_pollo.jpg', 'Sin Lactosa', 25),
('Sanguche Vegetariano', 'Variedad de vegetales asados con queso feta en pan de centeno', 500, 'Sanguches', 'Grande', 'Vegetales Asados, Queso Feta, Pan de Centeno', 'sanguche_vegetariano.jpg', 'Vegetariano', 15),
('Sanguche de Lomito', 'Lomo a la parrilla con queso, lechuga, tomate y huevo en pan de campo', 700, 'Sanguches', 'Grande', 'Lomo, Queso, Lechuga, Tomate, Huevo, Pan de Campo', 'sanguche_lomito.jpg', 'Carnívoro', 18),
('Sanguche Caprese', 'Mozzarella fresca, tomate y albahaca en pan de ciabatta', 450, 'Sanguches', 'Mediano', 'Mozzarella, Tomate, Albahaca, Pan de Ciabatta', 'sanguche_caprese.jpg', 'Vegetariano', 22),
('Sanguche de Bondiola', 'Bondiola de cerdo con cebolla caramelizada y mostaza en pan francés', 650, 'Sanguches', 'Grande', 'Bondiola, Cebolla Caramelizada, Mostaza, Pan Francés', 'sanguche_bondiola.jpg', 'Carnívoro', 20),
('Sanguche de Pastrami', 'Pastrami con pepinillos y mostaza en pan de centeno', 800, 'Sanguches', 'Grande', 'Pastrami, Pepinillos, Mostaza, Pan de Centeno', 'sanguche_pastrami.jpg', 'Carnívoro', 12),
('Sanguche de Atún', 'Atún, lechuga, tomate y mayonesa en pan de molde integral', 500, 'Sanguches', 'Mediano', 'Atún, Lechuga, Tomate, Mayonesa, Pan Integral', 'sanguche_atun.jpg', 'Pescetariano', 25),
('Sanguche de Mortadela', 'Mortadela con queso provolone, rúcula y tomate en pan de campo', 550, 'Sanguches', 'Grande', 'Mortadela, Queso Provolone, Rúcula, Tomate, Pan de Campo', 'sanguche_mortadela.jpg', 'Carnívoro', 30);


INSERT INTO `cart` (`products_id`, `users_id`, `amount`)
VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 1),
(5, 5, 2),
(6, 6, 4),
(7, 7, 1),
(8, 8, 2),
(9, 9, 3),
(10, 10, 1);