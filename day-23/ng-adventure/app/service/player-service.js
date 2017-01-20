'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

// $q = promise
ngAdventure.factory('playerService', ['$q', '$log', 'mapService', playerService]);


function playerService($q, $log, mapService) {
  $log.debug('playerService');

  let service = {};
  let turn = 0;

  let player = service.player = {
    name: 'jonny',
    location: 'cabin',
    hp: 16
  };

  let history = service.history = [
    {
      // turn, is an es6 shorthand that can be used when creating an object where property and key are the same thing =  turn: turn
      turn,
      desc: 'welcome to the game',
      location: 'cabin',
      hp: player.hp
    }
  ];

  service.movePlayer = function(direction) {
    return new $q((resolve, reject) => {
      turn++;

      let current = player.location;
      let newLocation = mapService.mapData[current][direction];

      if(!newLocation) {
        history.unshift({
          turn,
          desc: 'you have hit a wall',
          location: player.location,
          hp: player.hp
        });
        return reject('no room in that direction');
      }

      history.unshift({
        turn,
        location: player.location,
        desc: mapService.mapData[newLocation].desc,
        hp: player.hp
      });

      player.location = newLocation;

      return resolve(player.location);
    });
  };

  return service;
}
