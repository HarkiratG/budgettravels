Router.map(function(){

    //home
    this.route('root', {
        path: '/',
        template: 'main'
    });

    this.route('cityAttractions', {
        path: '/cityAttraction/:_id',
        template: 'cityAttractions'
    });

});