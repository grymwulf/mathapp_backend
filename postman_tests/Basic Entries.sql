USE mathapp;
INSERT INTO teachers VALUES(1, "John", "Doe");
INSERT INTO teachers VALUES(2, "James", "Cruz");
INSERT INTO teachers VALUES(3, "Jessica", "White");
INSERT INTO students VALUES(1, "Jane", "Smith", 1, 3 , "+", 1);
INSERT INTO students VALUES(2, "Jeff", "Robinson", 2, 7, "+", 1);
INSERT INTO students VALUES(3, "Jake", "Smith", 3, 9, "-", 1);
INSERT INTO students VALUES(4, "Jen", "Stanley", 0, 14, "/", 2);
INSERT INTO students VALUES(5, "Joaquin", "Garcia", 1, 6, "*", 2);
INSERT INTO students VALUES(6, "Juan", "Doe", 2, 3, "/", 2);
INSERT INTO tests VALUES(1, 0, 2, 3, "+", 1, 1);
INSERT INTO tests VALUES(2, 0, 2, 7, "+", 1, 1);
INSERT INTO results VALUES(1, "00:00:00", 1);
INSERT INTO results VALUES(2, "10:00:00", 1);
INSERT INTO results VALUES(3, "00:00:00", 2);
INSERT INTO results VALUES(4, "10:00:00", 2);
INSERT INTO answers VALUES(1, 4, 1, "+", 3, 1, 1);
INSERT INTO answers VALUES(2, 5, 1, "+", 3, 2, 1);
INSERT INTO answers VALUES(3, 7, 0, "+", 3, 3, 1);
INSERT INTO answers VALUES(4, 7, 1, "+", 3, 4, 1);
INSERT INTO answers VALUES(5, 9, 0, "+", 3, 5, 1);
INSERT INTO answers VALUES(6, 4, 1, "+", 3, 1, 2);
INSERT INTO answers VALUES(7, 4, 0, "+", 3, 2, 2);
INSERT INTO answers VALUES(8, 6, 1, "+", 3, 3, 2);
INSERT INTO answers VALUES(9, 8, 0, "+", 3, 4, 2);