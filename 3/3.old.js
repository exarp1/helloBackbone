(function($) {
  // Model with parts of message
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'Hello',
      part2: 'World',
    },
  });

  var List = Backbone.Collection.extend({
    model: Item,
  });

  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem',
      'click button#remove': 'removeItem',
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'removeItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder
      this.collection.bind('remove', this.appendItem); // collection event binder

      this.counter = 0;
      this.render();
    },
    render: function() {
      var self = this; // save reference to this so it can be accessed from within the scope of the callback below.
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<button id='remove'>Remove list item</button>");
      $(this.el).append('<ul></ul>');
      _(this.collection.models).each(function(item) {
        // in case collection is not empty
        self.appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new Item();
      // Modify item defaults
      item.set({
        part2: item.get('part2') + ' #' + this.counter, // modify item defaults
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
    },

    removeItem: function() {
      this.counter--;
      var item = new Item();
      item.set({
        part2: item.get('part2') + ' #' + this.counter,
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      $('ul', this.el).append(
        '<li>' + item.get('part1') + ' ' + item.get('part2') + '</li>',
      );
    },
  });

  var listView = new ListView();
})(jQuery);
