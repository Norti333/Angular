app.factory('buttonFactory', function () {
    var buttonFactory = {}
    buttonFactory.table = new Array()
    buttonFactory.createTable = function (counter) {
        if (counter === 12) {
            return false
        }
        var row = new Array()
        var id = 0
        for (i = 0; i < 12; i++) {
            row.push({
                id: id,
                position: null,
                class: {
                    safe: true,
                    path: false
                }
            });
            id++
        };
        buttonFactory.table.push(row)
        buttonFactory.createTable(counter + 1)
    }
    return buttonFactory
});