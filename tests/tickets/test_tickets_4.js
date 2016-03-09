var TicketsPage = require('../page-models/tickets');
var should = require('should');
var Promise = require('bluebird');

describe('Check chosing tickets', function(){
	this.timeout(25000);	

	beforeEach(function(){
    		browser.localStorage('DELETE');
    });
	
	it('should appear totals', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Check futter appeared, date and slot are correct
		// Check adult message is shown
		// Close adult message
		// Check one 2-3 and one adult are added
		//this.skip();
		var date;
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser
						.getElementDateByID(result.value[1].ELEMENT)
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
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.getTotalDate()
										.then(function(result){
											result.should.be.equal(date);
										})
									.getTotalSlot()
										.then(function(result){
											result.should.be.equal(slot);
										})
									.waitForExist('.icon-child-carriage')
									.waitForExist('.tickets-product__icon')
									.waitForExist('.tickets-product__quantity', 500, true)
						});
				});
	});

	it('should add and remove correctly', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Click on ticket card 4-14 years
		// Check adult alert has appeared
		// Close alert window
		// Check one of each ticket is added
		// Twice click on 4-14 add button
		// Check number of teens tickets became 3
		// 4 times click on 2-3 add button
		// Check number of carriage tickets became 5
		// 3 times click on adult add button
		// Check number of adult tickets became 4
		// 3 Times click on "Отменить" button for adult
		// Check number of adult tickets became 1
		// 3 Times click on "Отменить" button for teen
		// Check teen disappeared from totals
		// Click X for carriage in totals
		// Check carriage disappered from totals

		//this.skip();
		this.timeout(160000);
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser
						.elementIdClick(result.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
									.scroll('.ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([1, 1, 1]);
										})			
									.click(TicketsPage.teen + ' .ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([1, 3, 1]);
										})
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.click(TicketsPage.carriage + ' .ticket_card_button')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([5, 3, 1]);
										})
									.scroll(TicketsPage.adult + ' .ticket_card_button')
									.click(TicketsPage.adult + ' .ticket_card_button')
									.click(TicketsPage.adult + ' .ticket_card_button')
									.click(TicketsPage.adult + ' .ticket_card_button')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([5, 3, 4]);
										})
									.click(TicketsPage.adult + ' .ticket_card_button--simple')
									.click(TicketsPage.adult + ' .ticket_card_button--simple')
									.click(TicketsPage.adult + ' .ticket_card_button--simple')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([5, 3, 1]);
										})
									.click(TicketsPage.teen + ' .ticket_card_button--simple')
									.click(TicketsPage.teen + ' .ticket_card_button--simple')
									.click(TicketsPage.teen + ' .ticket_card_button--simple')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([5, 0, 1]);
										})
									.clickX('.icon-child-carriage')
							       	.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([0, 0, 1]);
										});	
							});
				});
	});		


	it('should remove adult correctly', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 4-14 years
		// Check adult alert has appeared
		// Close alert window
		// Click X for adult in totals
		// Check adult ticket disappeared
		// Check message appeared
		// Remove 4-14 ticket
		// Check ВЫберите тип и количество билетов appeared

		//this.skip();
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser
						.elementIdClick(result.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
									.scroll('.ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([0, 1, 1]);
										})
									.clickX('.icon-adult')
									.getText('.tickets-totals__blank')
										.then(function(result){
											result.should.be.eql(TicketsPage.txtTotalsAdultMessage());
										})
									.getTicketsNumbers()
										.then(function(result){
											result.should.be.eql([0, 1, 0]);
										})
									.clickX('.icon-child-teen')
									.getText('.tickets-totals__blank')
										.then(function(result){
											result.should.be.eql(TicketsPage.txtChooseTicket());
										})
							});
				});
	});

	it('should process removing date correctly', function () {
		// Click on any holyday date
		// Click on any slot
		// Click on ticket card 4-14 years
		// Check adult alert has appeared
		// Close alert window
		// Click X for adult in totals
		// Click X near date
		// Check price for teen hasn't changed
		// Chose any busines day
		// Check price has changed

		//this.skip();
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.holyday.high')
				.then(function(result){
					return browser
						.elementIdClick(result.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
									.scroll('.ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.clickX('.icon-adult')
									.click('.tickets-date__close')
									.click('.tickets-slot__close')
									.getText('.tickets-product__name')
										.then(function(result){
											var str = result.match(/^(\d*)\D/)[1];
											str.should.be.eql(TicketsPage.price.teen[1]);
										})
									.elements('.calendar-item.high:not(holyday)')
										.then(function(result){
											return browser.elementIdClick(result.value[1].ELEMENT)
												.getText('.tickets-product__name')
												.then(function(result){
													var str = result.match(/^(\d*)\D/)[1];
													str.should.be.eql(TicketsPage.price.teen[0]);
												})
										});
							});
				});
	});		

	it('should process changing date correctly', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Check adult alert has appeared
		// Close alert window
		// Click X for adult in totals
		// Check price for carriage
		// Chose any busines day
		// Check price has changed

		//this.skip();
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.holyday.high')
				.then(function(result){
					return browser
						.elementIdClick(result.value[1].ELEMENT)
						.scroll('.tickets-slots__item.high')
						.elements('.tickets-slots__item.high')
							.then(function(result){
								return browser.elementIdClick(result.value[1].ELEMENT)
									.scroll('.ticket_card_button')
									.click(TicketsPage.teen + ' .ticket_card_button')
									.waitForVisible('.tickets-adult-hint')
									.click('.tickets-adult-hint__close')
									.clickX('.icon-adult')
									.getText('.tickets-product__name')
										.then(function(result){
											var str = result.match(/^(\d*)\D/)[1];
											str.should.be.eql(TicketsPage.price.teen[1]);
										})
									.elements('.calendar-item.high:not(holyday)')
										.then(function(result){
											return browser.elementIdClick(result.value[1].ELEMENT)
												.getText('.tickets-product__name')
												.then(function(result){
													var str = result.match(/^(\d*)\D/)[1];
													str.should.be.eql(TicketsPage.price.teen[0]);
												})
										});
							});
				});
	});
})
