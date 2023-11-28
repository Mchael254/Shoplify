CREATE PROCEDURE deleteProduct
    @productID VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @deleteResult INT;

    -- Check if the product exists
    IF NOT EXISTS (SELECT 1 FROM Products WHERE ProductID = @productID)
    BEGIN
        -- Product does not exist
        SET @deleteResult = -1;
    END
    ELSE
    BEGIN
        -- Delete the product
        DELETE FROM Products WHERE ProductID = @productID;
        SET @deleteResult = 1;
    END

    -- Return the result
    SELECT @deleteResult AS deleteResult;
END

-- use Shopie