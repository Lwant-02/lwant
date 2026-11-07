-- The Wishes wall on /graduation (PBI-011): a note's name and words, when it went up, and whether the owner hid it.
-- Nothing else about who wrote it. Run with `npm run notes:setup`; safe to run again.
create table if not exists notes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  body text not null check (char_length(body) between 1 and 200),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create index if not exists notes_newest on notes (created_at desc) where not hidden;

-- To hide a note: update notes set hidden = true where id = …;
