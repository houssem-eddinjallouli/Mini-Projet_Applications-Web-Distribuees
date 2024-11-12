FROM python:3.9-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies for psycopg2 and dockerize
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dockerize
RUN curl -sL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xzv

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose the Flask app port
EXPOSE 5001

# Command to run the application with dockerize
CMD ["dockerize", "-wait", "tcp://postgresql:5432", "-timeout", "30s", "python", "api.py"]
