// Common functions
var assert = require('assert') 

module.exports = {
	getFormatedDate: function(date){
		var day = date.match(/-(\d\d)$/)[1].replace(/^0/,"");
		if (this.language == 0) {
			day = '1';
			if (day == 1) day += 'st';
			if (day == 2) day += 'nd';
			if (day == 3) day += 'rd';
			if (parseInt(day) > 3) day += 'th';
		}
		return day + ' ' + this.month[this.language][parseInt(date.match(/-(\d\d)-/)[1].replace(/^0/,""))-1];
	},
	languageHeader: ".header__lang",
	logoHeader: ".header__logo",
	calendar: ".calendar-grid",
	dateCalendar: ".calendar-item",
	dateCalendarProf: ".prof",
	totals: ".tickets-totals__fixed",
	dateTotals: ".tickets-date__format",
	closeDateTotals: ".tickets-date__close",
	slotTotals: ".tickets-slot__format",
	closeSlotTotals: ".tickets-slot__close",
	month: [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]],
	language: 1 //0 - English, 1 - Russian
	//langLink: function(){
	//	return this.langLinkArray[this.language];
	//},
	//langLinkArray: ['en/', 'ru/']
};
