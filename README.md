# Calendarific API Integration

This project is a Node.js/Express.js application that integrates with the Calendarific API to fetch holidays and countries information. The application includes caching functionality using Redis to improve performance and reduce redundant API calls. The project is fully containerized using Docker and Docker Compose.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Features

- **Fetch Holidays**: Retrieve holiday information for a given country and year.
- **Fetch Countries**: Get a list of all available countries supported by the Calendarific API.
- **Caching**: Redis caching is used to store API responses, reducing the number of external API calls.
- **Dockerized**: The application is fully containerized using Docker, making it easy to set up and run.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18.x or higher)
- npm (v6.x or higher)
- Docker (v20.x or higher)
- Docker Compose (v2.x or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/calendarific-api-integration.git
   cd calendarific-api-integration
