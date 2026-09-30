# MOBILAI — AI for Smart Mobility

> **Tagline:** Smarter Routes. Better Cities.

MOBILAI is a production-ready, full-stack smart mobility intelligence platform designed to predict urban traffic congestion, calculate optimal multi-modal routes, reduce carbon footprints, and empower city planners and daily commuters with explainable AI routing.

Built for the **College Hackathon Demonstration** with production-level architecture, Supabase PostgreSQL, Row Level Security (RLS), and resilient demo/offline fallback.

---

## 1. Project Overview

Rapid metropolitan urbanization has created unprecedented traffic bottlenecks, increased idle fuel consumption, and escalated vehicular carbon emissions. MOBILAI solves this by deploying a distributed sensor fusion model and a multi-factor AI routing engine that evaluates speed telemetry, intersection saturation, and emissions across arterial corridors in real time.

### Pipeline

```text
Traffic Data (Sensors & Corridors)
         ↓
    AI Analysis
         ↓
  Traffic Prediction (Diurnal Curves)
         ↓
  Route Optimization (Multi-Factor Scoring)
         ↓
Smart Mobility Recommendation (Multimodal Shift)
         ↓
Reduced Travel Time + Lower Emissions
```

---

## 2. Problem Statement

* **Severe Urban Congestion**: Conventional mapping platforms frequently funnel thousands of vehicles into the same secondary corridors, exacerbating gridlock.
* **Lack of Multimodal Cost/Carbon Transparency**: Commuters lack side-by-side visibility into transit alternatives (Metro, bus, cycling, walking) factoring in real-world road congestion.
* **Unpredictable Bottleneck Windows**: Commuters cannot easily anticipate peak congestion onset 2 to 6 hours ahead of departure.
* **Environmental Degradation**: Urban idling burns millions of liters of fuel unnecessarily without quantified feedback.

---

## 3. The MOBILAI Solution

MOBILAI bridges the gap between smart city infrastructure telemetry and commuter navigation by providing:

1. **AI Route Scoring**: Replaces raw distance heuristics with a composite weighted cost function including speed degradation factors, arterial signal synchronization, and idle carbon emissions.
2. **Predictive Diurnal Congestion Modeling**: Forecasts upcoming congestion percentages 6 hours ahead using historical diurnal curves and peak modifiers.
3. **Smart Multimodal Comparison**: Compares personal vehicle, two-wheeler, public transit (Metro/Rapid bus), and active mobility (walking/cycling) with cost, time, and emission metrics.
4. **Eco Mobility Ledger**: Quantifies fuel saved, CO₂ abated, and green trips completed.
5. **Real-time Traffic & Incident Feeds**: Provides active notices on smart corridors, accidents, and synchronized green-wave signal progression.

---

## 4. Key Features

* **Intelligent Urban Command Center**: High-level telemetry displaying city mobility score (87/100), active corridor saturation, and average trip delays.
* **Interactive Simulated City Map**: SVG-based smart city mesh featuring monitored corridors across Nagpur (Sitabuldi, Sadar, Civil Lines, Wardha Road, Hingna, Dharampeth, Airport Road) with live status badges and Metro Orange Line route overlay.
* **Forward-Looking Diurnal Predictor**: Interactive Recharts Area visualizations detailing hourly congestion progression and peak warnings.
* **Multimodal Decision Matrix**: Dynamic distance slider with instant cost, time, and carbon tradeoff calculation.
* **Supabase Authentication**: Secure email/password login and registration with automatic profile provisioning.
* **1-Click Hackathon Evaluation Mode**: Instant guest session for hackathon judges allowing complete system evaluation without third-party email confirmation dependencies.
* **Resilient Demo Fallback Layer**: If external APIs or database connections are unavailable, the platform seamlessly defaults to realistic, deterministic simulation data.

---

## 5. How AI Works

The core intelligence layer in `backend/services/aiService.js` operates on mathematical heuristics and deterministic urban models:

### 1. Multi-Factor Route Scoring Function

$$\text{Route Score} = (w_{\text{time}} \cdot T_{\text{eff}}) + (w_{\text{cong}} \cdot C_{\text{factor}}) + (w_{\text{co2}} \cdot E_{\text{kg}}) + M_{\text{penalty}}$$

Where:
* $T_{\text{eff}}$: Effective travel time calculated from mode baseline velocity degraded exponentially by corridor congestion ($S_{\text{eff}} = S_{\text{base}} \cdot (1 - \frac{\text{Congestion}}{140})$).
* $C_{\text{factor}}$: Arterial intersection queuing and stop-and-go penalty.
* $E_{\text{kg}}$: Carbon emission calculated per vehicle mode ($0.171\text{ kg/km}$ for petrol car, $0.032\text{ kg/km}$ for metro).
* $M_{\text{penalty}}$: Road network curvature and mode efficiency factor.

