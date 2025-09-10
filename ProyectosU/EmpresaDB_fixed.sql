IF DB_ID(N'EmpresaDB') IS NULL
BEGIN
    CREATE DATABASE [EmpresaDB];
END
GO

USE [EmpresaDB]
GO

USE [master]
GO


/****** Object:  Database [EmpresaDB]    Script Date: 6/09/2025 12:12:03 ******/

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EmpresaDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO


USE [EmpresaDB]
GO


/****** Object:  Table [dbo].[Empleados]    Script Date: 6/09/2025 12:12:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[Puesto] [nvarchar](100) NULL,
	[Edad] [int] NULL,
	[Salario] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [master]
GO
USE [EmpresaDB];
GO

INSERT INTO dbo.Empleados (Nombre, Puesto, Edad, Salario)
VALUES
(N'Ana López',        N'Gerente de Ventas',     35, 8500.00),
(N'Carlos Pérez',     N'Desarrollador Senior',  30, 7200.00),
(N'Lucía Martínez',   N'Diseñadora Gráfica',    27, 5600.00),
(N'Marco Ramírez',    N'Analista de Datos',     32, 6100.00),
(N'Fernanda Torres',  N'Recursos Humanos',      29, 5000.00),
(N'José Hernández',   N'Soporte Técnico',       25, 4200.00),
(N'Paula González',   N'Contadora',             34, 6800.00),
(N'Andrés Castillo',  N'Desarrollador Junior',  23, 3800.00),
(N'María Sánchez',    N'Project Manager',       38, 9000.00),
(N'Roberto Díaz',     N'Administrador de Redes',31, 6400.00);
GO


SELECT * FROM dbo.Empleados;
