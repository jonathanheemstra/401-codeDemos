'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

// factory method
ngAdventure.factory('mapService', ['$log', mapService]);

function mapService($log) {
  $log.debug('mapService');

  let service = {};

  service.mapData = {
    cabin: {
      desc: 'message from cabin',
      south: 'trail'
    },
    trail: {
      desc: 'message from trail',
      north: 'cabin',
      east: 'gate',
      south: 'pit'
    },
    pit: {
      desc: 'you have fallen into the pit',
      north: 'trail'
    },
    gate: {
      desc: 'message from gate',
      west: 'trail',
      east: 'castle'
    },
    castle: {
      desc: 'message from castle',
      west: 'gate',
      south: 'corridor'
    },
    corridor: {
      desc: 'message from corridor',
      north: 'castle',
      east: 'snackroom'
    },
    snackroom: {
      desc: 'have a snack, relax',
      west: 'corridor'
    }
  };

  return service;
}
