describe('angular-localStorage module', function () {
	var $store, testValue,scope;

	beforeEach(function () {
		module('localStorage');

		inject(function ($injector) {
			$store = $injector.get('$store');
		});
	});

	describe('when use set() && get() methods', function () {

		beforeEach(function () {
			$store.set('spec', 'some test string');
		});

		beforeEach(function () {
			testValue = $store.get('spec');
		});

		it('should store value in localStorage', function () {
			expect(testValue).toBe('some test string');
		});
	});

	describe('when bind() $scope field to localStorage', function () {
		beforeEach(function () {
			inject(function ($rootScope) {
				scope = $rootScope.$new();

				scope.$apply(function () {
					scope.spec = true;
				});

				$store.bind(scope, 'spec');

				scope.$apply(function () {
					scope.spec = false;
				});
			});
		});

		it('should have $scope value', function () {
			expect(scope.spec).toBe(false);
		});
	});

	describe('when unbind() variable that clears localStorage and the variable', function () {
		beforeEach(function () {
			$store.unbind(scope,'spec');
		});

		beforeEach(function () {
			testLocalStorageValue = $store.get('spec');
			testLocalVariableValue = scope.spec;
		});

		it('should not contain field', function () {
			expect(testLocalStorageValue).toBeNull();
			expect(testLocalVariableValue).toBeNull();
		});
	});

	describe('when remove() field from localStorage', function () {
		beforeEach(function () {
			$store.set('spec','lovely');
			$store.remove('spec');
		});

		beforeEach(function () {
			testValue = $store.get('spec');
		});

		it('should not contain field', function () {
			expect(testValue).toBeNull();
		});
	});
});