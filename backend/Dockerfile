# Stage 1: Build Stage - Install dependencies
FROM python:3.11-slim-buster AS builder

WORKDIR /build

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install uv and then the project dependencies
RUN pip install uv
# RUN uv pip install --no-cache-dir -r requirements.txt
RUN uv pip install --no-cache-dir --system -r requirements.txt

# Stage 2: Final Stage - Create the runtime image
FROM python:3.11-slim-buster

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Create a non-root user to run the application
RUN adduser --disabled-password --no-create-home app

# Set the working directory
WORKDIR /app

# Copy the application code from the build stage
COPY --from=builder /build /app

# Set the owner of the application directory to the non-root user
RUN chown -R app:app /app

# Switch to the non-root user
USER app

# Expose the port the Django application will run on
EXPOSE 8000

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# If you plan to use a production WSGI server like Gunicorn,
# you would replace the CMD with something like:
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi"]