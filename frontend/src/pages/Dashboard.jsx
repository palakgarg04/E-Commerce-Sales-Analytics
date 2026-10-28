// import {useEffect,useState} from "react";
import React, { useEffect, useState } from "react";
import {BarChart,Bar,LineChart,Line,PieChart,Pie,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,Legend} from "recharts";
import {getDashboard} from "../services/api";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";

const money=n=>`₹${Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`;

export default function Dashboard(){
 const[data,setData]=useState(null); const[error,setError]=useState("");
 useEffect(()=>{getDashboard().then(setData).catch(e=>setError(e.message));},[]);
 if(error)return <div className="error">Could not load data. Start MySQL and the backend, then refresh.</div>;
 if(!data)return <div className="loading">Loading dashboard...</div>;
 const{kpis,monthlySales,categorySales,regionSales,paymentMethods,topProducts,customers}=data;
 return <div className="app-shell">
  <aside className="sidebar"><div className="brand">E-Commerce<br/>Analytics</div>
   <nav><a className="active">Dashboard</a><a>Sales Analytics</a><a>Products</a><a>Customers</a><a>Regions</a><a>Reports</a></nav>
  </aside>
  <main className="content">
   <header><p className="eyebrow">Business Intelligence</p><h1>Sales Overview</h1><p className="muted">Revenue, profitability, products and customers.</p></header>
   <section className="kpi-grid">
    <KpiCard title="Total Sales" value={money(kpis.totalSales)}/><KpiCard title="Orders" value={Number(kpis.totalOrders).toLocaleString()}/>
    <KpiCard title="Total Profit" value={money(kpis.totalProfit)}/><KpiCard title="Customers" value={Number(kpis.totalCustomers).toLocaleString()}/>
    <KpiCard title="Average Order Value" value={money(kpis.averageOrderValue)}/>
   </section>
   <section className="charts-grid">
    <ChartCard title="Monthly Sales & Profit"><ResponsiveContainer width="100%" height={300}><LineChart data={monthlySales}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip formatter={v=>money(v)}/><Legend/><Line type="monotone" dataKey="sales" name="Sales" strokeWidth={2}/><Line type="monotone" dataKey="profit" name="Profit" strokeWidth={2}/></LineChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Sales by Category"><ResponsiveContainer width="100%" height={300}><BarChart data={categorySales}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="category"/><YAxis/><Tooltip formatter={v=>money(v)}/><Bar dataKey="sales" name="Sales"/></BarChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Sales by Region"><ResponsiveContainer width="100%" height={300}><BarChart data={regionSales} layout="vertical"><CartesianGrid strokeDasharray="3 3"/><XAxis type="number"/><YAxis dataKey="region" type="category"/><Tooltip formatter={v=>money(v)}/><Bar dataKey="sales" name="Sales"/></BarChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Payment Method"><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={paymentMethods} dataKey="sales" nameKey="payment_method" outerRadius={100} label/><Tooltip formatter={v=>money(v)}/><Legend/></PieChart></ResponsiveContainer></ChartCard>
   </section>
   <section className="tables-grid">
    <ChartCard title="Top Products"><table><thead><tr><th>Product</th><th>Units</th><th>Sales</th><th>Profit</th></tr></thead><tbody>{topProducts.map(p=><tr key={p.product_name}><td>{p.product_name}</td><td>{p.unitsSold}</td><td>{money(p.sales)}</td><td>{money(p.profit)}</td></tr>)}</tbody></table></ChartCard>
    <ChartCard title="Top Customers"><table><thead><tr><th>Customer</th><th>Orders</th><th>Spend</th></tr></thead><tbody>{customers.map(c=><tr key={c.customer_id}><td>{c.customer_id}</td><td>{c.orders}</td><td>{money(c.totalSpent)}</td></tr>)}</tbody></table></ChartCard>
   </section>
  </main>
 </div>;
}
