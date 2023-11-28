CREATE TABLE Orders (
    orderId VARCHAR(300) PRIMARY KEY,
    productID VARCHAR(300),  -- Assuming this is a foreign key referencing the Products table
    quantity INT,
    address VARCHAR(500),
    status VARCHAR(50) DEFAULT 'Pending',  -- You can set a default value
    -- Add additional columns as needed for order-related information
    -- For example, datePlaced, dateShipped, dateDelivered, etc.
);

-- Assuming productID is a foreign key referencing the Products table
ALTER TABLE Orders
ADD CONSTRAINT FK_Order_Product FOREIGN KEY (productID)
REFERENCES Products(productID);



use Shopie

select * from Products