(function($){

  var ListModel = Backbone.Model.extend({
    defaults: {
      name : 'checklist',
      value : 'HelloWorld',
      checked : true,
      first: 'My first list item in Backbone!',
      second: 'organic salad veg x3',
      third: 'organic salad greens x4',
      fourth: 'Costco:  2 fruit, 5 portions each go @4pm',
      fifth: 'Walmart 4x 1L round pyrex food storage containers'
    }
  });

  var ListView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element (body)

    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

      this.render(); // not all views are self-rendering. This one is.
    },

    myTemplate: _.template('\
      <ul> \
        <input type="checkbox" name="<%=name%>" value="Hello World!" checked>\
        <li><%=first%></li>\
        <li><%=second%></li>\
        <li><%=third%></li>\
        <li><%=fourth%></li>\
        <li><%=fifth%></li>\
      </ul>'), 
    render: function(){
      this.$el.html( this.myTemplate(this.model.toJSON()));
    }
  });

  var  listModel = new ListModel();
  var listView = new ListView({ model: listModel});
})(jQuery);
