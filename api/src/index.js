// Imports
import express from 'express';

// App Imports
import setupLoadModules from './setup/loadModules';
import setupGraphQL from './setup/graphql';
import setupRestAPI from './setup/restAPI';
import setupStartServer from './setup/startServer';

// Create express server
const server = express();

// Setup load modules
setupLoadModules(server);

// Setup Rest API
setupRestAPI(server);

// Setup GraphQL
setupGraphQL(server);

// Start server
setupStartServer(server);
