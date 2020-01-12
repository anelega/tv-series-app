'use strict'

let app = angular.module('moviesControllers', []);
app.controller('homeController', function($scope, rMovies, $state, appService) {

    $scope.movieSummary = movieSummary => {
        return appService.editSummary(movieSummary);
    };

    $scope.getMovieDetail = movie => {
        let movieName = movie.name.replace(/\s/g, '-');
        $state.go('movie-details', {id: movie.id});
    };

    $scope.submit = () => {
        if(!$scope.movieToSearch) {
            return;
        }
        let termToSearch =  $scope.movieToSearch.replace(/\s{2,}/g, '-');

        return appService.getSearchedMovies(termToSearch).then(response => {
            $scope.movies = response;
        }).catch(error => {
            console.log(error);
        });
    };

});

app.controller('movieDetailsController', function($scope, rMovieDetails, rMovieSeasons, rMovieCrewInfo, appService, $uibModal) {
    $scope.movieDetails = rMovieDetails;
    $scope.movieSeasons = rMovieSeasons;
    $scope.crewInfo = rMovieCrewInfo;

    $scope.movieSummary = movieSummary => {
        return appService.editSummary(movieSummary);
    };
    
    $scope.showFullDescription = season => {
        $uibModal.open({
            templateUrl: './templates/modalDescription.html',
            backdrop: 'static',
            controller: 'modalDescriptionCtrl',
            resolve: {
                rSeason: () => {
                    return season;
                }
            }
        });
    }
});
app.controller('mainController', function($scope, $state) {
    $state.go('home');
});

app.controller('modalDescriptionCtrl', function ($scope , $uibModalInstance, rSeason, appService, $window){
    $scope.season = rSeason;

    $scope.movieSummary = movieSummary => {
        return appService.editSummary(movieSummary);
    };
    $scope.go = (season) => {
        let url = season.url;
        $window.open(url, '_blank');
        $uibModalInstance.close();
    };
    $scope.cancel = () => {
        $uibModalInstance.close();
    };
});





