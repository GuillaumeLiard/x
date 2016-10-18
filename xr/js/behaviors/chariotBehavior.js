var newX;
var widthScratch = 480*0.8;
// var widthChariot;
var wChariot;
var wGame;

var ChariotBehavior = Mn.Behavior.extend({
    ui:{
        chariot:'#chariot',
        path:'#chariot g g path'
    },
  modelEvents: {
    'change:x': 'xChanged'
},
onAttach:function(){
    wChariot = this.ui.chariot.width();
    wGame = this.view.$el.width();

    tl.to(this.ui.chariot, 0, {opacity:1},"intro2")
    .fromTo(this.ui.path, 1, {fill:color1}, {fill:color5},"intro2");
},
  xChanged: function(event) {
      newX = this.view.model.get('x');
      var newLeft = 50+(newX*widthScratch/wGame)-((100*wChariot/wGame)/2);
      TweenLite.to(this.ui.chariot, 1, {left:newLeft+"%"});
  }
});
