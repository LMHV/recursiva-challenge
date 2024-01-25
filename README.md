# Vite - React TypeScript

This project is a small app as a interview challenge built with Vite, React, TypeScript, Tailwind CSS, and PapaParse to import CSV files. 
## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

   ```bash
   git clone https://github.com/your-username/recursiva-challenge

   cd / to project folder

   npm install
```

### Run project

   ```bash
   npm run dev
```
It's running on port :5173

### About the app

It provides a simple interface to upload and parse CSV files.
When the CSV is uploaded, it runs a few functions to calculate the following things:

  - Total people registered
  - Average age of Racing's fans
  - List of the first hundred people that matches the condition 'Casado' & 'Universitario'. Sorted by age ascending.
  - List of the five most common names of River's fans.
  - List of all the teams with the total of fans registered for each one. Including averageAge of the fans, lowestAge and highestAge.

The CSV File must have the following structure:

name;age;team;maritalState;educationLevel
