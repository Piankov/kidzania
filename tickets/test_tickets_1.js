var TicketsPage = require('./page-models/tickets');
var assert = require('assert') 
var webdriverio = require('webdriverio');


const BUG1 = true; //Logo always leads to Russian page

var steps = [
	"Discription:\tCheck different links to the tickets page",
    "1. Open 'Что такое Кидзания?' page (Russian) (https://kidzania.ru/ru/about/)",
    "2. Click on 'Билеты' link",
    "3. Check russian ticket page is opened (https://kidzania.ru/ru/tickets/)",
    "4. Click on 'Кидзания в мире' button",
    "5. Check russian version of 'Кидзания в мире' page is opened (https://kidzania.ru/ru/world/)",
    "6. Click on Russian flag and change language to English",
    "7. Click on 'Tickets' link",
    "8. Check English version of tickets page is opened (https://kidzania.ru/en/world/)",
    "9. Click on Kidzania logo",
    "10. Click on English flag and change language to Russian",
    "11. Click on 'Купить билет'",
    "12. Check russian version of tickets page is opened (https://kidzania.ru/ru/world/)"
]

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var language = "ru/"

console.log(steps[0]);
 
var client = webdriverio
    .remote(options)
	.init();
	
console.log(steps[1]);
	
client.addCommand("getUrlAndTitle", function() {
    return this.getUrl().then(function(urlResult) {
        return this.getTitle().then(function(titleResult) {
			return { url: urlResult, title: titleResult };
        });
    });
});

var currentURL = TicketsPage.mainURL+language+'about/'
client.url(currentURL)
    .getUrlAndTitle()
		.then(function(result){
			TicketsPage.assertUrlTitle(result, currentURL, TicketsPage.aboutTitleR);
			console.log(steps[2]);
		})
	.click('=Билеты')
	.getUrlAndTitle()
		.then(function(result){
			console.log(steps[3]);
			currentURL = TicketsPage.mainURL+language+'tickets/';
			TicketsPage.assertUrlTitle(result, currentURL, TicketsPage.ticketsTitleR);
			console.log(steps[4]);
		})
	.click('=Кидзания в мире')
	.getUrlAndTitle()
		.then(function(result){
			console.log(steps[5]);
			currentURL = TicketsPage.mainURL+language+'world/';
			TicketsPage.assertUrlTitle(result, currentURL, TicketsPage.worldTitleR);
			console.log(steps[6])
		})
	//Click to open menu with languages
	.click(TicketsPage.languageHeader)
	.waitForVisible('=English', 3000)
	.click('=English')
		.then(function(result){
			console.log(steps[7])
			language = "en/"
		})
	.click('=Tickets')
	.getUrlAndTitle()
		.then(function(result){
			console.log(steps[8])
			currentURL = TicketsPage.mainURL+language+'tickets/';
			TicketsPage.assertUrlTitle(result, currentURL, TicketsPage.ticketsTitleE);
			console.log(steps[9])
		})
	.click(TicketsPage.logoHeader)
		.then(function(result){
			if (BUG1){
				console.log('Clicking logo causes changing language, Step 10 skiped');
				language = "ru/";
				console.log(steps[11])
			}
			else{
				console.log(steps[10])
			}
			
		})
	/* This is comented because of BUG1 too
	.click(TicketsPage.languageHeader)
	.waitForVisible('=Русский', 3000)
	.click('=Русский')
		.then(function(result){
			console.log(steps[11])
			language = "ru/"
		})
		*/
	.click('=Купить билет')
	.getUrlAndTitle()
		.then(function(result){
			console.log(steps[12])
			currentURL = TicketsPage.mainURL+language+'tickets/';
			TicketsPage.assertUrlTitle(result, currentURL, TicketsPage.ticketsTitleR);
		})	
	.end();
