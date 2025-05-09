# Quester

## Local Development Setup

This project consists of multiple components that need to be run simultaneously for local development. Follow these steps to get everything running:

### 1. Smart Contracts & Local Blockchain

```bash
cd contracts
make anvil
```

This will start a local Anvil blockchain instance for development.

Then, in a new terminal window, deploy the contracts to the local blockchain:

```bash
cd contracts
make deploy-anvil
```

### 2. Indexer

```bash
cd ponder
yarn dev
```

This starts the local indexer service.

### 3. Mini App

First, start the database service:

```bash
cd mini-app
npm run services:start
```

This command will start the required database service using Docker.

Then, in the same directory, start the main application:

```bash
npm run dev
```

This starts the main application in development mode.
