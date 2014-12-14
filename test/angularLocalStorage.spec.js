localStorage.clear(); //starting from fresh each time

describe('angularLocalStorage module', function() {
	var storage, testValue, scope;

	beforeEach(function() {
		module('angularLocalStorage');

		inject(function($injector) {
			storage = $injector.get('storage');
		});
	});

	describe('when use set() && get() methods', function() {

		beforeEach(function() {
			storage.set(':spec', 'some test string');
		});

		beforeEach(function() {
			testValue = storage.get(':spec');
		});

		it('should store value in localStorage', function() {
			expect(testValue).toBe('some test string');
		});
	});

	ddescribe('when bind() $scope field to localStorage', function() {
		beforeEach(function() {
			inject(function($rootScope) {
				scope = $rootScope.$new();

				scope.$apply(function() {
					scope.spec = true;
				});

				storage.bind(scope, 'spec');

				scope.$apply(function() {
					scope.spec = 159;
				});
			});
		});

		beforeEach(function() {
			testValue = storage.get('spec');
		});

		it('should have $scope value', function() {
			expect(scope.spec).toEqual(159);
		});

		it('should not store null value', function() {
			scope.$apply(function() {
				scope.spec = null;
			});

			expect(testValue).toEqual(null);
			expect(scope.spec).toEqual(null);
		});

		it('should store default value when passed a string', function() {
			scope.$apply(function() {
				storage.bind(scope, 'defaultedSpec', 'someDefault');
			});

			expect(scope.defaultedSpec).toEqual('someDefault');

		});

		it('should store default value when passed an object', function() {
			var obj = {a: 'someNewDefault'};

			scope.$apply(function() {
				storage.bind(scope, 'defaultedSpecObj', obj);
			});
			expect(scope.defaultedSpecObj).toEqual(obj);
		});

	});


	describe('when unbind() variable that clears localStorage and the variable', function() {
		var testLocalStorageValue, testLocalVariableValue;

		beforeEach(function() {
			storage.unbind(scope, 'spec');
		});

		beforeEach(function() {
			testLocalStorageValue = storage.get('spec');
			testLocalVariableValue = scope.spec;
		});

		it('should not contain field in storage', function() {
			expect(testLocalStorageValue).toBeNull();
		});

		it('should not contain field in scope', function() {
			expect(testLocalVariableValue).toBeNull();
		});
	});

	describe('when remove() field from localStorage', function() {
		beforeEach(function() {
			storage.remove('spec');
		});

		beforeEach(function() {
			testValue = storage.get('spec');
		});

		it('should not contain field', function() {
			expect(testValue).toBeNull();
		});
	});

	describe('when use clearAll() method all should be gone', function() {

		beforeEach(function() {
			storage.set('spec', 'some test string');
		});

		beforeEach(function() {
			storage.clearAll();
			testValue = storage.get('spec');
		});

		it('should return null for value in localStorage', function() {
			expect(testValue).toBeNull();
		});
	});
});