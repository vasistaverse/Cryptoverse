# Cryptoverse

## Overview

Cryptoverse is a mini-website designed to collect and display real-time price data of cryptocurrencies, including BTC, ETH, DOGE, BNB, and SOL.

## Features

- Display real-time price data for selected cryptocurrencies.
- Fetch data every 60 seconds to ensure up-to-date information.
- Display prices in USD with proper formatting.
- Show volume and market cap with appropriate formatting.
- Display timestamps of the last data update.

## Installation

Follow these steps to install and configure the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vasistaverse/Cryptoverse.git
   cd Cryptoverse
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a .env file in the root directory and add the following variables**:
   ```env
   NEXT_MONGODB_URI=your-mongodb-uri
   NEXT_PUBLIC_COIN_WATCH_API_KEY=your-api-key
   ```

## Configuration

- LiveCoinWatch API: Obtain your API key from LiveCoinWatch and add it to your .env file as NEXT_PUBLIC_COIN_WATCH_API_KEY.
- MongoDB: Set up your MongoDB URI and add it to your .env file as NEXT_MONGODB_URI.

## Usage

- To run the Project inNext.js development server:
    ```bash
    npm run dev
- For Production mode:
    ```bash
    npm run build
    npm run start

##  Accessing the Project

- Open your browser and navigate to http://localhost:3000.

## Third party APIs

This project uses the following third-party API:

- LiveCoinWatch API: Used for fetching real-time cryptocurrency data. Obtain your API key from LiveCoinWatch.

## Dependencies

This project uses the following key dependencies:

- Next.js: React framework for server-rendered applications.
- React-Redux: Official React bindings for Redux.
- Redux-Persist: Persist and rehydrate a Redux store.
- @reduxjs/toolkit: The official, recommended way to write Redux logic.
- MUI: React components for faster and easier web development.

## Contributing

This project is in the early stages of development. I have faced some issues with Redux to persist the data in various modular components. Feel free to contribute; your contribution will be of great value and help me develop my skills as well.

- Fork the repository.
- Create a new branch.
- Make your changes.
- Submit a pull request.


