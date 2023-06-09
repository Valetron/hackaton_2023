CREATE TABLE IF NOT EXISTS camera
(
	id serial PRIMARY KEY,
	name varchar(24) NOT NULL,
	processDelay int DEFAULT 5,
	link varchar(255) NOT NULL,
	areas text
);

CREATE TABLE IF NOT EXISTS event 
(
	id serial PRIMARY KEY,
	camera_id int,
	description text NOT NULL,
	time_stamp timestamp DEFAULT current_timestamp,
	photo bytea NOT NULL,
	FOREIGN KEY(camera_id) REFERENCES camera(id)
);

CREATE TABLE IF NOT EXISTS trace_point
(
	id serial PRIMARY KEY,
	camera_id int NOT NULL,
	x int NOT NULL,
	y int NOT NULL,
	time_stamp timestamp DEFAULT current_timestamp,
	FOREIGN KEY(camera_id) REFERENCES camera(id)
);

CREATE OR REPLACE FUNCTION notify_realtime() 
	RETURNS trigger as $BODY$
		BEGIN
		PERFORM pg_notify('add_event',(NEW.description, NEW.time_stamp,
			(SELECT c.name FROM camera c WHERE NEW.camera_id = c.id), NEW.photo)::varchar);
		RETURN NULL;
		END;
	$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER updated_realtime_trigger_event AFTER INSERT ON event
FOR EACH ROW EXECUTE PROCEDURE notify_realtime();

CREATE OR REPLACE FUNCTION camera_realtime() 
	RETURNS trigger as $BODY$
		BEGIN
		PERFORM pg_notify('add_camera', NEW.id::varchar);
		RETURN NULL;
		END;
	$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER updated_realtime_trigger_camera AFTER INSERT ON camera
FOR EACH ROW EXECUTE PROCEDURE camera_realtime();