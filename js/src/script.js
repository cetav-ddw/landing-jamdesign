$(document).ready(function() {
    var compiledItemTpl = _.template($('#resultsTpl').html());
    var currentPage = 1;

    $.getJSON("//spreadsheets.google.com/feeds/list/132bWfAvCKsstaD3o7j3AZflDLDJ-K2u_N99DsK97Xcg/od6/public/values?alt=json",
        function(data) {
            var results = data.feed.entry;
            window.JL = { results: results };
            var pages = JL.results.length / 20;

            var $results = $(compiledItemTpl({
                results: results
            }));

            $results.appendTo($('#results-container'));

            initLazyLoad();
    });

    var starFieldStarted = function() {
        var container = document.getElementById('startfield');
        var starfield = new Starfield();
        starfield.initialise(container);
        starfield.start();

        function randomise() {
            starfield.stop();
            starfield.stars = Math.random()*1000 + 50;
            starfield.minVelocity = Math.random()*30+5;
            starfield.maxVelocity = Math.random()*50 + starfield.minVelocity;           
            starfield.start();
        }
    };

    starFieldStarted();


    var initLazyLoad = function() {
        var windowHeight = $(window).height();
        prepareLazyload(windowHeight);

        $(window).scroll(function() {
            console.log('executing...');
            prepareLazyload(windowHeight);
        });
    }

    var prepareLazyload = function(windowHeight) {
        var scrolled = $('body').scrollTop() + windowHeight;
        var $images = $('.js-lazyload[data-src^="http"]');
        if (!$images.length) {
            $(window).off('scroll');
        }
        var preQueue = [];
        var queue = [];

        _.each($images, function(img) {
            img.scrollEntry = $(img).offset().top;
            preQueue.push(img);
        });

        var queue = _.filter(preQueue, function(img, idx) {
            return img.scrollEntry < scrolled;
        });

        doLazyLoad(queue);
    }

    var doLazyLoad = function(queue) {
        _.each(queue, function(img) {
            $(img).attr('src', $(img).data('src'));
            $(img).removeAttr('data-src');
        });
    }

}); // end document.ready