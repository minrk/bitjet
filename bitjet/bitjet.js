define(function(require) {
   var widget = require("widgets/js/widget");

   var BitView = widget.DOMWidgetView.extend({
       render: function() {
           
           // Create the viewing frame.
           this.$frame = $('<canvas/>')
               .css({
                   overflow: 'hidden',
                   width:  650,
                   height: 650,
                   border: '1px solid grey'
               }).appendTo(this.$el);


           this.model.on('change:data', this._redraw, this);
           this.model.on('change:bitwidth', this._redraw, this);
           this.model.on('change:blockwidth', this._redraw, this);
           this.model.on('change:blockheight', this._redraw, this);
           this._redraw();
       },

       _redraw: function() {
          // Grab the canvas context
          var canvas = this.$frame[0];
          var context = canvas.getContext("2d");

          context.clearRect ( 0 , 0 , canvas.width, canvas.height );

          var data = this.model.get("data");
          // data will come in as a list traitlet
          var bitwidth = this.model.get("bitwidth");

          var width = this.model.get("blockwidth");
          var height = this.model.get("blockheight");

          var that = this;
          data.forEach(function(el, idx) {
            if(el) {

              var x = (idx % bitwidth)*width;
              var y = (Math.floor(idx/bitwidth))*height;

              context.fillRect(x,y,width,height);

            }
          });

       },
   });

   return {
       BitView: BitView
   };
});