/*
 * Angular.js localStorage module
 * https://github.com/agrublev/angularLocalStorage
 */

(function (window, angular, undefined) {
	'use strict';

	angular.module('angularLocalStorage')
	  .factory('storage', ['$parse','$window', '$log',
      function ($parse, $window, $log) {
		/**
		 * Global Vars
		 */
		var storage = (typeof $window.localStorage === 'undefined') ? undefined : $window.localStorage;

		var privateMethods = {
			/**
			 * Pass any type of a string from the localStorage to be parsed
			 * @param res - a string that will be parsed for type
			 * @returns {*} - whatever the real value of stored value was
			 */
			parseValue: function (res) {
				var val;
				try {
					val = angular.fromJson(res);
					if (typeof val === 'undefined') {
						val = 'undefined';
					}
					if (val === 'true') {
						val = true;
					}
					if (val === 'false') {
						val = false;
					}
				} catch (e) {
					$log.info(e.message);
				}
				return val;
			}
		};

		var publicMethods = {
			/**
			 * Set - let's you set a new localStorage key pair set
			 * @param key - a string that will be used as the accessor for the pair
			 * @param value - the value of the localStorage item
			 * @exception - the localstorage has size limit  
			 */
			set: function (key, value) {
			   try {
			   	 storage.setItem(key, angular.toJson(value));
			   } catch(e) {
                   $log.info(e.message);
			   }
			},

			/**
			 * Get - let's you get the value of any pair you've stored
			 * @param key - the string that you set as accessor for the pair
			 * @returns {*} - Object,String,Float,Boolean depending on what you stored
			 */
			get: function (key) {
				return privateMethods.parseValue(storage.getItem(key));
			},

			/**
			 * Remove - let's you nuke a value from localStorage
			 * @param key - the accessor value
			 */
			remove: function (key) {
				storage.removeItem(key);
			},

			/**
			 * Clear All - let's you clear out ALL localStorage variables, use this carefully!
			 */
 			clearAll: function() {
				storage.clear();
			},

			/** Update - A similar function with set to avoid QUOTA_EXCEEDED_ERR in iphone/ipad
			 * @param key - a string that will be used as the accessor for the pair
			 * @param value - the value of the localStorage item
			 */
			update:function(key,value){
			    if(storage.getItem(key)){
				   storage.removeItem(key);	
				}
				publicMethods.set(key,value);
			},
			
		};
		return publicMethods;
	}]);  

})(window, window.angular);
