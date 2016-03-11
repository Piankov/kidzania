var TicketsPage = require('./tests/page-models/tickets');
var Promise = require('bluebird');
var should = require('should');
exports.config = {
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    host: 'localhost',
    port: 4444,
    specs: [
        './tests/tickets/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilties at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude option in
    // order to group specific specs to a specific capability.
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        browserName: 'chrome'
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'error',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", the base url gets prepended.
    baseUrl: 'https://kidzania.ru/',
    //
    // Default timeout for all waitForXXX commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as property. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specfic job you don't want to take care of. They enhance
    // your test setup with almost no self effort. Unlike plugins they don't add new
    // commands but hook themself up into the test process.
    // services: [],//
    // Framework you want to run your specs with.
    // The following are supported: mocha, jasmine and cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    // reporters: ['dot'],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides a several hooks you can use to intefere the test process in order to enhance
    // it and build services around it. You can either apply a single function to it or an array of
    // methods. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function (config, capabilities) {
    // },
    //
    // Gets executed before test execution begins. At this point you can access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
     before: function (capabilties, specs) {
        browser.addCommand("getUrlAndTitle", function() {
            return this.getUrl().then(function(urlResult) {
                return this.getTitle().then(function(titleResult) {
                    return { url: urlResult, title: titleResult };
                });
            });
        });
        browser.addCommand("getTotalDate", function() {
            return this.waitForExist('.tickets-date__format')
                    .element('.tickets-date__format')
                        .then(function(result) {
                            return browser.elementIdText(result.value.ELEMENT);
                        })
                            .then(function(result){
                                return result.value;
                            });
        });
        browser.addCommand("getElementDateByID", function(elem) {
            return this.elementIdAttribute(elem,'data-date-key')
                .then(function(result){
                    return TicketsPage.getFormatedDate(result.value);
                });
        });
        browser.addCommand("getElementDateOppositeLangByID", function(elem) {
            return this.elementIdAttribute(elem,'data-date-key')
                .then(function(result){
                    return TicketsPage.getFormatedDateByLang(result.value, 1 - TicketsPage.language);
                });
        });
        browser.addCommand("getTotalSlot", function() {
            return this.waitForExist('.tickets-slot__format')
                    .element('.tickets-slot__format')
                        .then(function(result) {
                            return browser.elementIdText(result.value.ELEMENT);
                        })
                            .then(function(result){
                                return result.value;
                            });
        });
        browser.addCommand("getElementSlot", function(selector) {
            return this.element(selector)
                        .then(function(result) {
                            return browser.elementIdText(result.value.ELEMENT)
                        })
                            .then(function(result){
                                return result.value;
                            });
        });
        browser.addCommand("getElementSlotByID", function(elem) {
            return browser.elementIdText(elem)
                .then(function(result){
                    return result.value;
                });      
        });
        //here age is selector of coresponding icon.
        browser.addCommand("clickX", function(age) {
            return browser.elements('.tickets-product', function(err, res){
                return Promise.each(res.value, function (elem, index) {
                    return new Promise(function (resolve) {
                        browser.elementIdElement(elem.ELEMENT, age)
                            .then (function(res, err){
                                browser.elementIdElement(elem.ELEMENT, '.tickets-product__close')
                                    .then(function(res){
                                        browser.elementIdClick(res.value.ELEMENT)
                                            .then(function(result){
                                                resolve();
                                            });
                                    });
                            })
                            .catch (function(res, err){
                                resolve();
                            });
                    });
                });
            })
        });
        browser.addCommand("checkTicketsNumbers", function(sel, qty) {
            return browser.element(sel)
                .then(function(result) {
                    return browser.elementIdText(result.value.ELEMENT)
                        .then(function(result){
                            var str = result.value.match(/ (\d*) /)[1];
                            //console.log('compare ' + str +  ' with ' + qty);
                            //TODO: It hangs when qty != str
                            qty.should.be.eql(str);
                            return result;
                        });
                });
                   
        });
        browser.addCommand("getTicketsNumbers", function() {
            var resultArray = [0, 0, 0];
            var qty;
            return this.elements('.tickets-product', function(err, res){
                return Promise.each(res.value, function (elem, index) {
                    return new Promise(function (resolve) {
                        qty = 1;
                        browser.elementIdElement(elem.ELEMENT, '.tickets-product__quantity')
                            .then(function(res){
                                browser.elementIdText(res.value.ELEMENT)
                                    .then(function(result){
                                        qty = parseInt(result.value.match(/^(\d*)\D/)[1]);
                                        return result.value;
                                    });
                            })
                            .catch(function(res){
                                qty = 1;
                                return 1;
                            })
                        .elementIdElement(elem.ELEMENT, '.icon-child-carriage')
                            .then (function(res, err){
                                browser.checkTicketsNumbers(TicketsPage.carriage + ' .ticket_card_info-additional_info', qty)
                                    .then(function(res){
                                        resultArray[0] += qty;
                                        resolve();
                                    });
                            })
                            .catch (function(res, err){
                                browser.elementIdElement(elem.ELEMENT, '.icon-child-teen')
                                    .then (function(res, err){
                                        browser.checkTicketsNumbers(TicketsPage.teen + ' .ticket_card_info-additional_info', qty);
                                        resultArray[1] += qty;
                                        resolve();
                                    })
                                    .catch (function(res, err){
                                        browser.elementIdElement(elem.ELEMENT, '.icon-adult')
                                            .then (function(res, err){
                                                browser.checkTicketsNumbers(TicketsPage.adult + ' .ticket_card_info-additional_info', qty);
                                                resultArray[2] += qty;
                                                resolve();
                                            })
                                            .catch (function(res, err){
                                                console.log('res: ' + res);
                                                console.log('err: ' + err);
                                                resolve();
                                            });
                                    });
                            });
                    });
                });           
            })
            .then(function(res){
                return resultArray;
            });
        });

        browser.addCommand("isPayEnanbled", function(shouldBeEnabled) {
            return browser.element('.tickets-buy__button')
                .then(function(elem){
                    return browser.elementIdAttribute(elem.value.ELEMENT,'disabled')
                        .then(function(res){
                            if (shouldBeEnabled) should.not.exist(res.value);
                            else should.exist(res.value);
                        })
                });
        });
        
     },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeEach in Mocha)
    // beforeHook: function () {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function () {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     //beforeTest: function (test) {
     //   browser.localStorage('DELETE');
    // },
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function (commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function (commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // afterTest: function (test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function (suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    // after: function (capabilties, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    // onComplete: function(exitCode) {
    // }
}
