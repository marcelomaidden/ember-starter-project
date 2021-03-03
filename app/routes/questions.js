import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    if (params.id)
      return this.store.findRecord('question', params.id);
    else
      return this.store.createRecord('question');
  },
});
