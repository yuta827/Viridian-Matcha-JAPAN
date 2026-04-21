#!/usr/bin/env python3
"""Apply migration to Supabase using psycopg2"""
import subprocess
import os

SUPABASE_URL = "postgresql://postgres.ynbppzqonxglslhhuawe:Tori%26koji999@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

sql = """
ALTER TABLE products ADD COLUMN IF NOT EXISTS bulk_price_usd NUMERIC(10,2);
"""

result = subprocess.run(
    ["psql", SUPABASE_URL, "-c", sql],
    capture_output=True, text=True
)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Return code:", result.returncode)
