CREATE OR REPLACE FUNCTION notify_realtime() 
	RETURNS trigger as $BODY$
		BEGIN
		PERFORM pg_notify('new_notify', NEW.id::varchar);
		RETURN NULL;
		END;
	$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER updated_realtime_trigger AFTER INSERT ON event
FOR EACH ROW EXECUTE PROCEDURE notify_realtime();