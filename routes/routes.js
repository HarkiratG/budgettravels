Router.map(function(){

    //home
    this.route('root', {
        path: '/',
        template: 'main'
    });

    this.route('cityAttraction', {
        path: '/cityAttraction/:_id',
        template: 'cityAttraction'
    });

});