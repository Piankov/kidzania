var TicketsPage = require('../page-models/tickets');
var should = require('should');

describe('Check clicking dates', function(){
	this.timeout(20000);

    beforeEach(function(){
    		browser.localStorage('DELETE');
    });

	it('should appear totals', function () {
		// Click on any date
		// Check futter appeared and date is correct
		//this.skip();
		var date;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			/* TODO:
			Here I'd like to find all elements witch contain 'high' in 'class' attribute
			.elements('.calendar-item')
				.then(function(result){
					result.value.forEach(function(elem){
						return browser.elementIdAttribute(elem.ELEMENT,'class')
					})					
						.then(function(result){
							console.log('DEBUG:' + result.value);
							return browser;
						})
				})
			Although 'high' is mentioned in selector, I still get non-clickable objects as well
			*/
			.getElementDate('.calendar-item.high:nth-Child(6)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(6)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})

	it('should change date in totals', function () {
		// Click on any date
		// Check futter appeared 
		// Click on any other date
		// Check new date is correct
		//this.skip();
		var date;
		return browser
			//TODO: TRY!!!
			.localStorage('DELETE')
			.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.getElementDate('.calendar-item.high:nth-Child(6)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(36)')
			.getTotalDate()
			.scroll('.calendar-item.high')
			.click('.calendar-item.high:nth-Child(6)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})

	it('should change date after closing totals and clicking on a new one', function () {
		// Click on any date
		// Check futter appeared 
		// Click on X near date
		// Check futter disappeared
		// Click on any other date
		// Check new date is correct
		//this.skip();
		var date;

		
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.getElementDate('.calendar-item.high:nth-Child(5)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(6)')
			.getTotalDate()
			.click('.tickets-date__close')
			.waitForExist('.tickets-date__format', 500, true)
			.click('.calendar-item.high:nth-Child(5)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})
})