### 2. Forward Diurnal Traffic Prediction

Generates hourly congestion forecasts based on:
* **Day-of-Week Factor**: $1.18\times$ on Fridays, $1.12\times$ on Mondays, $0.72\times$ on Sundays.
* **Diurnal Rush-Hour Curves**: Morning commute (8:00–10:30 AM, $1.35\times$), midday plateau (12:00–2:00 PM, $1.05\times$), evening rush (5:00–7:30 PM, $1.42\times$), and off-peak night flow ($0.35\times$).
* **Confidence Metric**: Dynamically decayed over forecast steps ($97\% \to 89\%$).

### 3. Multimodal Recommendation Engine

Evaluates the Pareto frontier across Car, Motorcycle, City Bus, Metro, and Walking:
* For distances $> 3.5\text{ km}$, walking is penalized.
* In heavy traffic ($> 65\%$), grade-separated Metro/Rapid corridors are favored, saving ~15 mins and abating ~78% of trip emissions.

---

## 6. Technology Stack

### Frontend
* **React 18** with **Vite**
* **Tailwind CSS** (Custom dark futuristic theme, neon accents, glassmorphic panels)
* **React Router v6** (Protected route guards, authenticated layout wrapper)
* **Lucide React** (Accessible vector iconography)
* **Recharts** (Area charts, bar charts, and modal distribution pie charts)
* **Axios** (JWT interceptors and centralized API client)
* **@supabase/supabase-js** (Client-side Supabase authentication)

### Backend
* **Node.js** & **Express.js** REST API
* **@supabase/supabase-js** (Server-side privileged database client)
* **CORS & Morgan** (Configurable origin policy and HTTP request logging)
* **Modular Architecture**: Controllers, Services, Middleware, Validators, and Demo Data layers

### Database
* **Supabase PostgreSQL**
* **Row Level Security (RLS)** with granular policies
* **Database Triggers** (Auto-provisioning `profiles` and `eco_stats` on user signup)
* **B-tree Indexes** on corridors, user IDs, and timestamps

---

## 7. Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   React + Vite (Frontend)              │
│       Tailwind CSS · Recharts · Lucide · AuthContext    │
└───────────────────────────┬────────────────────────────┘
                            │ REST API + Bearer JWT
                            ▼
┌────────────────────────────────────────────────────────┐
│               Node.js + Express (Backend API)          │
│                                                        │
│  [Middleware]                                          │
│   ├── authMiddleware (Supabase Token Verification)     │
│   ├── validationMiddleware                             │
│   └── errorMiddleware (Sanitized Error Delivery)       │
│                                                        │
│  [Services]                                            │
│   ├── aiService (Routing, Prediction, Multimodal)      │
│   ├── trafficService (Arterial Corridor Feeds)         │
│   ├── routeService (Persistence & History)             │
│   ├── mobilityService (Comparative Matrix)             │
│   └── ecoService (Carbon Offsets & Trends)             │
└───────────────────────────┬────────────────────────────┘
                            │ SQL & RLS Queries
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Supabase PostgreSQL 17                 │
│                                                        │
│  • profiles                   • mobility_recommendations│
│  • traffic_data               • alerts                 │
│  • routes                     • eco_stats              │
│  • traffic_predictions        • mobility_activity      │
└────────────────────────────────────────────────────────┘
```

---

## 8. Database Schema

The database consists of 8 normalized relational tables:

1. **`profiles`**: User details linked directly to `auth.users(id)`.
2. **`traffic_data`**: Sensor telemetry (`location`, `traffic_level`, `congestion_percentage`, `average_speed`, `vehicle_count`).
3. **`routes`**: User route optimization log (`source`, `destination`, `mode`, `recommended_route`, `alternative_route`, `distance_km`, `estimated_time_minutes`, `co2_kg`, `reason`).
4. **`traffic_predictions`**: Forward predictions (`location`, `prediction_time`, `traffic_level`, `congestion_percentage`, `confidence`).
5. **`mobility_recommendations`**: Multimodal recommendations (`user_id`, `distance_km`, `recommended_mode`, `travel_time_minutes`, `estimated_cost`, `co2_kg`).
6. **`alerts`**: Incident and corridor notifications (`title`, `description`, `severity`, `location`, `is_active`).
7. **`eco_stats`**: User carbon accounting (`co2_saved_kg`, `fuel_saved_liters`, `green_trips`, `public_transport_trips`, `walking_trips`, `cycling_trips`).
8. **`mobility_activity`**: Audit log of user modal shifts and route choices.

---

## 9. Supabase Setup & Migrations

### Apply Migrations

To apply the schema migrations, run the SQL script located in `supabase/migrations/001_create_mobilai_schema.sql` in the Supabase SQL Editor:

```sql
-- Creates all 8 tables, enables RLS, creates policies and triggers
\i supabase/migrations/001_create_mobilai_schema.sql
```

### Seed Demo Data

Run `supabase/seed.sql` to populate realistic traffic data, active alerts, and predictions:

```sql
\i supabase/seed.sql
```

---

## 10. Environment Variables

Create `.env` files in both `frontend` and `backend` using the provided `.env.example` templates.

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_anon_key
```

