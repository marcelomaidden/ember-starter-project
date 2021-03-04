import Route from '@ember/routing/route';
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  model(params) {
    return this.store.findRecord('question', params.id);
  },
  afterModel(model) {
    if (model.tags) {
      let tags = '';
      model.tags.forEach(tag => {
        tags += `${tag.name},`;
      })
      model.set('tags', tags.slice(0, tags.length - 1));
    }
    
    if (Number(this.currentSession.user.id) === Number(model.user.id))
      model.set('user', model.user.id)
  },
  actions: {
    async update() {
      const question = this.controller.model;
      if (Number(this.currentSession.user.id) !== Number(question.user))
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
