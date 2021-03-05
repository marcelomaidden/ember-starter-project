import Route from '@ember/routing/route';

export default Route.extend({
  filter: 'all',
  model(params={page:1, tag:'all'}) {
    const filterParams = {
      page: params.page
    }

    this.filter = params.tag;
    if (params.tag && params.tag !== 'all')
      filterParams.tag = params.tag;

    return this.store.query('question', 
      filterParams
    );
  },
  afterModel(model) {
    let page = 1;
    let pages = [];
    if (model.content) {
      while(page <= Number(model.content.firstObject.__data.pages)) {
        pages.push(page);
        page++;
      }
    }
    model.set('pages',pages);
    model.set('filter', this.filter);
  }
});
