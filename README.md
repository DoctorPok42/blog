# Blog

This project is a blog template using Strapi as a CMS and Next.js as a frontend.
It is designed to be easily customizable and extendable.

<!-- add emoji for each feature -->
## Features

- 📝 Strapi CMS for content management
- 🗂️ Content types for blog posts, categories, tags and other
- 🧩 Dynamic zones for flexible content modeling
- ⚛️ Next.js frontend for fast and SEO-friendly rendering
- 🎨 Tailwind CSS for styling
- 📦 Modular architecture for easy customization
- ⚙️ Justfile for task automation
- 🐳 Docker support for easy deployment

## Requirements

- Node.js v14 or higher
- npm v6 or higher
- Docker
- Just command runner

## Getting Started

1. Install dependencies for both backend and frontend:

    ```bash
    just install
    ```

## Running the Project Locally

1. Start the Docker containers for the database:

    ```bash
    just docker-up
    ```

2. Start the Strapi CMS development server:

    ```bash
    just start-cms
    ```

3. Start the Next.js frontend development server:

    ```bash
    just start-frontend
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the blog.
5. Open another tab and navigate to `http://localhost:1337/admin` to access the Strapi admin panel.

## Deployment

1. Export the database from your local environment.

    ```bash
    just cms-export-data /path/to/export
    ```

2. Import the database to your production environment.

    ```bash
    just cms-import-data /path/to/import
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
