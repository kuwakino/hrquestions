(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination]);

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function todoPaginatedList() {
        var directive = {
            restrict: "E", // example setup as an element only
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: { paginated: '=pageData'}, // example empty isolate scope
            controller: ["$scope", "$http", controller],
            link: link
        };

        function controller($scope, $http) { // example controller creating the scope bindings

            $scope.pageData = {};
            // example of xhr call to the server's 'RESTful' api
            $http.get("api/Todo/Todos").then(response => $scope.pageData = response.data);

            $scope.loadPage = function (page, pageSize, orderBy, ascending) {
                $http.get("api/Todo/Todos" + "?page=" + page + "&pageSize=" + pageSize + "&orderBy=" + orderBy + "&ascending=" + ascending).then(response => $scope.pageData = response.data);
            };

        }

        function link(scope, element, attrs) { }

        return directive;
    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function pagination() {
        var directive = {
            restrict: "E", // example setup as an element only
            templateUrl: "app/templates/pagination.html",
            scope: {
                paginated: '=pageData',
                loadPage: '=loadPage',
            }, // example empty isolate scope
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {
        
            //$scope.$watch("currentPage", function (newValue, oldValue) {
            //    $scope.currentPageManual = newValue + 1;
            //});
            
            //$scope.$watch("currentPageManual", function (newValue, oldValue) {
            //    $scope.currentPage = newValue - 1;
            //});

            
        }

        function link($scope, element, attrs) {

            if (!$scope.currentPage || $scope.currentPage <= 0) {
                $scope.currentPage = 1;
                $scope.currentPageManual = 1;
            }

            if (!$scope.selectedPageSize) {
                $scope.selectedPageSize = "20";
            }

            $scope.goToPage = function (pageNo) {
                $scope.loadPage(pageNo, $scope.selectedPageSize, "", 0);
            }
            //if (!scope.currentPage || scope.currentPage <= 0) {
            //    scope.currentPage = 1;
            //}

            //if (!scope.pSize) {
            //    scope.pageSize = 20;

            //}

            //if (!scope.totalPage) {
            //    scope.totalPage = scope.todos.length - (scope.todos.length % scope.pSize);
            //}

            //scope.first = function () {
            //    $scope.loadPage(1, scope.pageSize);
            //}

            //scope.goto = function (pageNo) {
            //    $scope.loadPage(pageNo, scope.pageSize);
            //}

            //scope.last = function () {
            //    $scope.loadPage(scope.totalPage, scope.pageSize);
            //}

            //scope.updateSize = function () {
            //    if (scope.pageSize == 'all')
            //        scope.pageSize = scope.todos.length;
            //}
        }

        return directive;
    }

})(angular);

