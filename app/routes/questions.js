import Route from '@ember/routing/route';
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  model(params) {
    return this.store.findRecord('question', params.id);
  },
  actions: {
    async update() {
      const question = this.controller.model;
      if (Number(this.currentSession.user.id) !== Number(question.user.id))
        this.controller.set("errorMessage", 'User is not allowed to change this question');
      else {
        await question.save()
        .then(() => this.transitionTo('index'))
        .catch(
          () => {
            this.controller.set("errorMessage", 'Please, fix all errors and try again');
          }
        )
      }
    }
  }
});
