var tcgConfig = angular.module('tcg.config', []);
var tcgServices = angular.module('tcg.services', []);
var tcgFilters = angular.module('tcg.filters', []);
var tcgDirectives = angular.module('tcg.directives', []);

var tcg = angular.module('tcg', ['tcg.config', 'tcg.services', 'tcg.filters', 'tcg.directives', 'ui.bootstrap']).run();