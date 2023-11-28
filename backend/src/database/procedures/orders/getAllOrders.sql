CREATE PROCEDURE getAllOrders
AS
BEGIN
    SET NOCOUNT ON;

    -- Get all orders
    SELECT * FROM Orders;
END


-- use Shopie