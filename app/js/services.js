'use strict'

angular.module('tvSeriesApp')
.service('appService',  function($http, $sce, $q)  {
        let getMovie = () => {
            let promise =  $http({
                method: 'GET',
                url: `http://api.tvmaze.com/shows`,
            }).then(response => {
                return response.data;
            }).catch(error => {
                console.log(error);
            });
            return promise;
        };
        let getMovieDetails = movieId => {
            let promise =  $http({
                method: 'GET',
                url: `http://api.tvmaze.com/shows/${movieId}`,
            }).then(response => {
                return response.data;
            }).catch(error =>{
                console.log(error);
            });
            return promise;
        };
        let getMovieSeasons = movieId => {
            let promise =  $http({
                method: 'GET',
                url: `http://api.tvmaze.com/shows/${movieId}/seasons`,
            }).then(response => {
                return response.data;
            }).catch(error =>{
                console.log(error);
            });
            return promise;
        };
        let getMovieCrewInfo = movieId => {
            let promise =  $http({
                method: 'GET',
                url: `http://api.tvmaze.com/shows/${movieId}/crew`,
            }).then(response => {
                return response.data;
            }).catch(error => {
                console.log(error);
            });
            return promise;
        };
        let getSearchedMovies = movie => {
            let promise =  $http({
                method: 'GET',
                url: `http://api.tvmaze.com/search/shows?q=${movie}`,
            }).then(response => {
                return response.data;
            }).catch(error =>{
                console.log(error);
            });
            return promise;
        };
        let editSummary = summary => {
            if(!!summary) {
                return summary.replace('<p>','').replace('</p>', '').replace('<b>','').replace('</b>', '').replace('<i>', '').replace('</i>', '');
            } else {
                return 'No summary available';
            }
        };
         
        return {
            getMovie: getMovie,
            getMovieDetails: getMovieDetails,
            getMovieSeasons: getMovieSeasons,
            getSearchedMovies: getSearchedMovies,
            editSummary: editSummary,
            getMovieCrewInfo: getMovieCrewInfo
        }
});