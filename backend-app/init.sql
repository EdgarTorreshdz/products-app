CREATE DATABASE PortfolioDB;
GO

USE PortfolioDB;
GO

-- Aquí tus tablas iniciales (ejemplo)
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
GO