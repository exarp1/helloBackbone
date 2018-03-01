(function($) {

  // Model with parts of message
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'This is the first part.',
      part2: ' This is the second part,',
      part3: ' and this is the third part!'
    }
  });


  var List = Backbone.Collection.extend({
    model: Item
  });

  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem'
    },

    initialize: function(){
      // remember: every function that uses 'this' as the current object
      // should be in the _.bindAll arguments list.
      _.bindAll(this, 'render', 'addItem', 'appendItem');
      
      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

      this.counter = 0; // start with 0 counter
      this.render(); // automagically render when initializing this view.
    },

    render: function(){
    
      var self = this;
      $(this.el).append('<button id="add">Add list item</button>');
      $(this.el).append('<ul></ul>');
      _(this.collection.models).each(function(item){ // in case collection is not empty
        self.appendItem(item);
      }, this);
    },


    addItem: function(){
      this.counter++;
      var item = new Item();
      // Modify item defaults
      item.set({
        part1: ' #' + this.counter + ': ' + item.get('part1')
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
    },


    appendItem: function(item){
      $('ul', this.el).append('<li>' + item.get('part1') + ' ' + item.get('part2') + ' ' + item.get('part3') + '</li>');
    }
  });

  var listView = new ListView();
})(jQuery);
