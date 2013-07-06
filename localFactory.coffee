angular.module("localStorage", []).factory "$store", ($parse) ->
  
  ###
  Global Vars
  ###
  storage = (if (typeof window.localStorage is "undefined") then `undefined` else window.localStorage)
  supported = not (typeof storage is "undefined" or typeof window.JSON is "undefined")
  
  ###
  Pass any type of a string from the localStorage to be parsed so it returns a usable version (like an Object)
  @param res - a string that will be parsed for type
  @returns {*} - whatever the real type of stored value was
  ###
  privateMethods = parseValue: (res) ->
    val = undefined
    try
      val = JSON.parse(res)
      val = res  if typeof val is "undefined"
      val = true  if val is "true"
      val = false  if val is "false"
      val = parseFloat(val)  if parseFloat(val) is val and not angular.isObject(val)
    catch e
      val = res
    val

  publicMethods =
    
    ###
    Set - let's you set a new localStorage key pair set
    @param key - a string that will be used as the accessor for the pair
    @param value - the value of the localStorage item
    @returns {*} - will return whatever it is you've stored in the local storage
    ###
    set: (key, value) ->
      unless supported
        try
          $.cookie key, value
          return value
        catch e
          console.log "Local Storage not supported, make sure you have the $.cookie supported."
      saver = JSON.stringify(value)
      storage.setItem key, saver
      privateMethods.parseValue saver

    
    ###
    Get - let's you get the value of any pair you've stored
    @param key - the string that you set as accessor for the pair
    @returns {*} - Object,String,Float,Boolean depending on what you stored
    ###
    get: (key) ->
      unless supported
        try
          return privateMethods.parseValue($.cookie(key))
        catch e
          return null
      item = storage.getItem(key)
      privateMethods.parseValue item

    
    ###
    Remove - let's you nuke a value from localStorage
    @param key - the accessor value
    @returns {boolean} - if everything went as planned
    ###
    remove: (key) ->
      unless supported
        try
          $.cookie key, null
          return true
        catch e
          return false
      storage.removeItem key
      true

    
    ###
    Bind - let's you directly bind a localStorage value to a $scope variable
    @param $scope - the current scope you want the variable available in
    @param key - the name of the variable you are binding
    @param def - the default value (OPTIONAL)
    @returns {*} - returns whatever the stored value is
    ###
    bind: ($scope, key, def) ->
      def = def or ""
      publicMethods.set key, def  unless publicMethods.get(key)
      $parse(key).assign $scope, publicMethods.get(key)
      $scope.$watch key, ((val) ->
        publicMethods.set key, val
      ), true
      publicMethods.get key

  publicMethods

