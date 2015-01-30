'use strict';

describe('angularLocalStorage module', function () {
  var storage, testValue, scope;

  beforeEach(function () {
    module('angularLocalStorage');

    inject(function ($injector) {
      storage = $injector.get('storage');
    });
  });

  describe('when use set() && get() methods', function () {

    beforeEach(function () {
      storage.set('spec', 'some test string');
    });

    beforeEach(function () {
      testValue = storage.get('spec');
    });

    it('should store value in localStorage', function () {
      expect(testValue).toBe('some test string');
    });

    it('should return null when unset key is used', function () {
      expect(storage.get('madeUpKey')).toBeNull();
    });
  });

  describe('when bind() $scope field to localStorage', function () {
    beforeEach(function () {
      inject(function ($rootScope) {
        scope = $rootScope.$new();

        scope.$apply(function () {
          scope.spec = true;
        });

        storage.bind(scope, 'spec');

        scope.$apply(function () {
          scope.spec = false;
        });
      });
    });

    beforeEach(function () {
      testValue = storage.get('spec');
    });

    it('should have $scope value', function () {
      expect(testValue).toEqual(scope.spec);
    });

    it('should not store undefined value', function () {
      scope.$apply(function () {
        scope.spec = undefined;
      });

      expect(testValue).toEqual(false);
      expect(scope.spec).toBeUndefined();
    });

    it('should store default value when passed as string', function () {
      scope.$apply(function () {
        storage.bind(scope, 'defaultedSpec', 'someDefault');
      });
      expect(scope.defaultedSpec).toEqual('someDefault');
    });

    it('should store default value when passed as options object', function () {
      scope.$apply(function () {
        storage.bind(scope, 'defaultedSpecObj', {defaultValue: 'someNewDefault'});
      });
      expect(scope.defaultedSpecObj).toEqual('someNewDefault');
    });

    it('using a custom storeName to bind variable', function () {
      scope.$apply(function () {
        storage.bind(scope, 'customStored', {defaultValue: 'randomValue123', storeName: 'myCustomStore'});
        scope.directFromLocal = storage.get('myCustomStore');
      });
      expect(scope.customStored).toEqual('randomValue123');
      expect(scope.directFromLocal).toEqual('randomValue123');
    });

    it('should prefer existing scope variable over storage and default value', function () {
      scope.spec = 'NewValue';
      storage.set('storedSpec', 'OldValue');
      scope.$apply(function () {
        storage.bind(scope, 'spec', {defaultValue: 'DefValue', storeName: 'storedSpec'});
      });
      scope.$apply(function () {
        scope.spec = scope.spec + 'Updated';
      });
      expect(scope.spec).toEqual('NewValueUpdated');
      expect(storage.get('storedSpec')).toEqual('NewValueUpdated');
    });
  });


  describe('when unbind() variable that clears localStorage and the variable', function () {
    var testLocalStorageValue, testLocalVariableValue;

    beforeEach(function () {
      storage.unbind(scope, 'spec');
    });

    beforeEach(function () {
      testLocalStorageValue = storage.get('spec');
      testLocalVariableValue = scope.spec;
    });

    it('should not contain field in storage', function () {
      expect(testLocalStorageValue).toBeNull();
    });

    it('should not contain field in scope', function () {
      expect(testLocalVariableValue).toBeNull();
    });
  });

  describe('when remove() field from localStorage', function () {
    beforeEach(function () {
      storage.remove('spec');
    });

    beforeEach(function () {
      testValue = storage.get('spec');
    });

    it('should not contain field', function () {
      expect(testValue).toBeNull();
    });
  });

  describe('when use clearAll() method all should be gone', function () {

    beforeEach(function () {
      storage.set('spec', 'some test string');
    });

    beforeEach(function () {
      storage.clearAll();
      testValue = storage.get('spec');
    });

    it('should return null for value in localStorage', function () {
      expect(testValue).toBeNull();
    });
  });

  describe('when use getKeys() method all should be returned', function () {

    beforeEach(function () {
      storage.set('abcKey', 'some test string');
      storage.set('key123', 'test 123');
    });

    beforeEach(function () {
      testValue = storage.getKeys();
    });

    it('should return an array equaling the length of two', function () {
      expect(testValue.length).toEqual(2);
    });

    it('should return the same keys that were put into storage', function () {
      expect(testValue.indexOf('key123')).toBeGreaterThan(-1);
      expect(testValue.indexOf('abcKey')).toBeGreaterThan(-1);
    });
  });
});
