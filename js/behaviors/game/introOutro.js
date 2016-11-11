var _ = require('underscore');
var Backbone = require('backbone');
var Mn = require('backbone.marionette');
require('gsap');

module.exports = Mn.Behavior.extend({
    timelines:Backbone.Radio.channel('timelines'),
    master:new TimelineMax({paused:true}),
    initialize:function(){
        _.bindAll(this,'introEnd');
    },
    onInit:function(){
        this.buildMasterTimeline();
    },
    onIntro:function(){
        this.startIntro();
    },
    onOutro:function(){
        this.startOutro();
    },
    buildMasterTimeline:function(){
        // console.log('abcd');
        this.master
            .addLabel("intro")
            .add(this.timelines.request('input:intro'))
            .add(this.timelines.request('output:intro'),"=-1.5")
            .add(this.introEnd)
            .addLabel("ready")
            .addPause("ready+=0.1")
            .addLabel("outro")
            .add(this.timelines.request('output:outro'))
            .add(this.timelines.request('input:outro'),"=-2");
        // this.master.timeScale(1.2);
    },
    startIntro:function(){
        this.master.play("intro");
    },
    startOutro:function(){

        this.master.play("outro");
    },
    introEnd:function(){
        this.view.triggerMethod('start');
    }
});
