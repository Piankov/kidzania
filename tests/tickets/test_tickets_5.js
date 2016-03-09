var TicketsPage = require('../page-models/tickets');
var should = require('should');
var Promise = require('bluebird');

describe('Check filled form', function(){
	this.timeout(25000);

	beforeEach(function(){
    		browser.localStorage('DELETE');
    });
	

	it('should show pay button when everything is correct, and remove when any field is not filled', function () {
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
			.elements('.calendar-item.high')
				.then(function(resultData){
					return browser.elementIdClick(resultData.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
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
									.scroll('.calendar-item')
									.elementIdClick(resultData.value[1].ELEMENT)
									.isPayEnanbled(true)
									.click('.tickets-slot__close')
									.isPayEnanbled(false)
									.scroll('.tickets-slots__item')	
									.elementIdClick(result.value[1].ELEMENT)
									.isPayEnanbled(true)
									.clickX('.icon-adult')
									.clickX('.icon-child-carriage')
									.isPayEnanbled(false)
									.scroll('.ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.isPayEnanbled(true)
							});
				});
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
		this.timeout(40000);
		var date;
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser
						.getElementDateOppositeLangByID(result.value[1].ELEMENT)
							.then(function(result){
								date = result;
							})
						.elementIdClick(result.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.getElementSlotByID(result.value[1].ELEMENT)
										.then(function(result){
											slot = result;
										})
									.elementIdClick(result.value[1].ELEMENT)
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
				});
	});

	it('should count summ correctly', function () {
		// Click on any bussines day 
		// Click on any slot
		// Click twice on ticket card 2-3 years
		// Click twice on ticket card 4-14 years
		// Check adult alert has appeared
		// Close alert window
		// Check summ
		// Chose any holyday
		// Check summ has changed
		// Remove adult ticket
		// Check summ has changed

		//this.skip();
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high:not(holyday)')
				.then(function(resultDate){
					return browser
						.elementIdClick(resultDate.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
									.scroll('.ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.getText('.tickets-pay__amount ')
										.then(function(result){
											var str = result.match(/ (\d*) /)[1];
											var counted = TicketsPage.price.carriage[0]*2+TicketsPage.price.teen[0]*2 + TicketsPage.price.adult[0];
											str.should.be.eql(counted);
										})
									.elements('.calendar-item.high.holyday')
										.then(function(resultDate){
											return browser
												.elementIdClick(resultDate.value[1].ELEMENT)

											
												.getText('.tickets-pay__amount ')
													.then(function(result){
														var str = result.match(/ (\d*) /)[1];
														var counted = TicketsPage.price.carriage[1]*2+TicketsPage.price.teen[1]*2 + TicketsPage.price.adult[1];
														str.should.be.eql(counted);
													})
												.clickX('.icon-adult')
												.getText('.tickets-pay__amount ')
													.then(function(result){
														var str = result.match(/ (\d*) /)[1];
														var counted = TicketsPage.price.carriage[1]*2+TicketsPage.price.teen[1]*2;
														str.should.be.eql(counted);
													})
										});
							});
				});
	});
})
