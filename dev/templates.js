angular.module("d01-table").run(["$templateCache", function($templateCache) {$templateCache.put("table.html","<div class=\"clearfix\">\r\n    <input type=\"text\" ng-model=\"tablestatus.query\" ng-if=\"tableconfig.searchField\" placeholder=\"{{tableconfig.placeholder}}\" ng-class=\"tableconfig.select.options ? \'col-9 first\':\'col-12\'\">\r\n    <select ng-if=\"tableconfig.select.options\" class=\"col-3 last\" ng-model=\"tablestatus.select\" ng-options=\"option.value as option.name for option in tableconfig.select.options\">\r\n    </select>\r\n</div>\r\n<table class=\"{{tableconfig.className}}\">\r\n    <thead>\r\n        <th ng-repeat=\"col in tableconfig.columns\" ng-click=\"clickHeader(col)\" ng-class=\"{ \'sortable\': col.sortable}\" class=\"{{\'field_\'+col.key + \' \'+ col.className}}\">{{col.columnName}} <i ng-if=\"col.sortable\" class=\"fa\" ng-class=\"{\r\n            \'fa-angle-up\': tablestatus.sorting.column==col.key,\r\n            \'fa-flip-vertical\': tablestatus.sorting.direction == \'-\' && tablestatus.sorting.column==col.key\r\n        }\"></i></th>\r\n    </thead>\r\n    <tbody>\r\n        <tr ng-repeat=\"i in tablesource|filter:tablestatus.query|filter:tablestatus.select|orderBy:tablestatus.sorting.direction+tablestatus.sorting.column|filter:tableconfig.filter|slice:getStartItem():getEnditem()\" ng-class-odd=\"\'odd\'\" ng-class-even=\"\'even\'\" class=\"{{(rowIdentifier) ? \'row_\'+i[rowIdentifier] : \'\'}}\">\r\n            <td d01-td ng-repeat=\"col in tableconfig.columns\" source=\"i\" config=\"col\"></td d01-td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<ul class=\"pagination\" ng-if=\"tablestatus.pages > 1\">\r\n    <li ng-repeat=\"page in pages() track by $index\">\r\n        <a ng-class=\"{\'active\': $index == tablestatus.activePage}\" ng-click=\"setPage($index)\">{{$index + 1}}</a>\r\n    </li>\r\n</ul>\r\n");
$templateCache.put("td.html","<td class=\"{{\'field_\'+col.key+ \' \' + col.className}}\"></td>");}]);