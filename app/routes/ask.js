import Route from '@ember/routing/route';
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  model() {
    return this.store.createRecord('question',
    {title: '', description: '', tags: '', user: this.currentSession.user.id})
  },
  actions: {
    async create() {
      const question = this.controller.model;
      await question.save()
      .then(() => this.transitionTo('index', 1, 'all'))
      .catch(
        () => {
          this.controller.set("errorMessage", 'Please, fix all errors and try again');
        }
      )
    }
  }
});
