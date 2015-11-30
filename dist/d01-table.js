!function(e){var t=e.module("d01-table",[]);t.directive("d01Table",["$parse",function(e){return{templateUrl:"table.html",restrict:"AE",scope:!0,link:function(e,t,a){e.tablestatus={query:"",select:"",pages:0,activePage:0,itemsPerPage:0,sorting:{direction:"-",column:""}},e.clickHeader=function(t){if(t.sortable){var a=e.tablestatus.sorting;a.column===t.key?a.direction="-"===a.direction?"+":"-":(a.column=t.key,a.direction="+")}},e.pages=function(){return new Array(e.tablestatus.pages)},e.setPage=function(t){e.tablestatus.activePage=t},e.getStartItem=function(){return e.tablestatus.itemsPerPage*e.tablestatus.activePage},e.getEnditem=function(){return e.getStartItem()+e.tablestatus.itemsPerPage};var n=function(){e.tablestatus.itemsPerPage=e.tableconfig.itemsPerPage,e.tablestatus.pages=Math.ceil(e.tablesource.length/e.tableconfig.itemsPerPage)},l=function(){e.tablesource=e.$parent.$eval(a.source),e.tableconfig=e.$parent.$eval(a.config),e.rowIdentifier=a.rowIdentifier,_.forEach(e.tableconfig.columns,function(t){t.defaultsort&&(e.tablestatus.sorting.column=t.key)}),n()};e.$on("setTablePage",function(t,a){e.setPage(parseInt(a))}),e.$watch("tablesource.length",function(e,t){n()}),l()}}}]).directive("d01Td",["$compile",function(e){return{templateUrl:"td.html",restrict:"A",scope:!1,transclude:!0,replace:!0,link:function(t,a,n){var l=t.$eval(n.config),s=t.$eval(n.source),i=function(e,t){t=t.replace(/\[(\w+)\]/g,".$1"),t=t.replace(/^\./,"");for(var a=t.split("."),n=0,l=a.length;l>n;++n){var s=a[n];if(!(s in e))return;e=e[s]}return e};if(l.template)a.append(l.template);else if(l.mode)switch(l.mode){case"date":moment?a.append(moment(i(s,l.key)).format(l.dateFormat||"DD/MM/YY")):(console.warn("Date-mode was set, but moment.js is not availabe. Did you forget to include it in your app?"),a.append(i(s,l.key)))}else a.append(i(s,l.key));e(a.contents())(t)}}}])}(angular),angular.module("templates").run(["$templateCache",function(e){e.put("table.html",'<div class="clearfix">\n    <input type="text" ng-model="tablestatus.query" ng-if="tableconfig.searchField" placeholder="{{tableconfig.placeholder}}" ng-class="tableconfig.select.options ? \'col-9 first\':\'col-12\'">\n    <select ng-if="tableconfig.select.options" class="col-3 last" ng-model="tablestatus.select" ng-options="option.value as option.name for option in tableconfig.select.options">\n    </select>\n</div>\n<table class="{{tableconfig.className}}">\n    <thead>\n        <th ng-repeat="col in tableconfig.columns" ng-click="clickHeader(col)" ng-class="{ \'sortable\': col.sortable}" class="{{\'field_\'+col.key + \' \'+ col.className}}">{{col.columnName}} <i ng-if="col.sortable" class="fa" ng-class="{\n            \'fa-angle-up\': tablestatus.sorting.column==col.key,\n            \'fa-flip-vertical\': tablestatus.sorting.direction == \'-\' && tablestatus.sorting.column==col.key\n        }"></i></th>\n    </thead>\n    <tbody>\n        <tr ng-repeat="i in tablesource|filter:tablestatus.query|filter:tablestatus.select|orderBy:tablestatus.sorting.direction+tablestatus.sorting.column|slice:getStartItem():getEnditem()" ng-class-odd="\'odd\'" ng-class-even="\'even\'" class="{{(rowIdentifier) ? \'row_\'+i[rowIdentifier] : \'\'}}">\n            <td d01-td ng-repeat="col in tableconfig.columns" source="i" config="col"></td d01-td>\n        </tr>\n    </tbody>\n</table>\n<ul class="pagination" ng-if="tablestatus.pages != 1">\n    <li ng-repeat="page in pages() track by $index">\n        <a ng-class="{\'active\': $index == tablestatus.activePage}" ng-click="setPage($index)">{{$index + 1}}</a>\n    </li>\n</ul>\n'),e.put("td.html","<td class=\"{{'field_'+col.key+ ' ' + col.className}}\"></td>")}]);