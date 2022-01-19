-- -----------------------------------------------------
-- SEQUENCES CREATION
-- -----------------------------------------------------
CREATE SEQUENCE codigo_estudiante
start with 202244140
increment by 1
minvalue 202200000
maxvalue 203000000
no cycle;
CREATE SEQUENCE codigo_CURSO
start with 2711
increment by 100
minvalue 2700
maxvalue 9000
no cycle;


-- -----------------------------------------------------
-- Table ADMINISTRADOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ADMINISTRADOR (
  idADMINISTRADOR SERIAL NOT NULL,
  nombre_admin VARCHAR(45) NOT NULL,
  contrasena VARCHAR(45) NOT NULL,
  PRIMARY KEY (idADMINISTRADOR))
;


-- -----------------------------------------------------
-- Table SEDE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS SEDE (
  idSEDE SERIAL NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  ADMINISTRADOR_idADMINISTRADOR INT NOT NULL,
  PRIMARY KEY (idSEDE),
  CONSTRAINT fk_SEDE_ADMINISTRADOR
    FOREIGN KEY (ADMINISTRADOR_idADMINISTRADOR)
    REFERENCES ADMINISTRADOR (idADMINISTRADOR)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- -----------------------------------------------------
-- Table EPS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS EPS (
  idEPS SERIAL NOT NULL,
  nombre_eps VARCHAR(45) NOT NULL,
  PRIMARY KEY (idEPS))
;


-- -----------------------------------------------------
-- Table ARL
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ARL (
  idARL SERIAL NOT NULL,
  nombre_arl VARCHAR(45) NOT NULL,
  PRIMARY KEY (idARL))
;


-- -----------------------------------------------------
-- Table PERSONAL
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PERSONAL (
  idPERSONAL SERIAL NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido_paterno VARCHAR(45) NOT NULL,
  apellido_materno VARCHAR(45) NOT NULL,
  direccion VARCHAR(45) NOT NULL,
  salario INT NOT NULL,
  contrasena VARCHAR(45) NOT NULL,
  SEDE_idSEDE INT NOT NULL,
  EPS_ideps INT NOT NULL,
  ARL_idarl INT NOT NULL,
  PRIMARY KEY (idPERSONAL), 
  CONSTRAINT fk_PERSONAL_SEDE1
    FOREIGN KEY (SEDE_idSEDE)
    REFERENCES SEDE (idSEDE)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PERSONAL_eps1
    FOREIGN KEY (EPS_ideps)
    REFERENCES EPS (idEPS)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PERSONAL_arl1
    FOREIGN KEY (ARL_idarl)
    REFERENCES ARL (idARL)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table PROFESOR
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PROFESOR (
  idPROFESOR INT NOT NULL,
  PERSONAL_idPERSONAL INT NOT NULL,
  PRIMARY KEY (idPROFESOR),
  CONSTRAINT fk_PROFESOR_PERSONAL1
    FOREIGN KEY (PERSONAL_idPERSONAL)
    REFERENCES PERSONAL (idPERSONAL)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table ESTUDIANTE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ESTUDIANTE (
  idESTUDIANTE INTEGER NOT NULL DEFAULT NEXTVAL(‘codigo_estudiante’),
  direccion_estudiante VARCHAR(45) NOT NULL,
  contrasena VARCHAR(45) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido_paterno VARCHAR(45) NOT NULL,
  apellido_materno VARCHAR(45) NOT NULL,
SEDE_idSEDE INT NOT NULL,
  PRIMARY KEY (idESTUDIANTE),
CONSTRAINT fk_ESTUDIANTE_SEDE
FOREIGN KEY(SEDE_idSEDE)
REFERENCES SEDE (idSEDE)
ON DELETE NO ACTION
ON UPDATE NO ACTION
)
;


-- -----------------------------------------------------
-- Table CURSO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CURSO (
  idCURSO INTEGER NOT NULL DEFAULT NEXTVAL(‘codigo_curso’),
  nombre_materia VARCHAR(45) NOT NULL,
  PROFESOR_idPROFESOR INT NULL DEFAULT ‘404’,
  SEDE_idSEDE INT NOT NULL,
  PRIMARY KEY (idCURSO),
  CONSTRAINT fk_CURSO_PROFESOR1
    FOREIGN KEY (PROFESOR_idPROFESOR)
    REFERENCES PROFESOR (idPROFESOR)	
    ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT fk_CURSO_SEDE
FOREIGN KEY (SEDE_idSEDE)
REFERENCES SEDE (idSEDE)
ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table DETALLES_ESTUDIANTE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DETALLES_ESTUDIANTE (
  idDETALLES_ESTUDIANTE SERIAL NOT NULL,
  cantidadMinimaMatriculas INT NULL,
  ESTUDIANTE_idESTUDIANTE INT NOT NULL,
  PRIMARY KEY (idDETALLES_ESTUDIANTE),
  CONSTRAINT fk_DETALLES_ESTUDIANTE_ESTUDIANTE1
    FOREIGN KEY (ESTUDIANTE_idESTUDIANTE)
    REFERENCES ESTUDIANTE (idESTUDIANTE)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table MATRICULA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MATRICULA (
  CURSO_idCURSO INT NOT NULL,
  ESTUDIANTE_idESTUDIANTE INT NOT NULL,
  PRIMARY KEY (CURSO_idCURSO, ESTUDIANTE_idESTUDIANTE),
  CONSTRAINT fk_ESTUDIANTE_has_CURSO_CURSO1
    FOREIGN KEY (CURSO_idCURSO)
    REFERENCES CURSO (idCURSO)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_MATRICULA_ESTUDIANTE
    FOREIGN KEY (ESTUDIANTE_idESTUDIANTE)
    REFERENCES ESTUDIANTE (idESTUDIANTE)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;
-- -----------------------------------------------------
-- Table ASISTENCIA_ESTUDIANTE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ASISTENCIA_ESTUDIANTES (
  idASISTENCIA SERIAL NOT NULL,
  hora VARCHAR(6) NOT NULL,
  dia VARCHAR(3) NOT NULL,
  mes VARCHAR(3) NOT NULL,
  anio VARCHAR(5) NOT NULL,
  SEDE_idSEDE INT NOT NULL,
  ESTUDIANTE_idESTUDIANTE INT NOT NULL,
  PRIMARY KEY (idASISTENCIA),
  CONSTRAINT fk_ASISTENCIA_SEDE1
    FOREIGN KEY (SEDE_idSEDE)
    REFERENCES SEDE (idSEDE)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ASISTENCIA_ESTUDIANTE1
    FOREIGN KEY (ESTUDIANTE_idESTUDIANTE)
    REFERENCES ESTUDIANTE (idESTUDIANTE)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;
-- -----------------------------------------------------
-- Table ASISTENCIA_PERSONAL
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ASISTENCIA_PERSONAL(
  idASISTENCIA SERIAL NOT NULL,
  hora VARCHAR(6) NOT NULL,
  dia VARCHAR(3) NOT NULL,
  mes VARCHAR(3) NOT NULL,
  anio VARCHAR(5) NOT NULL,
  SEDE_idSEDE INT NOT NULL,
  PERSONAL_idPERSONAL INT NOT NULL,
  PRIMARY KEY (idASISTENCIA),
  CONSTRAINT fk_ASISTENCIA_SEDE1
    FOREIGN KEY (SEDE_idSEDE)
    REFERENCES SEDE (idSEDE)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ASISTENCIA_PERSONAL1
    FOREIGN KEY (PERSONAL_idPERSONAL)
    REFERENCES PERSONAL (idPERSONAL)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;

--USUARIOS DE PRUEBA
--ADMINISTRADOR
INSERT INTO ADMINISTRADOR(nombre_admin, contrasena) VALUES (‘admin’, ‘12345’);
--DATOS DE LA SEDE MELENDEZ
INSERT INTO SEDE(nombre, ADMINISTRADOR_idADMINISTRADOR) VALUES (‘Melendez’, ‘1’);
--DATOS DE LA SEDE SAN FERNANDO
INSERT INTO SEDE(nombre, ADMINISTRADOR_idADMINISTRADOR) VALUES (‘San fernando’, ‘1’);
--DATOS DE EPS Y ARL
INSERT INTO EPS(nombre_eps) VALUES (‘Cafesalud’);
INSERT INTO EPS(nombre_eps) VALUES (‘Salud Colmena’);
INSERT INTO EPS(nombre_eps) VALUES (‘Salud Total’);
INSERT INTO ARL(nombre_arl) VALUES(‘Sura’);
INSERT INTO ARL(nombre_arl) VALUES(‘Positiva’);
INSERT INTO ARL(nombre_arl) VALUES(‘Colpatria’);
--INFO PARA PERSONAL
--En sede Melendez
INSERT INTO PERSONAL (nombre, apellido_paterno, apellido_materno, direccion, salario, contrasena, SEDE_idSEDE, EPS_ideps, ARL_idarl) VALUES(‘Mariana’, ‘Pajon’, ‘Oro’, ‘crra 4 c Norte #71 F40’, ‘3000000’, ‘12345’, ‘1’, ‘1’, ‘1’ );
INSERT INTO PROFESOR (idPROFESOR, PERSONAL_idPERSONAL) VALUES (‘1006010721’, ‘1’);
INSERT INTO PERSONAL (nombre, apellido_paterno, apellido_materno, direccion, salario, contrasena, SEDE_idSEDE, EPS_ideps, ARL_idarl) VALUES(‘Jhonny’, ‘Bravo’, ‘Arnaldo’, ‘crra 5 c Norte #71 F40’, ‘700000’, ‘12345’, ‘1’, ‘2’, ‘3’ );
INSERT INTO PROFESOR (idPROFESOR, PERSONAL_idPERSONAL) VALUES (‘66977543’, ‘2’);
--En sede San Fernando
INSERT INTO PERSONAL (nombre, apellido_paterno, apellido_materno, direccion, salario, contrasena, SEDE_idSEDE, EPS_ideps, ARL_idarl) VALUES(‘Rambo’, ‘Shuacheneger’, ‘Prado’, ‘crra 4 c Norte #71 F40’, ‘900000’, ‘12345’, ‘2’, ‘3’, ‘3’ );
INSERT INTO PROFESOR (idPROFESOR, PERSONAL_idPERSONAL) VALUES (‘1365429870’, ‘3’);
INSERT INTO PERSONAL (nombre, apellido_paterno, apellido_materno, direccion, salario, contrasena, SEDE_idSEDE, EPS_ideps, ARL_idarl) VALUES(‘Jhon’, ‘Frey’, ‘Kennedy’, ‘crra 9 c Norte #2 C20’, ‘1200000’, ‘12345’, ‘2’, ‘2’, ‘3’ );
INSERT INTO PROFESOR (idPROFESOR, PERSONAL_idPERSONAL) VALUES (‘1332931760’, ‘4’);


--DATOS SOBRE LOS CURSOS
--Sede Melendez
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘matematicas’, ‘1006010721’, ‘1’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘sociales’, ‘1006010721’, ‘1’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘Biologia’, ‘66977543’, ‘1’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘Quimica’, ‘66977543’, ‘1’);
--Sede San Fernando
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘matematicas’, ‘1365429870’, ‘2’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘sociales’, ‘1365429870’, ‘2’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘Biologia’, ‘1332931760’, ‘2’);
INSERT INTO CURSO(nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES(‘Quimica’, ‘1332931760’, ‘2’);
--DATOS DE LOS ESTUDIANTES
--sede melendez
INSERT INTO ESTUDIANTE (direccion_estudiante, contrasena, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE) VALUES(‘Avenida 2 Norte #10 – 70’, ‘12345’, ‘Andres’, ‘Camargo’, ‘Arcos’, ‘1’);
INSERT INTO ESTUDIANTE (direccion_estudiante, contrasena, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE) VALUES(‘Avenida 3 Norte #20 – 80’, ‘12345’, ‘Ingrid’, ‘Echeverry’, ‘Montoya’, ‘1’);
--sede san fernando
INSERT INTO ESTUDIANTE (direccion_estudiante, contrasena, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE) VALUES(‘Avenida 4 Norte #30 – 90’, ‘12345’, ‘Jean’, ‘Pierre’, ‘Cardenas’, ‘2’);
INSERT INTO ESTUDIANTE (direccion_estudiante, contrasena, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE) VALUES(‘Avenida 5 Norte #40 – 10’, ‘12345’, ‘Jan’, ‘Perez’, ‘Umbarila’, ‘2’);


