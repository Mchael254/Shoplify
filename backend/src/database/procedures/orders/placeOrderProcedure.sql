CREATE PROCEDURE createOrder
    @productID VARCHAR(300),
    @Quantity INT,
    @address VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the product exists and has enough quantity available
    IF NOT EXISTS (SELECT 1 FROM Products WHERE productID = @productID)
    BEGIN
        -- Product does not exist
        RETURN -1;
    END
    ELSE IF (SELECT Quantity FROM Products WHERE productID = @productID) < @Quantity
    BEGIN
        -- Insufficient quantity available
        RETURN -2;
    END
    ELSE
    BEGIN
        -- Deduct the quantity from the product inventory
        UPDATE Products SET Quantity = Quantity - @Quantity WHERE productID = @productId;

        -- Insert the order
        INSERT INTO Orders (orderID, productID, quantity, address, status)
        VALUES (NEWID(), @productID, @Quantity, @address, 'Pending');

        RETURN 1;
    END
END


-- USE Shopie