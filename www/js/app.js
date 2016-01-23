// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })
      .state('tabs.home', {
          url: "/home",
          views: {
              'home-tab': {
                  templateUrl: "templates/home.html",
                  controller: 'HomeTabCtrl'
              }
          }
      })
      .state('tabs.results', {
          url: "/results",
          views: {
              'home-tab': {
                  templateUrl: "templates/results.html"
              }
          }
      })
      .state('tabs.movie', {
          url: "/movie",
          views: {
              'home-tab': {
                  templateUrl: "templates/movie.html"
              }
          }
      })
      .state('tabs.playlist', {
          url: "/playlist",
          views: {
              'playlist-tab': {
                  templateUrl: "templates/playlist.html"
              }
          }
      })
      .state('tabs.playlist_movie', {
          url: "/playlist_movie",
          views: {
              'playlist-tab': {
                  templateUrl: "templates/playlist_movie.html"
              }
          }
      })
      .state('tabs.list', {
          url: "/list",
          views: {
              'playlist-tab': {
                  templateUrl: "templates/list.html"
              }
          }
      })
      .state('tabs.navstack', {
          url: "/navstack",
          views: {
              'about-tab': {
                  templateUrl: "templates/nav-stack.html"
              }
          }
      })
      .state('tabs.favs', {
          url: "/favs",
          views: {
              'favs-tab': {
                  templateUrl: "templates/favs.html"
              }
          }
      })
      .state('tabs.favs_movie', {
          url: "/favs_movie",
          views: {
              'favs-tab': {
                  templateUrl: "templates/favs_movie.html"
              }
          }
      })
    
    $urlRouterProvider.otherwise("/tab/home");
    
})

myApp.value('Listas', []);
myApp.value('Favs', []);
myApp.value('MovieQuery', []);
myApp.value('flag', 0);

myApp.value('ListsNames', []);

