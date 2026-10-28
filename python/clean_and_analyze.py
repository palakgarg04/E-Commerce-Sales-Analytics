from pathlib import Path
import pandas as pd
import numpy as np

BASE=Path(__file__).resolve().parents[1]
INPUT=BASE/"data"/"ecommerce_orders.csv"
OUTPUT=BASE/"data"/"processed_orders.csv"

df=pd.read_csv(INPUT)
df.columns=[c.strip().lower() for c in df.columns]
df=df.drop_duplicates(subset=["order_id"])
df["order_date"]=pd.to_datetime(df["order_date"],errors="coerce")
for c in ["quantity","unit_price","discount","sales","profit"]:
    df[c]=pd.to_numeric(df[c],errors="coerce")
    df[c]=df[c].fillna(df[c].median())

df["transaction_month"]=df["order_date"].dt.to_period("M").astype(str)
df["order_value_before_discount"]=df["quantity"]*df["unit_price"]
df["discount_amount"]=df["order_value_before_discount"]*df["discount"]/100
df["profit_margin_pct"]=np.where(df["sales"]!=0,df["profit"]/df["sales"]*100,0)

df.to_csv(OUTPUT,index=False)
print("Rows:",len(df))
print("Total sales:",round(df["sales"].sum(),2))
print("Total profit:",round(df["profit"].sum(),2))
print("Processed:",OUTPUT)
