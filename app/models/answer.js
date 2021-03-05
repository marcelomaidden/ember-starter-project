import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  body: attr("string"),
  user: attr({
    defaultValue() {
      return {}
    }
  }),
  question: attr({
    defaultValue() {
      return {}
    }
  }),
});
