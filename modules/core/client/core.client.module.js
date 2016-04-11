'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.map', ['gservice']);
ApplicationConfiguration.registerModule('map', ['gservice']);
// ApplicationConfiguration.registerModule('map', ['uiGmapgoogle-maps']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
