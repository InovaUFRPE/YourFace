-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Jan-2018 às 13:01
-- Versão do servidor: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yourface`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `dataNascimento` date NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `cpf` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`name`, `email`, `curso`, `dataNascimento`, `ativo`, `cpf`, `password`, `created_at`, `updated_at`) VALUES
('ulysses', 'ulysses@ulysses', 'bsi', '2122-02-22', 1, '08126454482', '$2a$10$QrHntQfcCnNJfqqaFTLSWuYq3/M68GwoVXBAN8MRHXpD7ifYDv21W', '2017-12-19 17:07:02', '2017-12-19 17:07:02');

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
('admin', 'erico@gmail.com', '$2a$10$oq5TMqysf8fMFvleGQmQGeGfkT9yZpMoCP4JYZlXxAjWLSVJ/derC', 1, '123', '2017-12-18 23:08:27', '2017-12-18 23:08:27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `frequencia`
--

CREATE TABLE `frequencia` (
  `id_freq` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `cpf_aluno` varchar(255) NOT NULL,
  `presenca` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `frequencia`
--

INSERT INTO `frequencia` (`id_freq`, `data`, `cpf_aluno`, `presenca`, `created_at`, `updated_at`) VALUES
(1, '2017-12-19 06:00:00', '08126454482', 1, '2017-12-19 00:00:00', '2017-12-19 00:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `frequencia_turma_aluno`
-- (See below for the actual view)
--
CREATE TABLE `frequencia_turma_aluno` (
`name` varchar(255)
,`cpf` varchar(255)
,`presenca` tinyint(1)
,`data` datetime
,`id_freq` int(11)
,`name_turma` varchar(255)
);

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
('ana', 'ana@ana', '$2a$10$WeD2F9mUvc.wnH66hw/VOe1kU2zyRD.2wrFE.arp1agEtoP7.yjsy', 1, '11111111111', '2017-12-19 17:06:12', '2017-12-19 17:06:12');

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas_alunos`
--

CREATE TABLE `turmas_alunos` (
  `id_turmas_alunos` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL,
  `cpf_aluno` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `frequencia_turma_aluno`
--
DROP TABLE IF EXISTS `frequencia_turma_aluno`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `frequencia_turma_aluno`  AS  select `aluno`.`name` AS `name`,`aluno`.`cpf` AS `cpf`,`frequencia`.`presenca` AS `presenca`,`frequencia`.`data` AS `data`,`frequencia`.`id_freq` AS `id_freq`,`turmas`.`name_turma` AS `name_turma` from (((`frequencia` left join `aluno` on((`frequencia`.`cpf_aluno` = `aluno`.`cpf`))) left join `turmas_alunos` on((`frequencia`.`cpf_aluno` = `turmas_alunos`.`cpf_aluno`))) left join `turmas` on((`turmas_alunos`.`id_turma` = `turmas`.`id_turma`))) ;

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
-- Indexes for table `frequencia`
--
ALTER TABLE `frequencia`
  ADD PRIMARY KEY (`id_freq`),
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
-- AUTO_INCREMENT for table `frequencia`
--
ALTER TABLE `frequencia`
  MODIFY `id_freq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `turmas_alunos`
--
ALTER TABLE `turmas_alunos`
  MODIFY `id_turmas_alunos` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `frequencia`
--
ALTER TABLE `frequencia`
  ADD CONSTRAINT `frequencia_ibfk_1` FOREIGN KEY (`cpf_aluno`) REFERENCES `aluno` (`cpf`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
