import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model(params={id: 1}) {
    return this.store.query('question', {page: params.id});
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
  }
});
