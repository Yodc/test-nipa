# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory in the container
WORKDIR /

# Copy the current directory contents into the container at /code
COPY . /
COPY ./requirement.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirement.txt

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
