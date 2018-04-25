$(document).ready(function() {
  var ListModel = Backbone.Model.extend({
    defaults: {
      name: 'checklist',
      value: 'HelloWorld',
      checked: true,
      first: 'My first list item in Backbone!',
      second: 'organic salad veg x3',
      third: 'organic salad greens x4',
      fourth: 'Costco:  2 fruit, 5 portions each go @4pm',
      fifth: 'Walmart 4x 1L round pyrex food storage containers',
    },
  });
  var ListView = Backbone.View.extend({
    // attaches `this.el` to an existing element (body)
    el: $('body'),

    initialize: function() {
      // fixes loss of context for 'this' within methods
      _.bindAll(this, 'render');
      // not all views are self-rendering. This one is.
      this.render();
    },

    myTemplate: _.template($('#helloBackboneTemplate').html()),
    render: function() {
      this.$el.html(this.myTemplate(this.model.toJSON()));
    },
  });

  var listModel = new ListModel();
  var listView = new ListView({model: listModel});
});
