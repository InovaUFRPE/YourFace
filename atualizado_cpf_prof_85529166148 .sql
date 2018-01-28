-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 28-Jan-2018 às 02:02
-- Versão do servidor: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yourface`
--
CREATE DATABASE IF NOT EXISTS `yourface` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `yourface`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AbrirTurma` (IN `idturma` INT)  BEGIN

DECLARE v_aluno varchar(255);

DECLARE cur1 CURSOR FOR SELECT cpf_aluno FROM turmas_alunos WHERE id_turma = idturma;

OPEN cur1;

LOOP

	FETCH cur1 INTO v_aluno;
	
	INSERT INTO frequencia (data,id_turma,cpf_aluno,presenca,created_at,updated_at) VALUES (NOW(),idturma,v_aluno,0,now(),now());

END LOOP;

CLOSE cur1;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `cpf` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `dataNascimento` date NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`cpf`, `name`, `email`, `curso`, `dataNascimento`, `ativo`, `password`, `created_at`, `updated_at`) VALUES
('07136887429', 'erico', 'erico@gmail.com', '5', '1985-10-19', 1, '$2a$10$biLnKJpw35o7nIdVG1Y7YuSigMTUPcj/Z/RjtC713jT0Y0zzDh4cW', '2018-01-13 13:52:03', '2018-01-13 13:52:03'),
('83294569602', 'pedrinho', 'pedrinho@pedrinho', '3', '2018-01-17', 1, '$2a$10$biLnKJpw35o7nIdVG1Y7YuSigMTUPcj/Z/RjtC713jT0Y0zzDh4cW', '2018-01-25 00:00:00', '2018-01-23 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `coordenador`
--

CREATE TABLE `coordenador` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `cpf` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `coordenador`
--

INSERT INTO `coordenador` (`name`, `email`, `password`, `ativo`, `cpf`, `created_at`, `updated_at`) VALUES
('erico', '07136887429', '$2a$10$iv2Hz8OupNkf9f0UMhy68OW9Odl/zo78GfAj6ZAs/7K42EEQ7USEa', 1, '07136887429', '2018-01-28 00:26:49', '2018-01-28 00:26:49'),
('admin', 'admin@admin', '$2a$10$biLnKJpw35o7nIdVG1Y7YuSigMTUPcj/Z/RjtC713jT0Y0zzDh4cW', 1, '123', '2018-01-10 00:11:01', '2018-01-10 00:11:01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `desconhecidos`
--

CREATE TABLE `desconhecidos` (
  `id` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `id_foto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `frequencia`
--

CREATE TABLE `frequencia` (
  `id_freq` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `id_turma` int(11) DEFAULT NULL,
  `cpf_aluno` varchar(255) DEFAULT NULL,
  `presenca` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE `professor` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `cpf` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`name`, `email`, `password`, `ativo`, `cpf`, `created_at`, `updated_at`) VALUES
('Joao Almeida', 'Joaoalmeida@ufpe.br', '$2a$10$ASy17E6nnQ/lxo5Kc4hi..AI1y.kEKY.BAPD7KSHGqpGFgirZ4cmm', 1, '85529166148', '2018-01-27 23:26:12', '2018-01-27 23:26:12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE `turmas` (
  `id_turma` int(11) NOT NULL,
  `name_turma` varchar(255) NOT NULL,
  `cpf_prof` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`id_turma`, `name_turma`, `cpf_prof`, `created_at`, `updated_at`) VALUES
(10, 'Quimica', '85529166148', '2018-01-27 23:26:34', '2018-01-27 23:26:34'),
(13, 'Fisica', '85529166148', '2018-01-28 00:59:04', '2018-01-28 00:59:04');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas_alunos`
--

CREATE TABLE `turmas_alunos` (
  `id_turmas_alunos` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL,
  `cpf_aluno` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turmas_alunos`
--

INSERT INTO `turmas_alunos` (`id_turmas_alunos`, `id_turma`, `cpf_aluno`, `created_at`, `updated_at`) VALUES
(4, 10, '07136887429', '2018-01-27 00:00:00', '2018-01-27 00:00:00'),
(5, 10, '83294569602', '2018-01-27 00:00:00', '2018-01-27 00:00:00'),
(6, 13, '07136887429', '2018-01-27 00:00:00', '2018-01-27 00:00:00'),
(7, 13, '83294569602', '2018-01-27 00:00:00', '2018-01-27 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`cpf`);

--
-- Indexes for table `coordenador`
--
ALTER TABLE `coordenador`
  ADD PRIMARY KEY (`cpf`);

--
-- Indexes for table `desconhecidos`
--
ALTER TABLE `desconhecidos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequencia`
--
ALTER TABLE `frequencia`
  ADD PRIMARY KEY (`id_freq`),
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `cpf_aluno` (`cpf_aluno`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`cpf`);

--
-- Indexes for table `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id_turma`),
  ADD KEY `cpf_prof` (`cpf_prof`);

--
-- Indexes for table `turmas_alunos`
--
ALTER TABLE `turmas_alunos`
  ADD PRIMARY KEY (`id_turmas_alunos`),
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `cpf_aluno` (`cpf_aluno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `desconhecidos`
--
ALTER TABLE `desconhecidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `frequencia`
--
ALTER TABLE `frequencia`
  MODIFY `id_freq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `turmas_alunos`
--
ALTER TABLE `turmas_alunos`
  MODIFY `id_turmas_alunos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `frequencia`
--
ALTER TABLE `frequencia`
  ADD CONSTRAINT `frequencia_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`),
  ADD CONSTRAINT `frequencia_ibfk_2` FOREIGN KEY (`cpf_aluno`) REFERENCES `aluno` (`cpf`);

--
-- Limitadores para a tabela `turmas`
--
ALTER TABLE `turmas`
  ADD CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`cpf_prof`) REFERENCES `professor` (`cpf`);

--
-- Limitadores para a tabela `turmas_alunos`
--
ALTER TABLE `turmas_alunos`
  ADD CONSTRAINT `turmas_alunos_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`),
  ADD CONSTRAINT `turmas_alunos_ibfk_2` FOREIGN KEY (`cpf_aluno`) REFERENCES `aluno` (`cpf`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
