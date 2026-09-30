# MOBILAI — Supabase Database Architecture

This directory contains the database migration scripts, seeds, and Row Level Security (RLS) definitions for the MOBILAI platform.

## Tables Overview

1. `profiles`: User profile data linked directly to `auth.users(id)`. Auto-provisioned via database trigger on signup.
2. `traffic_data`: Monitored arterial corridor status (speed, congestion percentage, vehicle count, level).
3. `routes`: History of user route optimizations, carbon emission estimates, and AI reasoning.
4. `traffic_predictions`: Forward-looking hourly traffic congestion and AI confidence forecasts.
5. `mobility_recommendations`: Multimodal transit recommendations tailored to trip distance and traffic conditions.
6. `alerts`: Active city incidents, green wave corridor notices, and transit alerts with severity indicators.
7. `eco_stats`: Quantified CO2 savings, fuel saved, and breakdown of green trips (walking, cycling, public transit).
8. `mobility_activity`: Comprehensive audit log of user route and modal choice actions.

## Row Level Security (RLS)

- **Public Access**: `traffic_data`, `traffic_predictions`, and active `alerts` are accessible to unauthenticated and authenticated users so public dashboards can render ambient conditions.
- **Protected User Data**: `profiles`, `routes`, `mobility_recommendations`, `eco_stats`, and `mobility_activity` enforce `auth.uid() = user_id`, guaranteeing cross-tenant isolation.
- **Service Role**: Backend processes equipped with the secret key can perform privileged administrative updates when syncing real-time sensors.

## Applying Migrations

You can apply the schema directly via the Supabase Dashboard SQL Editor or via the Supabase CLI:

```bash
# Using Supabase CLI
supabase db push

# Or execute migrations/001_create_mobilai_schema.sql in the SQL Editor
```

## Seeding Data

Execute `seed.sql` in the Supabase SQL Editor or through the CLI:

```bash
supabase db reset
```
