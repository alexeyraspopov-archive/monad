'use strict';

function sanitize(value){
	return value == null ? '' : value;
}

function isMonad(value){
	return value && value.isMonad;
}

function identity(unit){
	return function(value, morphism){
		return unit(morphism(value));
	}
}

function Monad(type, bind){
	return function Unit(value){
		return isMonad(value) ? value : {
			isMonad: true,
			bind: (bind || identity(Unit)).bind(this, value),
			toString: function(){
				return type + '(' + sanitize(value) + ')';
			}
		};
	};
}

module.exports = Monad;