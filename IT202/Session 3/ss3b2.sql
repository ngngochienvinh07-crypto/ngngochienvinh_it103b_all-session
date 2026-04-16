CREATE database SS3B2;

USE SS3B2;

CREATE TABLE SHIPPERS (
    ShipperID INT PRIMARY KEY AUTO_INCREMENT,
    ShipperName VARCHAR(255),
    Phone VARCHAR(20)
);

INSERT INTO SHIPPERS (ShipperName, Phone)
VALUES ('Giao Hàng Nhanh', '0901234567'); -- THIẾU DẤU ' Ở CƯỚI GIAO HÀNG NAHNH

INSERT INTO SHIPPERS (ShipperName, Phone)	-- THIẾU DỮ LIỆU BAN ĐẦU KHÔNG CÓ (ShipperName, Phone)
VALUES ('Viettel Post', '0987654321');


