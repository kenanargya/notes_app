FROM php:8.2-cli

# Install dependencies required for Laravel and SQLite
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Create SQLite database file and migrate
RUN touch database/database.sqlite
RUN php artisan migrate --force

# Set default port
ENV PORT=8000
EXPOSE 8000

# Start Laravel's built-in server (suitable for this simple API test)
CMD php artisan serve --host=0.0.0.0 --port=$PORT
