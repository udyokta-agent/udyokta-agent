-- ১. users_profile টেবিল (সাইনআপের পর ইউজারের তথ্য)
create table if not exists public.users_profile (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  business_name text,
  business_category text,
  phone text,
  created_at timestamp with time zone default now(),
  last_login timestamp with time zone default now(),
  total_generations integer default 0
);

-- ২. content_logs টেবিল (কে কী কন্টেন্ট তৈরি করল)
create table if not exists public.content_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  content_type text,
  business_category text,
  product_name text,
  tone text,
  created_at timestamp with time zone default now()
);

-- ৩. RLS (Row Level Security) চালু করুন
alter table public.users_profile enable row level security;
alter table public.content_logs enable row level security;

-- ৪. Policy: নিজের ডেটা নিজে দেখতে পাবে
create policy "Users can view own profile" on public.users_profile
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.users_profile
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.users_profile
  for update using (auth.uid() = id);

create policy "Users can insert own logs" on public.content_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can view own logs" on public.content_logs
  for select using (auth.uid() = user_id);
