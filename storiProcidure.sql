BEGIN

BEGIN

DECLARE v_aluno varchar(255);

DECLARE cur1 CURSOR FOR SELECT cpf_aluno FROM turmas_alunos WHERE id_turma = idturma;

OPEN cur1;

LOOP

	FETCH cur1 INTO v_aluno;
	
	INSERT INTO frequencia (data,id_turma,cpf_aluno,presenca,created_at,updated_at) VALUES (NOW(),idturma,v_aluno,0,now(),now());

END LOOP;

CLOSE cur1;

END