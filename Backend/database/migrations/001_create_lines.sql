CREATE DATABASE LisSystem;

CREATE TABLE dbo.Lines (
    Id_L           INT IDENTITY(1,1) CONSTRAINT PK_Lines PRIMARY KEY,
    Code_L         NVARCHAR(50)  NOT NULL CONSTRAINT UQ_Lines_Code UNIQUE,
    Name_L         NVARCHAR(100) NOT NULL,
    HourlyTarget_L INT           NOT NULL CONSTRAINT CK_Lines_HourlyTarget CHECK (HourlyTarget_L > 0),
    MachineTag_L   NVARCHAR(50)  NOT NULL,
    IsActive_L     BIT           NOT NULL CONSTRAINT DF_Lines_IsActive DEFAULT 1,
    CreatedAt_L    DATETIME2     NOT NULL CONSTRAINT DF_Lines_CreatedAt DEFAULT SYSUTCDATETIME()
);