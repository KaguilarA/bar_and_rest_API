DELIMITER $$

---------------------------------
------------- Users -------------
---------------------------------

CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT `id`, `name`, `username`, `email`, `state` FROM `users`;
END$$

CREATE PROCEDURE GetUserById(IN p_id INT)
BEGIN
    SELECT `id`, `name`, `username`, `email`, `state` FROM `users` WHERE `id` = p_id;
END$$

CREATE PROCEDURE CreateUser(
    IN p_name VARCHAR(100),
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_state INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM `users` WHERE `username` = p_username) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Username already exists';
    ELSE
        INSERT INTO `users` (`name`, `username`, `password`, `state`)
        VALUES (p_name, p_username, SHA2(p_password, 256), p_state);
    END IF;
END$$

CREATE PROCEDURE UpdateUser(
    IN p_user_id INT,
    IN p_username VARCHAR(100),
    IN p_email VARCHAR(100)
)
BEGIN
    UPDATE `users`
    SET `username` = p_username, `email` = p_email
    WHERE `id` = p_user_id;
END$$

CREATE PROCEDURE DeleteUser(IN p_id INT)
BEGIN
    UPDATE `users`
    SET `state` = 0
    WHERE `id` = p_id;
END$$

--------------------------------
----------- Products -----------
--------------------------------

CREATE PROCEDURE GetAllProducts()
BEGIN
    SELECT * FROM `products`;
END$$

CREATE PROCEDURE GetProductById(IN p_id INT)
BEGIN
    SELECT * FROM `products` WHERE `id` = p_id;
END$$

CREATE PROCEDURE GetProductsByType(IN p_type INT)
BEGIN
    DECLARE product_type VARCHAR(100);

    IF p_type = 0 THEN
        SET product_type = 'bebida botella de vidrio';
    ELSEIF p_type = 1 THEN
        SET product_type = 'bebida enlatada';
    ELSEIF p_type = 2 THEN
        SET product_type = 'platillo o boca';
    ELSEIF p_type = 3 THEN
        SET product_type = 'snack';
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid product type';
    END IF;

    SELECT `id`, `name`, `type`, `stock`, `price`
    FROM `products`
    WHERE `type` = product_type;
END$$

CREATE PROCEDURE CreateProduct(
    IN p_name VARCHAR(100),
    IN p_type ENUM('bebida botella de vidrio', 'bebida enlatada', 'platillo o boca', 'snack'),
    IN p_stock INT,
    IN p_price DECIMAL(10, 2)
)
BEGIN
    INSERT INTO `products` (`name`, `type`, `stock`, `price`)
    VALUES (p_name, p_type, p_stock, p_price);
END$$

CREATE PROCEDURE UpdateProduct(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_type INT,
    IN p_stock INT,
    IN p_price DECIMAL(10,2)
)
BEGIN
    UPDATE `products`
    SET `name` = p_name, `type` = p_type, `stock` = p_stock, `price` = p_price
    WHERE `id` = p_id;
END$$

CREATE PROCEDURE UpdateProductStock(
    IN p_product_id INT,
    IN p_stock_change INT
)
BEGIN
    DECLARE current_stock INT;

    SELECT `stock` INTO current_stock
    FROM `products`
    WHERE `id` = p_product_id;

    IF current_stock + p_stock_change >= 0 THEN
        UPDATE `products`
        SET `stock` = `stock` + p_stock_change
        WHERE `id` = p_product_id;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock cannot be negative';
    END IF;
END$$

CREATE PROCEDURE DeleteProduct(IN p_id INT)
BEGIN
    DELETE FROM `products` WHERE `id` = p_id;
END$$

--------------------------------
----------- Invoices -----------
--------------------------------

CREATE PROCEDURE GetAllInvoices()
BEGIN
    SELECT * FROM `invoices`;
END$$

CREATE PROCEDURE GetInvoiceById(IN p_id INT)
BEGIN
    SELECT * FROM `invoices` WHERE `id` = p_id;
END$$

CREATE PROCEDURE CalculateInvoiceTotal(IN p_invoice_id INT)
BEGIN
    DECLARE total DECIMAL(10, 2) DEFAULT 0.00;

    SELECT SUM(P.price * PBI.quantity) INTO total
    FROM `products_by_invoice` PBI
    JOIN `products` P ON P.id = PBI.product_id
    WHERE PBI.invoice_id = p_invoice_id;

    SELECT total AS totalAmount;
END$$

CREATE PROCEDURE CreateInvoice(
    IN p_date DATETIME,
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO `invoices` (`date`, `name`)
    VALUES (p_date, p_name);
END$$

--------------------------------
----- Products by Invoices -----
--------------------------------

CREATE PROCEDURE AddProductToInvoice(
    IN p_invoice_id INT,
    IN p_product_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE current_stock INT;

    SELECT `stock` INTO current_stock
    FROM `products`
    WHERE `id` = p_product_id;

    IF current_stock >= p_quantity THEN
        START TRANSACTION;

        UPDATE `products`
        SET `stock` = `stock` - p_quantity
        WHERE `id` = p_product_id;

        INSERT INTO `products_by_invoice` (`invoice_id`, `product_id`, `quantity`)
        VALUES (p_invoice_id, p_product_id, p_quantity);

        COMMIT;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock for this product';
    END IF;
END$$

CREATE PROCEDURE UpdateProductsByInvoiceQuantity(
    IN p_invoice_id INT,
    IN p_product_id INT,
    IN p_new_quantity INT
)
BEGIN
    DECLARE current_quantity INT;
    DECLARE stock_difference INT;
    DECLARE current_stock INT;

    SELECT `quantity` INTO current_quantity
    FROM `products_by_invoice`
    WHERE `invoice_id` = p_invoice_id AND `product_id` = p_product_id;

    SET stock_difference = current_quantity - p_new_quantity;

    SELECT `stock` INTO current_stock
    FROM `products`
    WHERE `id` = p_product_id;

    IF current_stock + stock_difference >= 0 THEN
        START TRANSACTION;

        UPDATE `products_by_invoice`
        SET `quantity` = p_new_quantity
        WHERE `invoice_id` = p_invoice_id AND `product_id` = p_product_id;

        UPDATE `products`
        SET `stock` = `stock` + stock_difference
        WHERE `id` = p_product_id;

        COMMIT;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock cannot be negative';
    END IF;
END$$

DELIMITER ;