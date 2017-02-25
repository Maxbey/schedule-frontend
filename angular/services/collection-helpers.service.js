(function () {
    "use strict";

    angular.module('app.services').factory('CollectionHelpersService', function () {
        return new CollectionHelpersService();
    });

    function CollectionHelpersService() {
        this.getIdsFromCollection = function (collection) {
            var ids = [];

            angular.forEach(collection, function (item) {
                ids.push(item.id);
            });

            return ids;
        };

        this.getCollectionByIds = function (ids, all) {
            var collection = [];

            angular.forEach(all, function (item) {
                if (ids.indexOf(item.id) !== -1)
                    collection.push(item);
            });

            return collection;
        };

        this.exists = function (collection, id) {
            var exists = false;

            angular.forEach(collection, function (item) {
                if (item.id === id)
                    exists = true;
            });

            return exists;
        };
    }

})();
