(function ($) {
  // Model for each item
  var Item = Backbone.Model.extend({
    defaults: { part1: 'Hello', part2: 'World!', },
  });

  // Collection of Items
  var List = Backbone.Collection.extend({
    model: Item,
  });

  // Item View Class - Responsible for rendering each individual Item (model)
  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of (orphan) root tag in this $el
    initialize: function () {
      // every function that uses 'this' as the current object should be here.
      _.bindAll(this, 'render');
    },
    template: _.template('<span><%= part1 %> <%= part2 %></span>'),
    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this; // for chainable calls, like .render().el
    },
  });

  // List View Class - responsible for rendering a list of Items
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    events: {
      'click button#add': 'addItem',
    },
    initialize: function () {
      // every function that uses 'this' as the current object should be in here
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

      this.counter = 0;
      this.render();
    },
    template: _.template('<button id="add">Add list item</button> <ul></ul>'),
    render: function () {
      var self = this;
      $(this.el).append(this.template());
      _(this.collection.models).each(function (item) { // in case collection is not empty
        self.appendItem(item);
      }, this);
    },
    addItem: function () {
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + ' (#' + this.counter + ')' // modify item defaults
      });
      this.collection.add(item);
    },
    // appendItem() is no longer responsible for rendering an individual Item.
    // This is now delegated tothe render() method of each ItemView instance.
    appendItem: function (item) {
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  this.listView = new ListView();

})(jQuery);
