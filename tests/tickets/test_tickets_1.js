var TicketsPage = require('../page-models/tickets');
var should = require('should');

describe('Check links to ticket pages', function(){
	this.timeout(20000);
	
	it('should lead to Билеты from Что такое кидзания?', function () {
		return browser.url('https://kidzania.ru/ru/about')
			.click('=Билеты')
			.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Билеты");
				result.url.should.be.equal('https://kidzania.ru/ru/tickets/');
			});
	})
	
	it('should lead to Tickets from KidZania in the world', function () {
		return browser.url('https://kidzania.ru/en/world')
		.click('=Tickets')
		.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Tickets");
				result.url.should.be.equal('https://kidzania.ru/en/tickets/');
			});

	});

	it('should change language from Ru to En', function () {
		return browser.url('https://kidzania.ru/ru/tickets')
		.click('.header__lang')
		.waitForVisible('=English', 3000)
		.click('=English')
		.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Tickets");
				result.url.should.be.equal('https://kidzania.ru/en/tickets/');
			});
	});

	it('should change language from En to Ru', function () {
		return browser.url('https://kidzania.ru/en/tickets')
		.click('.header__lang')
		.waitForVisible('=Русский', 3000)
		.click('=Русский')
		.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Билеты");
				result.url.should.be.equal('https://kidzania.ru/ru/tickets/');
			});
	});

})
