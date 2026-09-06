-- 1. Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- 2. Mandals Table (Supports both your fields and the app's fields)
create table if not exists mandals (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text,
  marathi_name text,
  mandal_name text,
  language text not null default 'mr',
  tagline text,
  invite_message text,
  established_year text,
  location text,
  address text,
  city text default 'पुणे',
  state text default 'महाराष्ट्र',
  pincode text,
  president_name text,
  secretary_name text,
  contact text,
  contact_phone text,
  contact_email text,
  total_members int default 50,
  anniversary_year int,
  hero_image_url text default '/images/hero-bappa.webp',
  murti_artist text,
  theme text,
  visarjan_day text default 'अनंत चतुर्दशी (१० वा दिवस)',
  map_embed_url text,
  maps_link text,
  instagram_url text,
  social_links jsonb default '{}'::jsonb,
  highlights jsonb default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  murti_photos jsonb not null default '[]'::jsonb,
  music_url text,
  status text not null default 'approved',
  is_verified boolean default true,
  is_featured boolean default false,
  edit_token text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Mandal Events Table
create table if not exists mandal_events (
  id uuid primary key default gen_random_uuid(),
  mandal_id uuid references mandals(id) on delete cascade,
  day_number int not null,
  event_date date not null,
  title text not null,
  marathi_title text not null,
  event_time text not null,
  location text not null,
  tag text not null,
  tag_color text,
  description text,
  is_highlight boolean default false,
  created_at timestamptz default now()
);

-- 4. Mandal Photos Table
create table if not exists mandal_photos (
  id uuid primary key default gen_random_uuid(),
  mandal_id uuid references mandals(id) on delete cascade,
  title text not null,
  marathi_title text,
  category text not null,
  year text not null,
  image_url text not null,
  description text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 5. Payment Records Table (For Razorpay)
create table if not exists payment_records (
  id uuid primary key default gen_random_uuid(),
  mandal_id uuid references mandals(id) on delete set null,
  razorpay_order_id text unique not null,
  razorpay_payment_id text unique,
  razorpay_signature text,
  amount int not null,
  currency text default 'INR',
  status text default 'created',
  plan text default 'basic',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Indexes
create index if not exists mandals_slug_idx on mandals (slug);
create index if not exists mandals_status_idx on mandals (status);
create index if not exists idx_mandals_verified on mandals (is_verified);
create index if not exists idx_mandal_events_mandal_id on mandal_events(mandal_id);
create index if not exists idx_mandal_photos_mandal_id on mandal_photos(mandal_id);

-- 7. Enable Row Level Security (RLS)
alter table mandals enable row level security;
alter table mandal_events enable row level security;
alter table mandal_photos enable row level security;
alter table payment_records enable row level security;

-- 8. Policies
create policy "Public can view approved mandals" on mandals
  for select using (is_verified = true or status = 'approved');

create policy "Public can submit mandal" on mandals
  for insert with check (true);

create policy "Public can view events" on mandal_events
  for select using (true);

create policy "Public can view photos" on mandal_photos
  for select using (true);

-- 9. Storage Bucket setup
insert into storage.buckets (id, name, public)
values ('mandal-photos', 'mandal-photos', true)
on conflict (id) do nothing;

create policy "public can upload photos" on storage.objects
  for insert to anon
  with check (bucket_id = 'mandal-photos');

create policy "public can view photos" on storage.objects
  for select to anon
  using (bucket_id = 'mandal-photos');