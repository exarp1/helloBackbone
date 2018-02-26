(function($) {
  var ListModel = Backbone.Model.extend({
    defaults: {
      message: 'Hello World #',
      value: 0,
    }
  
  });
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element

    events: {
      'click button#add': 'addItem',
      'click button#subtract': 'subItem'
    },

    initialize: function(){
      // Every function that uses 'this' as the current
      // object should be in here...
      _.bindAll(this, 'render', 'addItem', 'subItem');
      this.counter = 0; // total number of items added thus far
      this.render();
    },

    myTemplate: _.template('<li> <%= message %> <%= value %> </li>'),
    
    render: function(){
      $(this.el).append("<button id='add'> Add list item</button>");
      $(this.el).append("<button id='subtract'> Subtract list item</button>");
      $(this.el).append("<ul></ul>");
    },

    addItem: function(){
      var val = this.model.get('value');
      val++;
      this.model.set({ value: val });
      $('ul', this.el).append( this.myTemplate(this.model.toJSON()));
    },

    subItem: function(){
      var val = this.model.get('value');
      val--;
      this.model.set({ value: val });
      $('ul', this.el).append( this.myTemplate(this.model.toJSON()));
    }
  });

  var listModel = new ListModel();
  var listView = new ListView({ model: listModel });
})(jQuery);
