var _ = require('underscore');
var Backbone = require('backbone');
var Mn = require('backbone.marionette');
require('gsap');

var game = Backbone.Radio.channel('game');
var bad = null;
var gameOver = null;

module.exports = Mn.Behavior.extend({
    modelEvents: {
        'change:keyTouchRail': 'handleBad',
        'change:keyTouchChariot': 'handleGood',
    },
    ui:{
        key:'#key',
        chariot:'#chariot',
        rail:'#rail',
        railPath:'#rail g path',
        score:'#score',
        life:'#life',
        lifePath:'#life path',
        lifeSpan:'#life tspan',
        lifeIcon:'#life-icon',
        lifeIconPath:'#life-icon path',
        scoreIcon:'#score-icon',
        output:'#layerOutputs',
    },
    initialize:function(){
        _.bindAll(this,'loseLife');
        bad = new TimelineMax();
        gameOver = new TimelineMax();
    },
    onAttach:function(){
        bad.addLabel('bad')
        .fromTo(this.ui.rail, 0.3, {y:"+=-2"}, {y:"+=2", ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false})})
        .to(this.ui.railPath, 0.3, {fill:"red"},0)
        .to(this.ui.railPath, 0.3, {fill:"#dcfafc"})
        .to(this.ui.key, 0.3, {scale:0,opacity:0,transformOrigin:'50% 100%'},0.3)
        .fromTo(this.ui.lifeIcon, 0.3, {y:"+=-2"}, {y:"+=2", ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false})},0)
        .to(this.ui.lifeIconPath, 0.3, {fill:"red"},0)
        .to(this.ui.lifeIconPath, 0.3, {fill:"#dcfafc",onComplete:this.loseLife});
        // bad.stop();
        bad.pause();

        gameOver.addLabel('gameOver')
            .to(this.ui.life,1,{y:"+100",scale:2})
            .to(this.ui.lifePath,1,{fill:"red"},0)
            .to(this.ui.lifeSpan,1,{fill:"red"},0)
            .to(this.ui.key, 0.3, {opacity:0})
            .to(this.ui.chariot, 0.3, {opacity:0})
            .to(this.ui.rail, 0.3, {opacity:0})
            .to(this.ui.life,1,{opacity:0})
            .to(this.ui.score,1,{scale:3,x:-240,y:120});
        gameOver.pause();
    },

    handleBad:function(){
        if(this.view.model.get('keyTouchRail')){
            console.log('b');
            // bad.restart();
            bad.play('bad');
            console.log('c');
        }
    },
    loseLife:function(){
        console.log('a');
        this.view.model.set('life',this.view.model.get('life')-1,{validate:true});
        if(this.view.model.get('life')===0){
            console.log('game over fdsfdg');
            this.gameOver();
        }else{
            game.trigger('key:launch');
        }


    },
    handleGood:function(){
        if(this.view.model.get('keyTouchChariot')){
            console.log('good');
        }
    },
    gameOver:function(){
        gameOver.play('gameOver');
        // gameOver.restart();


        // gameOver.to(this.ui.scoreIcon, 0.3, {opacity:1});
        // gameOver.stop();
        // game.trigger('inputs:hide');
        console.log('game over g');
    },


});
