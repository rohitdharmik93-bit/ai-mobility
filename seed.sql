-- MOBILAI — Realistic Seed Data
-- Clear existing data
DELETE FROM public.traffic_data;
DELETE FROM public.alerts;
DELETE FROM public.traffic_predictions;

-- Seed traffic_data with Nagpur arterial locations
INSERT INTO public.traffic_data (location, traffic_level, congestion_percentage, average_speed, vehicle_count, recorded_at) VALUES
('Sitabuldi', 'heavy', 82, 18.0, 2430, now()),
('Sadar', 'moderate', 56, 28.5, 1540, now()),
('Civil Lines', 'low', 28, 42.0, 720, now()),
('Wardha Road', 'heavy', 74, 22.0, 2180, now()),
('Hingna', 'moderate', 49, 33.0, 1250, now()),
('Dharampeth', 'low', 31, 39.5, 890, now()),
('Airport Road', 'moderate', 51, 35.0, 1420, now());

-- Seed alerts
INSERT INTO public.alerts (title, description, severity, location, is_active, created_at) VALUES
('Heavy traffic detected on Wardha Road', 'High vehicle density and intersection delays near Ajni flyover. Expect +12 mins delay.', 'warning', 'Wardha Road', true, now() - interval '15 minutes'),
('Accident-related congestion reported', 'Collision near Sitabuldi Square cleared from main carriageway; residual tailbacks remain for 1.2 km.', 'critical', 'Sitabuldi', true, now() - interval '42 minutes'),
('Alternative green corridor active', 'Civil Lines corridor running freely with synchronised smart signals at 45 km/h progression.', 'info', 'Civil Lines', true, now() - interval '2 hours'),
('Metro frequency increased on Orange Line', 'Rapid transit services operating every 5 mins during peak evening transit to alleviate road congestion.', 'success', 'Airport Road', true, now() - interval '3 hours'),
('Traffic expected to decrease after 7:30 PM', 'Historical evening curve indicates rapid congestion drop across Sadar Bazar and Residency Road.', 'info', 'Sadar', true, now() - interval '30 minutes');

-- Seed traffic predictions (forward-looking 6 hours)
INSERT INTO public.traffic_predictions (location, prediction_time, traffic_level, congestion_percentage, confidence, created_at) VALUES
('Sitabuldi', now() + interval '1 hour', 'heavy', 85, 0.94, now()),
('Sitabuldi', now() + interval '2 hours', 'moderate', 64, 0.91, now()),
('Sitabuldi', now() + interval '3 hours', 'moderate', 48, 0.88, now()),
('Sitabuldi', now() + interval '4 hours', 'low', 29, 0.93, now()),
('Sitabuldi', now() + interval '5 hours', 'low', 22, 0.95, now()),
('Sitabuldi', now() + interval '6 hours', 'low', 18, 0.96, now()),

('Wardha Road', now() + interval '1 hour', 'heavy', 78, 0.92, now()),
('Wardha Road', now() + interval '2 hours', 'moderate', 59, 0.89, now()),
('Wardha Road', now() + interval '3 hours', 'low', 35, 0.95, now()),
('Wardha Road', now() + interval '4 hours', 'low', 24, 0.96, now()),

('Civil Lines', now() + interval '1 hour', 'low', 26, 0.96, now()),
('Civil Lines', now() + interval '2 hours', 'low', 22, 0.97, now()),
('Civil Lines', now() + interval '3 hours', 'low', 19, 0.98, now()),

('Sadar', now() + interval '1 hour', 'moderate', 52, 0.90, now()),
('Sadar', now() + interval '2 hours', 'low', 34, 0.92, now());
