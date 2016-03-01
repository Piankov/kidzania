var TicketsPage = require('../page-models/tickets');
var should = require('should');
var Promise = require('bluebird');

describe('Check filled form', function(){
	this.timeout(15000);

	beforeEach(function(){
    		browser.localStorage('DELETE');
    });
	

	it('should show pay button when everything is correct, and remove when any field is not filled', function () {
		this.timeout(25000);
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Put incorrect email
		// Check pay button isn't clickable
		// Put correct email
		// Check pay button is clickable
		// Remove and return date
		// Remove and return slot
		// Remove and return tickets

		
		//this.skip();
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(6)')
			.scroll('.tickets-slots__item.high')			
			.click('.tickets-slots__item.high:nth-Child(1)')
			.scroll('.ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.waitForVisible('.tickets-adult-hint')
			.click('.tickets-adult-hint__close')
			.setValue('.tickets-details__input', 'AAA')
			.isPayEnanbled(false)
			.setValue('.tickets-details__input', 'AAA@AAA.AA')
			.isPayEnanbled(true)
			.click('.tickets-date__close')
			.isPayEnanbled(false)
			.scroll('.calendar-item.high:nth-Child(6)')
			.click('.calendar-item.high:nth-Child(6)')
			.isPayEnanbled(true)
			.click('.tickets-slot__close')
			.isPayEnanbled(false)
			.scroll('.tickets-slots__item.high:nth-Child(1)')	
			.click('.tickets-slots__item.high:nth-Child(1)')
			.isPayEnanbled(true)
			.clickX('.icon-adult')
			.clickX('.icon-child-carriage')
			.isPayEnanbled(false)
			.scroll('.ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.isPayEnanbled(true)
	});

	it('should save all data in totals after changing language', function () {
		// Click on any date
		// Click on any slot
		// 3*Click on ticket card 2-3 years
		// 4*Click on ticket card 4-14 years
		// 4*Click on ticket card adult
		// Fill email
		// Change language to opposite
		// Check all data

		
		//this.skip();
		var date;
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(6)')
			.getElementDateOppositeLang('.calendar-item.high:nth-Child(6)')
				.then(function(result){
					date = result;
				})

			.scroll('.tickets-slots__item.high')			
			.click('.tickets-slots__item.high:nth-Child(1)')
			.getElementSlot('.tickets-slots__item.high:nth-Child(1)')
				.then(function(result){
					slot = result;
				})
			.scroll('.ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.scroll(TicketsPage.adult)
			.click(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.setValue('.tickets-details__input', 'AAA@AAA.AA')
			.scroll('.header__lang')
			.click('.header__lang')
			.waitForVisible(TicketsPage.changeLang(), 3000)
			.click(TicketsPage.changeLang())
				.then(function(result){
					TicketsPage.language = 1 - TicketsPage.language;
				})
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				})
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				})
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([3, 4, 5]);
				})
			.getValue('.tickets-details__input')
				.then(function(result){
					result.should.be.eql('AAA@AAA.AA');
				})			
	});
	
})
