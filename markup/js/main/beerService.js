var beerService =  {
  endpoint: 'http://api.punkapi.com/v2/beers',
  currentBeersList: [],
  beersList: [],
  getList: function() {
    return $.ajax({
      url: this.endpoint
    });
  },
  filterByName: function(beers, name) {
    return beers.filter(function(el) {
      return el.name.toLowerCase().indexOf(name) > -1;
    });
  },
  sortByName: function(beers, fieldName, order) {
    beers.sort(function(a, b) {
      if (a[fieldName] > b[fieldName]) {
        return order =='asc' ? 1 : -1;
      }
      if (a[fieldName] < b[fieldName]) {
        return order =='asc' ? -1 : 1;
      }
      return 0;
    });
    return beers;
  },
  getBeerById: function(beers, beerId){
    return beers.filter( function(el){
      return el.id == beerId;
    });
  }
};