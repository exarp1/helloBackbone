(function($) {
  // Item class
  // The atomic part of the Model
  // Models are a javascript object with helper functions
  // to handle event triggering, persistence, etc.
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'Hello',
      part2: 'World!',
    },
  });

  // List collection. A collection  of Items.
  // an array of Model objects with some helper functions for
  // finding items in the list, and add/removing them, etc.
  var List = Backbone.Collection.extend({model: Item});

  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem',
    },

    initialize: function() {
      // every function that uses 'this' as the current
      // object should be in here
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

      this.counter = 0;
      this.render();
    },

    buttonTemplate: function makeButton() {
      return _.template('<button id="add">Add list item </button> <ul></ul>');
    },

    render: function() {
      $(this.el).append(this.buttonTemplate());

      // in case collection is not empty
      _(this.collection.models).each(function(item) {
        this.appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter, // modify item defaults
      });

      // add item to collection
      // view is updated via event 'add'
      this.collection.add(item); // add item to collection;
    },

    listItemtemplate: _.template('<li><%= part1 %> <%= part2 %> </li>'),

    appendItem: function(item) {
      var $el = $('ul', this.el);
      $el.append(this.listItemtemplate(item.toJSON()));
    },
  });

  var listView = new ListView();
})(jQuery);
