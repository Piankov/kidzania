// Common functions
var assert = require('assert') 

module.exports = {
	getFormatedDate: function(date){
		return this.getFormatedDateByLang(date, this.language);
	},


	getFormatedDateByLang: function(date, lang){
		var day = date.match(/-(\d\d)$/)[1].replace(/^0/,"");
		if (lang == 0) {
			if ((day == 1)||(day == 21)||(day == 31)) day += 'st';
			if ((day == 2)||(day == 22)) day += 'nd';
			if ((day == 3)||(day == 23)) day += 'rd';
			if (parseInt(day) > 3) day += 'th';
		}
		return day + ' ' + this.month[lang][parseInt(date.match(/-(\d\d)-/)[1].replace(/^0/,""))-1];
	},
	language: 0, //0 - English, 1 - Russian

	//I'm not proud for this:
	carriage: '.tickets-action-groups-cell[data-reactid=".0.0.0.2.1.$group-0"] .tickets_group-list_item[data-reactid=".0.0.0.2.1.$group-0.0.1.$1"]',
	teen: '.tickets-action-groups-cell[data-reactid=".0.0.0.2.1.$group-0"] .tickets_group-list_item[data-reactid=".0.0.0.2.1.$group-0.0.1.$2"]',
	adult: '.tickets-action-groups-cell[data-reactid=".0.0.0.2.1.$group-1"] .tickets_group-list_item',

	price: {carriage: [350, 450], teen: [1200, 1500], adult: [600, 750]},

	month: [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]],
	
	langLink: function(){
		return this.langLinkArray[this.language];
	},
	langLinkArray: ['en/', 'ru/'],
	txtChooseDate: function(){
		return this.txtChooseDateArray[this.language];
	},
	txtChooseDateArray: ['Choose date', 'Выберите дату'],
	txtChooseSlot: function(){
		return this.txtChooseSlotArray[this.language];
	},
	txtChooseSlotArray: ['Choose session', 'Выберите сеанс'],
	txtChooseTicket: function(){
		return this.txtChooseTicketArray[this.language];
	},
	txtChooseTicketArray: ['Select tickets', 'Выберите тип и количество билетов'],
	txtTotalsAdultMessage: function(){
		return this.txtTotalsAdultMessageArray[this.language];
	},
	txtTotalsAdultMessageArray: ['Children until 7 can visit the park only with adult accompaniment', 
	'Дети младше 7 лет могут посещать Кидзанию только в сопровождении взрослых.'],
	changeLang: function(){
		return this.changeLangArray[this.language];
	},
	changeLangArray: ['=Русский', '=English']


};
