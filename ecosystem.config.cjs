module.exports = {
  apps: [
    {
      name: 'webapp',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NODE_OPTIONS: '--max-old-space-size=512',
        NEXT_PUBLIC_SUPABASE_URL: 'https://ynbppzqonxglslhhuawe.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODA3MDgsImV4cCI6MjA5MDg1NjcwOH0._i4SvJY-62moXV-H82h-r7nHwPAObPZr3KCsaNxaxIg',
        NEXT_PUBLIC_SITE_URL: 'https://3000-iz3f4k6koeyzt4b2idtkr-dfc00ec5.sandbox.novita.ai',
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
    },
  ],
}
