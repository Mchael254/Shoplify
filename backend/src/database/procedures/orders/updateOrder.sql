CREATE PROCEDURE updateOrderStatus
    @orderId VARCHAR(300),
    @status VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the order status
    UPDATE Orders SET status = @status WHERE orderId = @orderId;
END


-- use Shopie
