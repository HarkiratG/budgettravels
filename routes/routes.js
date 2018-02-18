Router.map(function(){

    //home
    this.route('root', {
        path: '/',
        template: 'main'
    });

    this.route('cityAttractions', {
        path: '/cityattraction/:_id',
        template: 'cityAttractions'
    });

});