$(document).ready(function() {
    $.getJSON("https://spreadsheets.google.com/feeds/list/132bWfAvCKsstaD3o7j3AZflDLDJ-K2u_N99DsK97Xcg/od6/public/values?alt=json", function(data) {

        var entry = data.feed.entry;
        $(entry).each(function() {
            $('.results').prepend('<li class="results-item"><a class ="image" href="'+ this.gsx$url.$t+'"><img src="'+ this.gsx$image.$t+'" alt="'+ this.gsx$caption.$t+'"/><span class="title">'+this.gsx$caption.$t+'</span></a><span class="date">'+this.gsx$date.$t+'</span></li>');
        });
    });

}); // end document.ready