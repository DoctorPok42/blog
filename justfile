set shell := ["powershell.exe", "-c"]

default:
  @just --list

# Install project dependencies
[group('setup')]
[working-directory: './frontend']
install:
  npm install
  cd ../server ;; npm install

# Docker container up
[group('docker')]
docker-up:
  docker-compose up -d

# Docker container down
[group('docker')]
docker-down:
  docker-compose down

# Run frontend development server
[group('development')]
[working-directory: './frontend']
start-frontend:
  npm run dev

# Run backend development server
[group('development')]
[working-directory: './server']
start-cms:
  npm run develop

default_file_name := 'export-strapi'

# Import CMS data
[group('cms-data')]
[working-directory: './server']
cms-import-data data_file=default_file_name:
  npx strapi import -f {{data_file}}

# Export CMS data
[group('cms-data')]
[working-directory: './server']
cms-export-data data_file=default_file_name path='./exports':
  npx strapi export -f {{data_file}} --no-encrypt --path {{path}}