> **Security Note**: Never place `SUPABASE_SECRET_KEY` in frontend environment variables.

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Server-Side Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your_supabase_service_role_key

# Optional
AI_API_KEY=
DEMO_MODE=false
```

---

## 11. Installation

Clone the repository and install root and package dependencies:

```bash
git clone https://github.com/your-org/mobilai.git
cd mobilai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 12. Local Development

Run the backend server and frontend development server in separate terminals:

### Terminal 1: Backend API

```bash
cd backend
npm run dev
# Server listening at http://localhost:5000
```

### Terminal 2: Frontend App

```bash
cd frontend
npm run dev
# Vite server running at http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

---

## 13. API Endpoints

All responses follow a uniform JSON schema:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health & environment check | No |
| `GET` | `/api/dashboard` | Aggregated mobility score, traffic status, and activity | Optional |
| `GET` | `/api/traffic` | Live telemetry for all monitored corridors | No |
| `GET` | `/api/traffic/:location` | Live telemetry for a specific corridor node | No |
| `POST` | `/api/route/optimize` | Compute multi-factor route scoring | Optional |
| `POST` | `/api/traffic/predict` | 6-hour forward congestion curve prediction | No |
| `POST` | `/api/mobility/recommend` | Multimodal comparison matrix & recommendation | Optional |
| `GET` | `/api/alerts` | Active incident, bottleneck, and corridor alerts | No |
| `GET` | `/api/eco-stats` | Carbon savings, fuel conservation, and modal split | Optional |
| `GET` | `/api/profile` | Current user profile | Yes |
| `PATCH` | `/api/profile` | Update profile preferences | Yes |

---

## 14. Demo Mode

The application includes an integrated **Controlled Demo Mode**:
* **Autonomous Fallback**: If Supabase or external networks are temporarily offline, the backend and frontend automatically utilize high-fidelity fallback telemetry for Nagpur's transit network.
* **Deterministic & Stable**: Data does not erratically jump, ensuring a solid, believable demonstration for judges.
* **1-Click Evaluation**: Judges can click **"Instant Demo Planner Login"** on the Sign-In or Register page to immediately enter the dashboard.

---

## 15. Deployment Guide

### Vercel Frontend Deployment

1. Import the repository into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Framework Preset: **Vite**.
4. Configure Environment Variables:
   * `VITE_API_URL`: Your deployed backend URL (`https://your-api.onrender.com/api`)
   * `VITE_SUPABASE_URL`: Your Supabase Project URL
   * `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Anon Key
5. Click **Deploy**.

### Backend Deployment (Render, Railway, or VPS)

1. Deploy the `backend/` directory to your Node.js host.
2. Build command: `npm install`
3. Start command: `node server.js`
4. Set Environment Variables:
   * `PORT`: `5000`
   * `NODE_ENV`: `production`
   * `FRONTEND_URL`: Your Vercel frontend URL
   * `SUPABASE_URL`: Your Supabase Project URL
   * `SUPABASE_SECRET_KEY`: Your Supabase Service-Role / Secret Key

---

## 16. GitHub Repository Setup

To commit and push the project to GitHub:

```bash
git init
git add .
git commit -m "feat: complete production-ready MOBILAI full-stack smart mobility platform"
git branch -M main
git remote add origin https://github.com/your-username/mobilai.git
git push -u origin main
```

---

## 17. Security & Best Practices Checklist

- [x] **No Secret Key in Frontend**: Supabase Secret / Service Role Key is never bundled or exposed in client code.
- [x] **Row Level Security (RLS)**: Enforced across all user data tables in PostgreSQL.
- [x] **Sanitized Errors**: No internal database schemas, credentials, or stack traces are leaked to clients.
- [x] **Input Validation**: Strict validation on all route, prediction, and mobility POST endpoints with 400 Bad Request responses for malformed data.
- [x] **Zero Hardcoded API URLs**: Frontend exclusively consumes `VITE_API_URL`.

---

## 18. Future Improvements

* Integration with real-time General Transit Feed Specification (GTFS-RT) feeds.
* Computer vision edge-node inference for automatic intersection queue length detection.
* Dynamic congestion pricing simulation for municipal transport departments.

---

## 19. Team / Contributors

* **MOBILAI Engineering Team**
* Smart City AI Architecture & Full-Stack Systems

---

## 20. License

MIT License — Built for the College Hackathon Demonstration.
