INSERT INTO users (account_locked, created_date, email, enable)
VALUES (true, CURRENT_TIMESTAMP, 'mockUser@example.xp', false);

INSERT INTO exercises (created_by, created_date, exercise_type, is_default, name, user_id) VALUES
(1, CURRENT_TIMESTAMP, 0, true, 'Bench press', 1),
(1, CURRENT_TIMESTAMP, 1, true, 'Chest supported row', 1);