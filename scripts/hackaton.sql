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


CREATE OR REPLACE FUNCTION notify_realtime() 
	RETURNS trigger as $BODY$
BEGIN
	PERFORM pg_notify('new_notify',(NEW.description,', ', NEW.time_stamp,
									(SELECT c.name FROM camera c 
									 WHERE NEW.camera_id = c.id)::varchar)::varchar);
	RETURN NULL;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER updated_realtime_trigger AFTER INSERT ON event
FOR EACH ROW EXECUTE PROCEDURE notify_realtime();
