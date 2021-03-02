import DS from 'ember-data';

const { Model, hasMany, attr } = DS;

export default Model.extend({
  title: attr("string"),
  description: attr("string"),
  user: attr({
    defaultValue() {
      return {}
    }
  }),
  tags: attr({
    defaultValue() {
      return {}
    }
  }),
});
