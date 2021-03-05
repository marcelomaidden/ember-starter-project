import Route from "@ember/routing/route";
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  model(params={id: 1}) {
    return this.store.query('question', 
      {
        user: this.currentSession.user.id, 
        page: params.id
      }
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
  }
});
