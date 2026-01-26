# Supabase setup (Konaseema Foods)

This project uses **Supabase Auth (Email + Password)** and saves orders to a table called `orders`.

## 1) Enable Email/Password auth
In Supabase dashboard:
**Authentication → Providers → Email** → enable Email provider.

## 2) Create the `orders` table
Open **SQL Editor** and run:

```sql
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  customer_name text,
  customer_phone text,
  customer_address text,
  total numeric not null,
  items jsonb not null,
  channel text default 'whatsapp',
  created_at timestamp with time zone default now()
);

alter table orders enable row level security;

create policy "Users can insert their own orders"
on orders for insert
with check (auth.uid() = user_id);

create policy "Users can view their own orders"
on orders for select
using (auth.uid() = user_id);
```

## 3) Keys
The Supabase URL + anon key are already embedded in `app/lib/supabaseClient.ts` (as requested).
If you want to move them to environment variables later, set:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
