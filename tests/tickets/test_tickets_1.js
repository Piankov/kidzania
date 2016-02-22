var TicketsPage = require('../page-models/tickets');
var should = require('should');

describe('Check links to ticket pages', function(){
	this.timeout(15000);
	
	browser.addCommand("getUrlAndTitle", function() {
		return this.getUrl().then(function(urlResult) {
			return this.getTitle().then(function(titleResult) {
				return { url: urlResult, title: titleResult };
			});
		});
	});
	
	it('should lead to Билеты from Что такое кидзания?', function () {
		return browser.url('https://kidzania.ru/ru/about')
			.click('=Билеты')
			.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Билеты");
				result.url.should.be.equal('https://kidzania.ru/ru/tickets/');
			});
	})
	
	it('should lead to Билеты from Что такое кидзания?', function () {
		return browser.url('https://kidzania.ru/en/about')
		.click('=Tickets')
		.getUrlAndTitle()
			.then(function(result){
				result.title.should.be.equal("Tickets");
				result.url.should.be.equal('https://kidzania.ru/en/tickets/');
			});

	});
})
