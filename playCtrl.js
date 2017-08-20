app.controller('playerCtrl', function ($scope, buttonFactory) {
    $scope.table = buttonFactory.table;
    $scope.startChange = {
        start: {
            change: false,
            row: null,
            index: null
        },
        end: {
            change: false,
            row: null,
            index: null
        }
    };
    $scope.getPath = function () {
        if ($scope.startChange.start.row === null || $scope.startChange.end.row === null) {
            return alert("You must set Start and End to get a path")
        } else {
            CalcPath()
        }
    };
    function CalcPath() {
        var start = {
            row: $scope.startChange.start.row,
            index: $scope.startChange.start.index
        };
        var end = {
            row: $scope.startChange.end.row,
            index: $scope.startChange.end.index
        };
        var path = {}
        path.horizontal = start.index - end.index
        path.vertical = start.row - end.row
        var table = $scope.table
        table[start.row][start.index].class.path = true
        table[end.row][end.index].class.path = true
    };
    $scope.handleStart = function () {
        buttonFactory.createTable(0);
    };
    $scope.changeButton = function () {
        if ($scope.startChange.start.change) {
            if (!this.square.class.safe) {
                return alert("You can't Place start on an Unsafe block");
            } else {
                return handlePositionStart(this);
            };
        } else if ($scope.startChange.end.change) {
            if (!this.square.class.safe) {
                return alert("You can't End start on an Unsafe block");
            } else {
                return handlePositionEnd(this);
            };
        };
        if (this.square.position) {
            return alert("You can't block Start or End");
        } else {
            this.square.class.safe = !this.square.class.safe;
        }
    };
    $scope.AssignStart = function () {
        $scope.startChange.start.change = !$scope.startChange.start.change;
        $scope.startChange.end.change = false;
    };
    $scope.assignEnd = function () {
        $scope.startChange.end.change = !$scope.startChange.end.change;
        $scope.startChange.start.change = false;
    };
    function handlePositionStart(element) {
        if ($scope.startChange.start.row !== null) {
            $scope.table[$scope.startChange.start.row][$scope.startChange.start.index].position = null;
        };
        $scope.startChange.start.row = element.$parent.$index;
        $scope.startChange.start.index = element.$index;
        $scope.startChange.start.change = false;
        return element.square.position = "Start";
    };
    function handlePositionEnd(element) {
        if ($scope.startChange.end.row !== null) {
            $scope.table[$scope.startChange.end.row][$scope.startChange.end.index].position = null;
        };
        $scope.startChange.end.row = element.$parent.$index;
        $scope.startChange.end.index = element.$index;
        $scope.startChange.end.change = false;
        return element.square.position = "End";
    }
});