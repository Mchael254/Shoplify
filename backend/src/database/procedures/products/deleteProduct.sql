
--use Shopie
CREATE or alter PROCEDURE deleteProduct
    @productID VARCHAR(350)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @deleteResult INT;

    -- Check if the product exists
    IF NOT EXISTS (SELECT 1 FROM Products WHERE productID = @productID)
    BEGIN
        -- Product does not exist
        SET @deleteResult = -1;
    END
    ELSE
    BEGIN
        -- Delete the product
        DELETE FROM Products WHERE productID = @productID;
        SET @deleteResult = 1;
    END

    -- Return the result
    SELECT @deleteResult AS deleteResult;
END

-- use Shopie