CREATE TABLE IF NOT EXISTS camera
(
	id serial PRIMARY KEY,
	name varchar(24) NOT NULL UNIQUE,
	processing_period int DEFAULT 19,
	stream varchar(255) NOT NULL UNIQUE,
	areas text
);

CREATE TABLE IF NOT EXISTS event 
(
	id serial PRIMARY KEY,
	camera_id int,
	description text NOT NULL,
	time_stamp timestamp NOT NULL,
	photo text NOT NULL,
	FOREIGN KEY(camera_id) REFERENCES camera(id)
);

