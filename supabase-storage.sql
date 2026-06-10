insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'daily-ui-uploads',
  'daily-ui-uploads',
  true,
  10485760,
  array['image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "daily ui uploads public read" on storage.objects;
create policy "daily ui uploads public read"
on storage.objects for select
using (bucket_id = 'daily-ui-uploads');

drop policy if exists "daily ui users upload own files" on storage.objects;
create policy "daily ui users upload own files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'daily-ui-uploads'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "daily ui users delete own files" on storage.objects;
create policy "daily ui users delete own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'daily-ui-uploads'
  and (storage.foldername(name))[1] = auth.uid()::text
);
