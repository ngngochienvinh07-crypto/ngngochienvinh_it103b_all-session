CREATE database SS3B3;

USE SS3B3;

CREATE TABLE CUSTOMERS (
	CustomerID INT PRIMARY KEY auto_increment, -- IDENTITY(1,1) đoạn này gây lỗi nên tạm thay bằng auto_increment
	FullName VARCHAR(100),
	Email VARCHAR(100),
	City VARCHAR(50),
	LastPurchaseDate DATE,
	Status_CUSTOMER VARCHAR(20),
	Gender VARCHAR(10),
	Date0fBirth DATE,
	Points INT,
	Address VARCHAR(255)
);

INSERT INTO CUSTOMERS (FullName, Email, City, LastPurchaseDate, Status_CUSTOMER)
VALUES
	('Nguyen Văn A', 'anv@gmail.com', 'Hà Nội', '2025-05-20', 'Active' ),
	('Trần Thị B', 'btt@gmail.com', 'Hà Nội', '2026-02-10', 'Active' ),
	('Lê Văn C', NULL, 'Hà Nội', '2025-01-15', 'Active' ),
	('Phạm Minh D', 'dpm@gmail.com', 'Hà Nội', '2024-12-01', 'Locked' ),
	('Hoàng An E', 'eha@gmail.com', 'TP HCM', '2025-03-01', 'Active' );

SELECT FullName, Email 	-- SELECT * sẽ lấy những dữ liệu không cần thiểt
FROM CUSTOMERS
WHERE City = 'Hà Nội'	-- ở hà nội
  AND LastPurchaseDate <= '2025-10-01'		-- >6 tháng tính từ 01/04/2026
  AND Email IS NOT NULL		-- không trống email
  AND Status = 'Active';	-- tài khoản còn hoạt động