describe('angular-localStorage module', function () {
	var $store, testValue, scope;

	beforeEach(function () {
		module('localStorage');

		inject(function ($injector) {
			$store = $injector.get('$store');
		});
	});

        describe('when use set() && get() methods', function () {

                it('should store primitives in localStorage', function () {
                        $store.set('spec', 'some test string');
                        expect($store.get('spec')).toEqual('some test string');

                        $store.set('spec', 1);
                        expect($store.get('spec')).toEqual(1);

                        $store.set('spec', 1.5);
                        expect($store.get('spec')).toEqual(1.5);

                        $store.set('spec', true);
                        expect($store.get('spec')).toBeTruthy();

                        $store.set('spec', false);
                        expect($store.get('spec')).toBeFalsy();

                        $store.set('spec', null);
                        expect($store.get('spec')).toBeNull();
                });

                it('should store object in localStorage', function () {
                        $store.set('spec', {});
                        expect($store.get('spec')).toEqual({});

                        $store.set('spec', {"value": 1});
                        expect($store.get('spec')).toEqual({"value": 1});
                });

                it('should store array in localStorage', function () {
                        $store.set('spec', []);
                        expect($store.get('spec')).toEqual([]);

                        $store.set('spec', [1,2,3]);
                        expect($store.get('spec')).toEqual([1,2,3]);
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

		beforeEach(function () {
			testValue = $store.get('spec');
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
	});

	describe('when unbind() variable that clears localStorage and the variable', function () {
		var testLocalStorageValue, testLocalVariableValue;

		beforeEach(function () {
			$store.unbind(scope, 'spec');
		});

		beforeEach(function () {
			testLocalStorageValue = $store.get('spec');
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