myApp.controller('HomeTabCtrl', function ($scope) {
    /*console.log('HomeTabCtrl');*/
});
/*
myApp.controller('consoleTest', function ($scope) {
    console.log('TEST OK');
});
*/
myApp.controller('Playlists', ['$rootScope', '$scope', '$http', 'Listas', 'flag', 'ListsNames', 'Favs', 'MovieQuery',
function Queries($rootScope, $scope, $http, Listas, flag, ListsNames, Favs, MovieQuery) {
    $scope.list = {};
    if (!$rootScope.Listas) {
        
        console.log('Listas no exist');
    }
    $scope.addPlaylist = function () {
        console.log($scope.list.nombre);
        console.log('adding playlist:', $scope.list.nombre);
        console.log('$rootScope.flag:', $rootScope.flag);
        if (!$rootScope.Listas) {
            contador = 0;
            $rootScope.Listas = [];
        } else {
            contador = $rootScope.Listas.length;
        }
        $rootScope.Listas.push({
            ListID: contador,           // ListID to identify the list ezly
            Name: $scope.list.nombre,     // Name of the list
            IDs: []                     // ID's of the movies on the list
        });
        ListsNames.push($scope.list.nombre); //List of Lists names, to show them when adding a new movie to a list
        /*Update the Lists list*/
        $scope.ListList = [];
        $scope.ListList = $rootScope.Listas;
        $rootScope.flag = 1;
        /*
        for (var i = 0; i < $rootScope.Listas.length; i++) {
            //console.log('$rootScope.Listas[', [i], '].ListID = ', $rootScope.Listas[i].ListID);
            console.log('$rootScope.Listas[', [i], '].Name = ', $rootScope.Listas[i].Name);
        }*/
        console.log('Num Listas', $rootScope.Listas.length);
        /*Clean the value of the new Playlist*/
        $scope.list.nombre = "";
    };
    var contador = 0;
    /*
    $scope.addPlay = function () {
        console.log($scope.list.nombre);
        console.log('adding playlist:', $scope.list.nombre);
        if (!$rootScope.Listas) {
            contador = 0;
            $rootScope.Listas = [];
        } else {
            contador = $rootScope.Listas.length;
        }
        $rootScope.Listas.push({
            ListID: contador,           // ListID to identify the list ezly
            Name: $scope.list.nombre,     // Name of the list
            IDs: []                     // ID's of the movies on the list
        });
        ListsNames.push($scope.list.nombre); //List of Lists names, to show them when adding a new movie to a list
        $scope.ListList = [];
        $scope.ListList = $rootScope.Listas;
        $rootScope.flag = 1;
        
        console.log('Num Listas', $rootScope.Listas.length);
        $scope.list.nombre = "";
    };*/
    
    $scope.updateLists = function () {
        console.log($rootScope.Listas);
        console.log('Updating...');
        /*Update the Lists list*/
        $scope.ListList = [];
        $scope.ListList = $rootScope.Listas;
        console.log('$rootScope.Listas:');
        console.log($rootScope.Listas);
        console.log('ListList:');
        console.log($scope.ListList);
        /**/
    };

    $scope.updateListNum = function (num) {
        if (!$rootScope.currentMovie) {
            $rootScope.currentMovie = num;
            console.log('current mov not existing');
            console.log($rootScope.currentMovie);
        } else {
            $rootScope.currentMovie = num;
            console.log('current mov existing');
        }
    };

    $scope.updateFavs = function () {
        console.log($rootScope.Favs);
        console.log('Updating...');
        /*Update the Lists list*/
        $scope.FavList = [];
        $scope.FavList = $rootScope.Favs;
        console.log('$rootScope.Favs:');
        console.log($rootScope.Favs);
        console.log('FavList:');
        console.log($scope.FavList);
        /**/
    };

    $scope.updateMovies = function (num) {
        console.log('movvvvvvvvvvvvvvvv...');
        console.log($rootScope.currentMovie);
        /*Update the Lists list*/
        $scope.MovMov = [];
        $scope.MovMov = $rootScope.Listas[$rootScope.currentMovie].IDs;
        console.log('$rootScope.Listas[$rootScope.currentMovie].IDs:');
        console.log($scope.MovMov);

        /**/
    };

    $scope.query = {};
    $scope.searchName = function () {
        $scope.ListList = [];
        $scope.ListList = $rootScope.Listas;
        $http.get('http://www.omdbapi.com/?s=' + $scope.query.Name + '')
            .then(function (response) {
                MovieQuery = [];
                MovieQuery = response.data;
                $rootScope.results = [];
                $rootScope.results = response.data.Search;
                console.log('$rootScope.results[0].Title:', $rootScope.results[0].Title);
            },
            function (failure) {
                console.log('Error in the query');
            });
    };
    $scope.gotoMovie = function (num) {
        $http.get('http://www.omdbapi.com/?i=' + num + '&tomatoes=true&plot=full')
            .then(function (response) {
                $rootScope.Movies = [];
                $rootScope.Movies.push(response);
                console.log($rootScope);
            },
            function (failure) {
                console.log('Error in the query');
            });

        console.log('num: ', num);
    };

    $scope.addMovie = function (list_id) {
        console.log('addmov');
        console.log($rootScope);
        $rootScope.Listas[list_id].IDs.push({
            Title: $rootScope.Movies[$rootScope.Movies.length - 1].data.Title,
            Year: $rootScope.Movies[$rootScope.Movies.length - 1].data.Year,
            Poster: $rootScope.Movies[$rootScope.Movies.length - 1].data.Poster,
            imdbID: $rootScope.Movies[$rootScope.Movies.length - 1].data.imdbID,
            Released: $rootScope.Movies[$rootScope.Movies.length - 1].data.Released,
            Actors: $rootScope.Movies[$rootScope.Movies.length - 1].data.Actors,
            Plot: $rootScope.Movies[$rootScope.Movies.length - 1].data.Plot,
            Metascore: $rootScope.Movies[$rootScope.Movies.length - 1].data.Metascore,
            imdbRating: $rootScope.Movies[$rootScope.Movies.length - 1].data.imdbRating,
            tomatoRating: $rootScope.Movies[$rootScope.Movies.length - 1].data.tomatoRating,
        });
        console.log($rootScope.Listas);
        console.log('adding movie:', $rootScope.Movies[$rootScope.Movies.length - 1].data.imdbID);
        $scope.ListList = [];
        $scope.ListList = $rootScope.Listas;
    };

    $scope.addToFavs = function () {
        if (!$rootScope.Favs) {
            $rootScope.Favs = [];
            console.log('Favs created');
        }
        $rootScope.Favs.push({
            Title: $rootScope.Movies[$rootScope.Movies.length - 1].data.Title,
            Year: $rootScope.Movies[$rootScope.Movies.length - 1].data.Year,
            Poster: $rootScope.Movies[$rootScope.Movies.length - 1].data.Poster,
            imdbID: $rootScope.Movies[$rootScope.Movies.length - 1].data.imdbID,
            Released: $rootScope.Movies[$rootScope.Movies.length - 1].data.Released,
            Actors: $rootScope.Movies[$rootScope.Movies.length - 1].data.Actors,
            Plot: $rootScope.Movies[$rootScope.Movies.length - 1].data.Plot,
            Metascore: $rootScope.Movies[$rootScope.Movies.length - 1].data.Metascore,
            imdbRating: $rootScope.Movies[$rootScope.Movies.length - 1].data.imdbRating,
            tomatoRating: $rootScope.Movies[$rootScope.Movies.length - 1].data.tomatoRating,
        });
    };
    
    $scope.enterList = function (num) {
        if (!$rootScope.currentMovie) {
            $rootScope.currentMovie = num;
            console.log('Favs created');
        }
        console.log('listas:');
        console.log($rootScope.Listas);
        console.log('Showing movies on:',num,' flag=', flag,'there are ',$rootScope.Listas[num].IDs.length,'movies in it');
        //buscar por ID
    };

}]);


myApp.controller('Favorites', function ($scope) {
    $scope.favorites = [];

});