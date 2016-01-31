'use strict';

module.exports = {
  app: {
    title: 'STRENGTH IN NUMBERS',
    description: 'Connected Fitness Community',
    keywords: 'strength, community',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/dumbbell.png',
  favicon: 'modules/core/img/brand/dumbbell.png'
};
