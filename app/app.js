'use strict'

angular.module('tvSeriesApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'moviesControllers'])
.config(($stateProvider) => {
  $stateProvider
  .state('main', {
    url: '/',
    controller: 'mainController', 
  })
  .state('about', {
    url: '/about',
    templateUrl: './templates/about.html',
  })
  .state('home', {
    url: '/home',
    templateUrl: './templates/home.html',
    controller: 'homeController', 
    resolve: {
      rMovies: function(appService) {
        return appService.getMovie().then(response  => {
          return response;
        })
      }
    }
  })
  .state('movie-details', {
    url: '/movie-details/{id}/ ',
    templateUrl: './templates/movieDetails.html',
    controller: 'movieDetailsController', 
    resolve: {
      rMovieDetails: (appService, $stateParams) => {
        let movieId = $stateParams.id;
        return appService.getMovieDetails(movieId).then(response => {
          return response;
        }).catch(error => {
          console.log(error);
        });
      },
      rMovieSeasons: (appService, $stateParams) => {
        let movieId = $stateParams.id;
        return appService.getMovieSeasons(movieId).then(response => {
          return response;
        }).catch(error => {
          console.log(error);
        });
      },
      rMovieCrewInfo: (appService, $stateParams) => {
        let movieId = $stateParams.id;
        appService.getMovieCrewInfo(movieId).then(response => {
          return response;
        }).catch(error => {
          console.log(error);
        });
      }
    }
  })
})
.run(($state) => {
  $state.go('home')
});

