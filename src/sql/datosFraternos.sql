INSERT INTO `users` (`firstName`, `lastName`, `email`, `phone`, `address`, `password`, `image`, `admin`)
VALUES
('Mateo', 'Díaz', 'mateo.diaz@example.com', '1234567890', 'Calle Falsa 123', '$2a$10$ffZfJ9tRmZt5tsSm6cFzLeyIMhjAuLqwRupQczZSa5pDC8JeOHviO', '/images/users/G7favicon.svg', 1),
('Camila', 'Suárez', 'camila.suarez@example.com', '0987654321', 'Avenida Siempre Viva 456', 'password456', '/images/users/G7favicon.svg', 1),
('Lucas', 'Pereira', 'lucas.pereira@example.com', '1122334455', 'Boulevard de los Sueños 789', 'password789', '/images/users/G7favicon.svg', 0),
('Sofía', 'Gómez', 'sofia.gomez@example.com', '5566778899', 'Plaza de la Constitución 101', 'password101', '/images/users/G7favicon.svg', 0),
('Valentín', 'Rossi', 'valentin.rossi@example.com', '6677889900', 'Paseo de la Reforma 202', 'password202', '/images/users/G7favicon.svg', 0),
('Martina', 'López', 'martina.lopez@example.com', '7788990011', 'Camino Real 303', 'password303', '/images/users/G7favicon.svg', 0),
('Tomás', 'Fernández', 'tomas.fernandez@example.com', '8899001122', 'Calle de la Paz 404', 'password404', '/images/users/G7favicon.svg', 0),
('Florencia', 'Martínez', 'florencia.martinez@example.com', '9900112233', 'Callejón del Beso 505', 'password505', '/images/users/G7favicon.svg', 0),
('Nicolás', 'Ramírez', 'nicolas.ramirez@example.com', '1010101010', 'Camino al Cielo 606', 'password606', '/images/users/G7favicon.svg', 0),
('Isabella', 'Sánchez', 'isabella.sanchez@example.com', '1212121212', 'Avenida del Sol 707', 'password707', '/images/users/G7favicon.svg', 0);

INSERT INTO `products` (`name`, `description`, `price`, `category`, `size`, `ingredients`, `image`, `suitability`, `stock`)
VALUES
-- Sánguches
('Sanguche de Milanesa', 'Milanesa de carne con lechuga, tomate y mayonesa en pan francés', 6000, 'sanguche', 'Grande', 'Carne, Pan Francés, Lechuga, Tomate, Mayonesa', '/images/products/sanguche_milanesa.jpg', 'Carnívoro', 20),
('Sanguche de Jamón y Queso', 'Jamón y queso derretido en pan baguette', 4000, 'sanguche', 'Mediano', 'Jamón, Queso, Pan Baguette', '/images/products/sanguche_jamon_queso.jpg', 'Sin Gluten', 30),
('Sanguche de Pollo', 'Pollo a la plancha con lechuga, tomate y salsa tártara en pan integral', 5500, 'sanguche', 'Mediano', 'Pollo, Pan Integral, Lechuga, Tomate, Salsa Tártara', '/images/products/sanguche_pollo.jpg', 'Sin Lactosa', 25),
('Sanguche Vegetariano', 'Variedad de vegetales asados con queso feta en pan de centeno', 5000, 'sanguche', 'Grande', 'Vegetales Asados, Queso Feta, Pan de Centeno', '/images/products/sanguche_vegetariano.jpg', 'Vegetariano', 15),
('Sanguche de Lomito', 'Lomo a la parrilla con queso, lechuga, tomate y huevo en pan de campo', 7000, 'sanguche', 'Grande', 'Lomo, Queso, Lechuga, Tomate, Huevo, Pan de Campo', '/images/products/sanguche_lomito.jpg', 'Carnívoro', 18),
('Sanguche Caprese', 'Mozzarella fresca, tomate y albahaca en pan de ciabatta', 4500, 'sanguche', 'Mediano', 'Mozzarella, Tomate, Albahaca, Pan de Ciabatta', '/images/products/sanguche_caprese.jpg', 'Vegetariano', 22),
('Sanguche de Bondiola', 'Bondiola de cerdo con cebolla caramelizada y mostaza en pan francés', 6500, 'sanguche', 'Grande', 'Bondiola, Cebolla Caramelizada, Mostaza, Pan Francés', '/images/products/sanguche_bondiola.jpg', 'Carnívoro', 20),
('Sanguche de Pastrami', 'Pastrami con pepinillos y mostaza en pan de centeno', 8000, 'sanguche', 'Grande', 'Pastrami, Pepinillos, Mostaza, Pan de Centeno', '/images/products/sanguche_pastrami.jpg', 'Carnívoro', 12),
('Sanguche de Atún', 'Atún, lechuga, tomate y mayonesa en pan de molde integral', 5000, 'sanguche', 'Mediano', 'Atún, Lechuga, Tomate, Mayonesa, Pan Integral', '/images/products/sanguche_atun.jpg', 'Pescetariano', 25),
('Sanguche de Mortadela', 'Mortadela con queso provolone, rúcula y tomate en pan de campo', 5500, 'sanguche', 'Grande', 'Mortadela, Queso Provolone, Rúcula, Tomate, Pan de Campo', '/images/products/sanguche_mortadela.jpg', 'Carnívoro', 30),

-- Bebidas
('Coca-Cola', 'Refresco gaseoso sabor cola en botella de 500ml', 500, 'bebida', '500ml', 'Agua carbonatada, Azúcar, Colorante, Saborizante, Cafeína', '/images/products/default.png', 'Apto para todos', 50),
('Jugo de Naranja', 'Jugo de naranja natural sin azúcar añadida', 700, 'bebida', '350ml', 'Naranja fresca', '/images/products/default.png', 'Vegano', 30),
('Agua Mineral', 'Agua mineral sin gas en botella de 500ml', 400, 'bebida', '500ml', 'Agua mineral', '/images/products/default.png', 'Apto para todos', 40),

-- Snacks
('Papas Fritas', 'Papas fritas crujientes', 300, 'snack', '50g', 'Papas, Sal, Aceite vegetal', '/images/products/default.png', 'Apto para todos', 100),
('Maní Salado', 'Maní tostado con sal', 250, 'snack', '100g', 'Maní, Sal', '/images/products/default.png', 'Apto para todos', 80),
('Barra de Cereal', 'Barra de cereal con frutas secas', 350, 'snack', '40g', 'Cereal, Frutas secas, Miel', '/images/products/default.png', 'Vegetariano', 60),
('Galletitas de Queso', 'Galletitas horneadas sabor queso', 400, 'snack', '100g', 'Harina, Queso, Manteca', '/images/products/default.png', 'Vegetariano', 50),
('Mix de Frutos Secos', 'Mezcla de almendras, nueces y pasas', 600, 'snack', '150g', 'Almendras, Nueces, Pasas', '/images/products/default.png', 'Vegano', 40),

-- Postres
('Brownie', 'Brownie de chocolate con nueces', 800, 'postre', 'Porción', 'Chocolate, Harina, Manteca, Nueces', '/images/products/default.png', 'Vegetariano', 20),
('Torta de Zanahoria', 'Torta de zanahoria con cobertura de queso crema', 900, 'postre', 'Porción', 'Zanahoria, Harina, Azúcar, Queso crema', '/images/products/default.png', 'Vegetariano', 15);

INSERT INTO `carts` (`products_id`, `users_id`, `amount`)
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