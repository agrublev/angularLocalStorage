describe('angular-localStorage module', function () {
	var $store, testValue;

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
		var scope;

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

		beforeEach(function () {
			testValue = $store.get('specy');
		});

		it('should have $scope value', function () {
			expect(testValue).toBe(false);
		});
	});

	describe('when remove() field from localStorage', function () {
		beforeEach(function () {
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