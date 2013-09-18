angular.module('angularLocalStorage', []).factory('storage', ['$parse', '$window', '$log', function storage($parse, $window, $log) {
    /**
     * Global Vars
     */
    var storage = (typeof $window.localStorage === 'undefined') ? undefined : $window.localStorage;
    var supported = !(typeof storage === 'undefined' || typeof $window.JSON === 'undefined');
    if (!supported) {
        $log.error('Local Storage not supported, this application needs localStorage in order to run');
        return;
    }
    var privateMethods = {
        /**
         * Pass any type of a string from the localStorage to be parsed so it returns a usable version (like an Object)
         * @param res - a string that will be parsed for type
         * @returns {*} - whatever the real type of stored value was
         */
        parseValue: function (res) {
            var val;
            try {
                val = $window.JSON.parse(res);
                if (typeof val === 'undefined') {
                    val = res;
                }
                if (val === 'true') {
                    val = true;
                }
                if (val === 'false') {
                    val = false;
                }
                if ($window.parseFloat(val) === val && !angular.isObject(val)) {
                    val = $window.parseFloat(val);
                }
            } catch (e) {
                val = res;
            }
            return val;
        }
    };

    var pub = {
        /**
         * indicates whether we should store dateStamps or not
         */
        dateStamps: true,
        /**
         * builds a key for every timestamp
         * @param valueKey
         * @returns {string}
         */
        stampKeyBuilder: function (valueKey) {
            return valueKey + pub.dateStampsSuffix;
        },
        dateStampsSuffix: '_dateStamp',
        /**
         * Set - let's you set a new localStorage key pair set
         * @param key - a string that will be used as the accessor for the pair
         * @param value - the value of the localStorage item
         * @returns {*} - will return whatever it is you've stored in the local storage
         */
        set: function (key, value) {
            var stri = $window.JSON.stringify;
            var saver = stri(value);
            try {
                storage.setItem(key, saver);
                if (pub.dateStamps === true) {
                    storage.setItem(pub.stampKeyBuilder(key), stri(new Date()))
                }
            } catch(e) {
                console.error("localStorage LIMIT REACHED: (" + e + ")");
                throw e;
            }
            return privateMethods.parseValue(saver);
        },

        /**
         * Get - let's you get the value of any pair you've stored
         * @param key - the string that you set as accessor for the pair
         * @returns {*} - Object,String,Float,Boolean depending on what you stored
         */
        get: function (key) {
            var item = storage.getItem(key);
            return privateMethods.parseValue(item);
        },

        /**
         * getDateStamp - let's you get the datestamp stored with your value
         * @param key - the string that you set as accessor for your value
         * @returns {Date} of when the value of key was stored
         */
        getDateStamp: function (key) {
            return pub.get(pub.stampKeyBuilder(key));
        },

        /**
         * Remove - let's you nuke a value from localStorage
         * @param key - the accessor value
         * @returns {boolean} - if everything went as planned
         */
        remove: function (key) {
            storage.removeItem(key);
            return true;
        },

        /**
         * Bind - let's you directly bind a localStorage value to a $scope variable
         * @param {Angular $scope} $scope - the current scope you want the variable available in
         * @param {String} key - the name of the variable you are binding
         * @param {Object} opts - (optional) custom options like default value or unique store name
         * Here are the available options you can set:
         * * defaultValue: the default value
         * * storeName: add a custom store key value instead of using the scope variable name
         * @returns {*} - returns whatever the stored value is
         */
        bind: function ($scope, key, opts) {
            var defaultOpts = {
                defaultValue: '',
                storeName: ''
            };
            // Backwards compatibility with old defaultValue string
            if (angular.isString(opts)) {
                opts = angular.extend({}, defaultOpts, {defaultValue:opts});
            } else {
                // If no defined options we use defaults otherwise extend defaults
                opts = (angular.isUndefined(opts)) ? defaultOpts : angular.extend(defaultOpts,opts);
            }

            // Set the storeName key for the localStorage entry
            // use user defined in specified
            var storeName = opts.storeName || key;

            // If a value doesn't already exist store it as is
            if (!pub.get(storeName)) {
                pub.set(storeName, opts.defaultValue);
            }

            // If it does exist assign it to the $scope value
            $parse(key).assign($scope, pub.get(storeName));

            // Register a listener for changes on the $scope value
            // to update the localStorage value
            $scope.$watch(key, function (val) {
                if (angular.isDefined(val)) {
                    pub.set(storeName, val);
                }
            }, true);

            return pub.get(storeName);
        },
        /**
         * Unbind - let's you unbind a variable from localStorage while removing the value from both
         * the localStorage and the local variable and sets it to null
         * @param $scope - the scope the variable was initially set in
         * @param key - the name of the variable you are unbinding
         * @param storeName - (optional) if you used a custom storeName you will have to specify it here as well
         */
        unbind: function($scope, key, storeName) {
            storeName = storeName || key;
            $parse(key).assign($scope, null);
            $scope.$watch(key, function () { });
            pub.remove(storeName);
        },
        /**
         * Clear All - let's you clear out ALL localStorage variables, use this carefully!
         */
        clearAll: function() {
            storage.clear();
        }
    };
    return pub;
}]);
