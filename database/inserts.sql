INSERT INTO users () 
VALUES	(default, 'Patricia', 'Felix', 'patricia@email.com', '11 99999-9999', '1234', '/img/patriciafelix.jpg'),
		(default, 'Paula', 'de Pinho', 'paula@email.com', '11 99999-9999', '1234', '/img/pauladepinho.jpg'),
		(default, 'Andeilso', 'Alves', 'andeilso@email.com', '11 99999-9999', '1234', '/img/andeilsoalves.jpg'),
        (default, 'João', 'de Oliveira da Silva Santos', 'joao@email.com', '11 99999-9999', '1234', '/img/joaodeoliveira.jpg');

INSERT INTO schools ()
VALUES	(default, 'RJ', 'Niteroi', 'Colégio Pedro II', 6.0, 4),
		(default, 'SP', 'Barueri', 'Jose Ephim Mindlin Senai', 6.5, 4),
        (default, 'MS', 'Campo Grande', 'Arco-Iris e Alfa - Colégio de EIEF', 5.5, 3);
        
INSERT INTO users_schools ()
VALUES (default, 4, 3);    

INSERT INTO classes ()
VALUES (default, 2, '1° A', 28, 1, 1);
    
INSERT INTO users_classes()
VALUES (default, 4, 1, 2, 17);

INSERT INTO courses()
VALUES 	(default, 'Artes'),
		(default, 'Biologia'),
		(default, 'Ciências'),
		(default, 'Educação Física'),
		(default, 'Filosofia'),
		(default, 'Física'),
		(default, 'Geografia'),
		(default, 'Geometria'),
		(default, 'História'),
		(default, 'Literatura'),
		(default, 'Matemática'),
		(default, 'Música'),
		(default, 'Língua Espanhola'),
		(default, 'Língua Francesa'),
		(default, 'Língua Inglesa'),
		(default, 'Língua Portuguesa'),
		(default, 'Química'),
		(default, 'Redação'),
		(default, 'Sociologia'),
		(default, 'Teatro');

INSERT INTO users_courses ()
VALUES (default, 4, 11);

INSERT INTO classes_courses ()
VALUES (default, 1, 11);

INSERT INTO evaluations ()
VALUES (default, 1, 3, 10, 'Algoritmos', '#fe539b', null, '2020-05-09', 4);

INSERT INTO evaluations_users ()
VALUES (default, 1, 4, 1, 7.5);

INSERT INTO attendances ()
VALUES (default, 4, 1, 11, 'present', 0, '2020-05-09', 4);

INSERT INTO userTypes () 
VALUES 	(default, 'teacher'),
		(default, 'guardian');

INSERT INTO users_userTypes ()
VALUES (default, 4, 2);