var Monad = require('./index'),
	Identity = Monad('Identity');

function unwrap(m){
	var value;

	m.bind(function(v){
		value = v;
	});

	return value;
}

function spy(){
	var object = { method: function(){} };

	spyOn(object, 'method');

	return object;
}

describe('Identity', function(){
	var value = 13, morphism = function(n){ return n * n };

	it('should satisfy the left identity law', function(){
		var m = Identity(value),
			left = m.bind(morphism),
			right = morphism(value);

		expect(unwrap(left)).toBe(right);
	});

	it('should satisfy the right identity law', function(){
		var m = Identity(value),
			left = m.bind(Identity),
			right = m;

		expect(unwrap(left)).toBe(unwrap(right));
	});

	it('should satisfy the associativity law', function(){
		var m = Identity(value),
			left = m.bind(Identity).bind(morphism),
			right = m.bind(function(v){
				return Identity(v).bind(morphism);
			});

		expect(unwrap(left)).toBe(unwrap(right));
	});
});