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

			 /*
			    A object to store unregisters functions that generate when apply $scope.$watch
			    for unnecessary judge, store the functions seperately
			 */
            "bindObjectReverse" : {},

            "bindObjectForward" : {},

			/** Bind - Make a data-binding in single way or both way
			 * @param $scope - this param is to inject $scope environment in my own opinion
			 * @param modelKey - angular expression that will be used to get value from the $scope 
			 * @param storageKey - the name of the localStorage item
			 * @param direction - data-binding dirction , from model to localstorage or from localstorage to 
			                      model or both way 

			 */
			bind: function($scope,modelKey,storageKey,direction){

                switch (direction) {
                   case 'forward' :
                     forwardBind();
                     break;
                   case 'reverse' :
                     reverseBind();
                     break;          
                   case 'normal' :
                     forwardBind();
                     reverseBind();
                     break;                       
                   default :
                     forwardBind();
                     break;                                
                }

				function reverseBind(){

					var tmp = $scope.$watch(
							function(){return publicMethods.get(storageKey)},
		                    function(newVal,oldVal){
		                       $parse(modelKey).assign($scope,newVal);
		                    },
		                    true
						)

                    $parse(storageKey).assign(publicMethods.bindObjectReverse,tmp);	

				}

				function forwardBind(){

					var tmp = $scope.$watch(
							function(){return $parse(modelKey)($scope);},
		                    function(newVal,oldVal){
		                    	publicMethods.set(storageKey,newVal);
		                    },
		                    true
						)
                    
					$parse(modelKey).assign(publicMethods.bindObjectForward,tmp);

				}				

			},

			/** unbind - cancel data-binding in single way or both way
			 * @param $scope - this param is to inject $scope environment in my own opinion
			 * @param modelKey - angular expression that will be used to get value from the $scope 
			 * @param storageKey - the name of the localStorage item
			 * @param direction - data-binding cancel dirction , from model to localstorage or from localstorage to 
			                      model or both way 

			 */
			unbind : function($scope,modelKey,storageKey,direction){

                switch (direction) {
                   case 'forward' :
                     forwardUnbind();
                     break;
                   case 'reverse' :
                     reverseUnbind();
                     break;          
                   case 'normal' :
                     forwardUnbind();
                     reverseUnbind();
                     break;                       
                   default :
                     forwardUnbind();
                     break;                                
                }

               function reverseUnbind(){
               	  $parse(storageKey)(publicMethods.bindObjectReverse).apply();
               }

               function forwardUnbind(){
               	  $parse(modelKey)(publicMethods.bindObjectForward).apply();
               }

			}
					
		};
		return publicMethods;
	}]);  
