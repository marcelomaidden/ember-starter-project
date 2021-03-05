import Route from "@ember/routing/route";
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  filter: 'all',
  model(params={page: 1, tag: 'all'}) {
    const filterParams = {
      user: this.currentSession.user.id, 
      page: params.page,
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
    if (model.content.firstObject) {
      while(page <= Number(model.content.firstObject.__data.pages)) {
        pages.push(page);
        page++;
      }
    }
    model.set('pages',pages);
    model.set('filter', this.filter);
  }
});
