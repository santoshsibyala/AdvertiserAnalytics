var app=angular.module('advertiserAnalytics',['angularUtils.directives.dirPagination']);

app.controller('eventController',function($scope,$http,$window){
	$scope.search=function(){
		$http({
			method:'POST',
			url:'/events',
			data: { "keyword": $scope.keyword}
		}).success(function (data){
			if(data.status=='success'){
				for(var i=0;i<data.results.length;i++){
					if(data.results[i].image_url!=null){
						data.results[i].image_url=data.results[i].image_url.replace(/\/small\//,'/medium/');
					}
					else{
						data.results[i].image_url="images/"+data.results[i].eventid+".png";
					}
				}
				$scope.events=data.results;
				//window.location = '/afterCourses/'+data.search;
			}
			else{
				alert("fail");
				//sweetAlert("Oops!",data.search,"error");
			}
		}).error(function (error){
				//sweetAlert("Oops! some thing went wrong",error,"error");

		});
	};

});