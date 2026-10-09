USE LisSystem;
GO

CREATE TABLE dbo.Roles (
    Id   INT IDENTITY(1,1) CONSTRAINT PK_Roles PRIMARY KEY,
    Code NVARCHAR(20) NOT NULL CONSTRAINT UQ_Roles_Code UNIQUE,
    Name NVARCHAR(50) NOT NULL
);

INSERT INTO dbo.Roles (Code, Name) VALUES
    ('ADMIN', 'Administrador'),
    ('SUPERVISOR', 'Supervisor'),
    ('TECNICO', 'Técnico'),
    ('OPERADOR', 'Operador');

CREATE TABLE dbo.Users (
    Id             INT IDENTITY(1,1) CONSTRAINT PK_Users PRIMARY KEY,
    EmployeeNumber NVARCHAR(20)  NOT NULL CONSTRAINT UQ_Users_EmployeeNumber UNIQUE,
    Name           NVARCHAR(100) NOT NULL,
    RoleId         INT           NOT NULL CONSTRAINT FK_Users_Roles REFERENCES dbo.Roles(Id),
    PasswordHash   NVARCHAR(100) NULL,
    IsActive       BIT           NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
    CreatedAt      DATETIME2     NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT SYSUTCDATETIME()
);