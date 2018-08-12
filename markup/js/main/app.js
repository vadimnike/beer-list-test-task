//Beers variables
var $beersContainer = $("#beers-container");

//Sorting variables
var $dropItem = $('.drop-down .drop-down-list li');

//Beer modal variables
var $body          = $('body');
var $popupBackdrop = $('.popup-backdrop');
var $popupWrapper  = $('#popup-wrapper');


function handlerBarService(renderContainer, data){
    var $source   = document.getElementById(renderContainer).innerHTML,
      $template = Handlebars.compile($source),
      $html     = $template(data);

    return $html;
}

function initializeEvent(){

    //Loader Functionality
    function loading(){
        $('.loader-wrap').show();
    }

    function noLoading(){
        $('.loader-wrap').hide();
    }

    $( document ).ajaxStart(function() {
        loading();
    });

    $( document ).ajaxComplete(function(){
        noLoading();
    });

    //SEARCH FUNCTIONALITY
    $('#find-beer').click( function(){
        $beersContainer.html('');
        var $searchVal = $('.search-by-beer').val(),
          $searchData = beerService.filterByName( beerService.beersList, $searchVal);
        beerService.currentBeersList = $searchData;
        var $html = handlerBarService("blocks", $searchData);
        $('.search-by-beer').val('');


        $('.sort-by').val('');
        $('.sort-by').attr('data-sort-field', 'all');
        $('.sort-by').attr('data-sort-type', 'all');
        $dropItem.removeClass('active');

        $beersContainer.append($html);
    });


    //BEER MODAL FUNCTIONALITY

    $(document).on('click', '.beer',function(){
        var $currentBeer = beerService.getBeerById(beerService.currentBeersList, $(this).attr('data-popup-id')),
          $html = handlerBarService("popup", $currentBeer);
        $body.addClass('overlay');
        $popupBackdrop.toggleClass('hide');
        $popupWrapper.append($html);
    });

    $(document).on('click', '.popup .close', function(){
        $body.removeClass('overlay');
        $popupBackdrop.toggleClass('hide');
        $popupWrapper.html('');
    });

    //SORTING BY CLICK ON DROPDOWN

    $(document).on('click touch','.drop-down', function(){
        $(this).toggleClass('active');
    });


    $dropItem.on('click touch', function (e) {
        $beersContainer.html('');
        var $sortControl = $(this).closest('.drop-down').find('input');
        var $currentItem = $(e.target);
        var $eachItems = $(this).closest('.drop-down').find('.drop-down-list li');
        $eachItems.removeClass('active');
        $currentItem.addClass('active');
        $sortControl.val($currentItem.text());
        $sortControl.attr('data-sort-field', $currentItem.attr('data-sort-field'));
        $sortControl.attr('data-sort-type', $currentItem.attr('data-sort-type'));
        var $dataSortField =  $sortControl.attr('data-sort-field');
        var $dataSortType = $sortControl.attr('data-sort-type');
        var $sortedArray = beerService.sortByName(beerService.currentBeersList, $dataSortField, $dataSortType);
        beerService.currentBeersList = $sortedArray;
        var $html = handlerBarService("blocks", $sortedArray);
        $beersContainer.append($html);
    });

    $(document).click(function (e) {
        var $dropDownOpened = $('.drop-down');
        if (!$dropDownOpened.is(e.target) && $dropDownOpened.has(e.target).length === 0) {
            $('.drop-down').removeClass('active');
        }
    });
}

//APP
var app = {
  init: function() {
    initializeEvent();
    beerService.getList().then(function(beers) {
      beerService.currentBeersList = beers;
      beerService.beersList = beers;

      //Render beers
      var $html = handlerBarService("blocks", beers);
      $beersContainer.append($html);
    });
  }
};

$(document).ready(function() {
  app.init();
});