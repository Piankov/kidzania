// Common functions
var assert = require('assert') 

module.exports = {
	getFormatedDate: function(date){
		var day = date.match(/-(\d\d)$/)[1].replace(/^0/,"");
		if (this.language == 0) {
			if ((day == 1)||(day == 21)||(day == 31)) day += 'st';
			if ((day == 2)||(day == 22)) day += 'nd';
			if ((day == 3)||(day == 23)) day += 'rd';
			if (parseInt(day) > 3) day += 'th';
		}
		return day + ' ' + this.month[this.language][parseInt(date.match(/-(\d\d)-/)[1].replace(/^0/,""))-1];
	},
	language: 0, //0 - English, 1 - Russian

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
	
	langLink: function(){
		return this.langLinkArray[this.language];
	},
	langLinkArray: ['en/', 'ru/'],
	txtChooseDate: function(){
		return this.txtChooseDateArray[this.language];
	},
	txtChooseDateArray: ['Choose date', 'Выберите дату']
};
