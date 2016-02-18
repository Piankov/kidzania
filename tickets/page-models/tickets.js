// Common functions
var assert = require('assert') 

module.exports = {
	printStep: function (step) {
		console.log("Step:\t" + step);
	},
	assertUrlTitle: function (actual, url, title){
		console.log('\tExpected URL:\t"' + url + '"');
		console.log('\tActual URL:\t"' + actual.url + '"');	
		assert.equal(url, actual.url, 'FAIL');
		console.log('\tExpected Title:\t"' + title + '"');
		console.log('\tActual Title:\t"' + actual.title + '"');
		assert.equal(title, actual.title, 'FAIL');
	},
	mainURL: "https://kidzania.ru/",
	aboutTitleR: "Что такое Кидзания?",
	ticketsTitleR: "Билеты",
	ticketsTitleE: "Tickets",
	worldTitleR: "Кидзания в мире",
	
	languageHeader: ".header__lang",
	logoHeader: ".header__logo"
};
