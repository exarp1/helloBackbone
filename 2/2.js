(function($) {
  var ListView = Backbone.View.extend({
    // el attaches to existing element
    el: $('body'),
    events: {
      'click button#add': 'addItem',
    },
    initialize: function() {
      // every function that uses 'this' as the current
      // object should be in here
      _.bindAll(this, 'render', 'addItem');

      // total number of items added thus far
      this.counter = 0;
      this.render();
    },

    render: function() {
      var $el = $(this.el);
      $el.append(this.buttonTemplate({str: 'Add list item'}));
    },

    helloWorldTemplate: _.template(
      '<li> Hello World!, this is message #<%=this.counter%></li>',
    ),

    buttonTemplate: _.template('<button id="add"><%=str%></button><ul></ul>'),

    addItem: function() {
      this.counter++;
      var $el = $('ul', this.el);
      $el.append(this.helloWorldTemplate(this.counter));
    },
  });

  var listView = new ListView();
})(jQuery);
