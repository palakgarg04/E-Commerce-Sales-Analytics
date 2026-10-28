# E-Commerce Sales Analytics Platform

Placement-oriented Data Analyst + Full-Stack project.

## Stack
React + Vite + Recharts | Node.js + Express | MySQL | Python/Pandas | SQL | Power BI

## Flow
Raw CSV -> Python/Pandas -> MySQL -> SQL analytics -> Express REST API -> React dashboard -> Power BI

## Features
- Sales, orders, profit, customers and average order value KPIs
- Monthly sales/profit trend
- Category and region analysis
- Top products and customers
- Payment-method analysis
- REST API backend
- MySQL schema and analytical SQL
- Python cleaning/EDA script
- Power BI dashboard guide
- Synthetic sample dataset

## Setup

### Database
1. Install MySQL.
2. Run `sql/schema.sql`.
3. Load `data/ecommerce_orders.csv` into the `orders` table using MySQL Workbench.
   The CSV column order matches the table.

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
In PowerShell:
```powershell
Copy-Item .env.example .env
```
Edit `.env` with your MySQL credentials. API: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Python
```bash
pip install -r python/requirements.txt
python python/clean_and_analyze.py
```

## Final placement version
Replace the synthetic dataset with a larger legitimate e-commerce dataset and document its source. Add authentication, filters, CSV upload, RFM segmentation and deployment if time permits.

## Suggested resume title
E-Commerce Sales Analytics Platform | React.js, Node.js, Express.js, MySQL, Python, SQL, Power BI
