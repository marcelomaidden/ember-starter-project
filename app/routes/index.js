import Route from '@ember/routing/route';

export default Route.extend({
  model(params={id: 1}) {
    return this.store.query('question', {page: params.id});
  },
  afterModel(model) {
    let page = 1;
    let pages = [];
    if (model.content.firstObject) {
      while(page <= Number(model.content.firstObject.__data.pages)) {
        pages.push(page);
        page++;
      }
    }
    model.set('pages',pages);
  }
});
