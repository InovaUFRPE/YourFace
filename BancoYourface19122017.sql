-- ----------------------------
-- Table structure for tb_aluno
-- ----------------------------
DROP TABLE IF EXISTS `tb_aluno`;
CREATE TABLE `tb_aluno` (
  `idaluno` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `curso` varchar(255) COLLATE utf8_bin NOT NULL,
  `dataNascimento` date NOT NULL,
  `ativo` enum('true','false') COLLATE utf8_bin DEFAULT 'true',
  `cpf` varchar(12) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`cpf`,`idaluno`),
  KEY `id` (`idaluno`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for tb_coord
-- ----------------------------
DROP TABLE IF EXISTS `tb_coord`;
CREATE TABLE `tb_coord` (
  `idcoord` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `cpf` varchar(40) COLLATE utf8_bin NOT NULL,
  `password` varchar(41) COLLATE utf8_bin NOT NULL,
  `ativo` enum('true','false') COLLATE utf8_bin DEFAULT 'true',
  `email` varchar(200) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idcoord`,`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for tb_prof
-- ----------------------------
DROP TABLE IF EXISTS `tb_prof`;
CREATE TABLE `tb_prof` (
  `idprof` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(41) COLLATE utf8_bin NOT NULL,
  `ativo` enum('true','false') COLLATE utf8_bin DEFAULT 'true',
  `cpf` varchar(12) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`cpf`,`idprof`),
  KEY `id` (`idprof`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for tb_turmas
-- ----------------------------
DROP TABLE IF EXISTS `tb_turmas`;
CREATE TABLE `tb_turmas` (
  `idturma` int(11) NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(255) NOT NULL,
  `professor_turma` int(11) NOT NULL,
  `ativo` enum('true','false') NOT NULL DEFAULT 'true',
  PRIMARY KEY (`idturma`),
  KEY `professor` (`professor_turma`),
  CONSTRAINT `professor` FOREIGN KEY (`professor_turma`) REFERENCES `tb_prof` (`idprof`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tb_turmas_alunos
-- ----------------------------
DROP TABLE IF EXISTS `tb_turmas_alunos`;
CREATE TABLE `tb_turmas_alunos` (
  `idlista` int(11) NOT NULL AUTO_INCREMENT,
  `turma` int(11) DEFAULT NULL,
  `aluno` int(11) DEFAULT NULL,
  PRIMARY KEY (`idlista`),
  KEY `alunoporturma` (`aluno`),
  KEY `saberturma` (`turma`),
  CONSTRAINT `alunoporturma` FOREIGN KEY (`aluno`) REFERENCES `tb_aluno` (`idaluno`),
  CONSTRAINT `saberturma` FOREIGN KEY (`turma`) REFERENCES `tb_turmas` (`idturma`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tb_freq
-- ----------------------------
DROP TABLE IF EXISTS `tb_freq`;
CREATE TABLE `tb_freq` (
  `idfreq` int(11) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `turma_freq` int(11) NOT NULL,
  `aluno_freq` int(11) NOT NULL,
  `presenca` enum('true','false') NOT NULL DEFAULT 'true',
  PRIMARY KEY (`idfreq`),
  KEY `aluno` (`aluno_freq`),
  KEY `turma` (`turma_freq`),
  CONSTRAINT `aluno` FOREIGN KEY (`aluno_freq`) REFERENCES `tb_aluno` (`idaluno`),
  CONSTRAINT `turma` FOREIGN KEY (`turma_freq`) REFERENCES `tb_turmas` (`idturma`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;


-- ----------------------------
-- Procedure structure for AbrirTurma
-- ----------------------------
DROP PROCEDURE IF EXISTS `AbrirTurma`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AbrirTurma`(IN idturma INTEGER)
BEGIN

DECLARE v_aluno INTEGER;

DECLARE cur1 CURSOR FOR SELECT aluno FROM tb_turmas_alunos WHERE turma = idturma;

OPEN cur1;

LOOP

	FETCH cur1 INTO v_aluno;
	
	INSERT INTO tb_freq (data,turma_freq,aluno_freq,presenca) VALUES (NOW(),idturma,v_aluno,2);

END LOOP;

CLOSE cur1;

END
;;
DELIMITER ;
SET FOREIGN_KEY_CHECKS=1;
