import Route from '@ember/routing/route';
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  question: '',
  model(params) {
    this.question = this.store.findRecord('question', params.id);
    return this.store.createRecord('answer', {body: '', question: this.question});    
  },
  actions: {
    async create() {
      const questionModel = this.controller.model;
      const answer = await this.store.createRecord('answer');
      answer.set('question', questionModel.id);
      answer.set('user', this.currentSession.user.id);
      answer.set('body', this.controller.model.body);
      await answer.save()
      .then(() => this.transitionTo('index'))
      .catch(
        ({errors}) => {
          this.controller.set("errors", errors)
          this.controller.set("errorMessage", 'Please, fix all errors and try again');
        }
        )
    }
  }
});
