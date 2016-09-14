// `babel-relay-plugin` returns a function for creating plugin instances
const getBabelRelayPlugin = require('babel-relay-plugin');

// load previously saved schema data (see "Schema JSON" below)
const schemaData = require('../data/schema.json').data;

// create a plugin instance
const plugin = getBabelRelayPlugin(schemaData);

module.exports = plugin;