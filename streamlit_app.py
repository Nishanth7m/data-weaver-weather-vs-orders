import streamlit as st
import pandas as pd
st.title("Data Weaver — demo placeholder")
st.write("Replace with your final app code.")
try:
    df = pd.read_csv("data/mock_orders.csv", parse_dates=["date"])
    st.dataframe(df)
except Exception as e:
    st.info("No data/mock_orders.csv found yet. Add your dataset.")
