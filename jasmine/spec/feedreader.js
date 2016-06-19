/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        //checks allFeeds has feeds
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //checks feeds have url property and isnt null
         it('has url and isnt null' , function(){
           for(feed in allFeeds){
             expect(allFeeds[feed].url).toBeDefined();
             expect(allFeeds[feed].url.length > 0).toBe(true);
           }
         });

        //checks feeds have name and isnt null
         it('has name and isnt null', function(){
           for (feed in allFeeds){
             expect(allFeeds[feed].name).toBeDefined();
             expect(allFeeds[feed].name.length > 0).toBe(true);
           }
         });

    });

        describe('The menu', function(){

          //checks default class of menu to be hidden
          it('has a hidden menu', function(){
            //used hasClass method of jQuery to acknowledge class
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

          //checks menu display on clicks
          it('shows and hides on clicks', function(){
            $('.menu-icon-link').click(); //stimulating click using js
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

          });

        });


        describe('Initial Entries', function(){
          beforeEach(function(done){
            loadFeed(0, done);
          });
          //checks for minimum one entry
          it('have a single entry', function(done){
            expect($('.feed .entry').length > 0).toBe(true);
            done();
          });

        });


         describe('New Feed Selection', function(){
           var $feed;
           var $newfeed;

           beforeEach(function(done){
             loadFeed(0, function(){ //load1
               $feed = $('.header-title').html();
               loadFeed(1, function(){ //nested load2 to meet async function demands
                 $newfeed = $('.header-title').html();
                 done();
               });
             });
           });


           it('Feed change at Reload', function(done){
             expect($feed).not.toEqual($newfeed);
             done();
           });

         });

}());
