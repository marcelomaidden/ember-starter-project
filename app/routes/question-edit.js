import Route from '@ember/routing/route';
import { inject } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: inject(),
  oldTags: '',
  model(params) {
    return this.store.findRecord('question', params.id);
  },
  afterModel(model) {
    this.oldTags = model.tags;
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
    openModal: function(modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    async delete() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
      const question = this.controller.model;
      if (Number(this.currentSession.user.id) !== Number(question.user))
      {
        question.set('tags', this.oldTags);
        this.controller.set("errorMessage", 'User is not allowed to delete this question');
      }        
      else {
        const question = this.controller.model;
        await question.deleteRecord()
        if (question.isDeleted)
        {
          question.save();
          this.transitionTo('index', 1)
        }        
        else
        {
          this.controller.set('errorMessage', 'An error ocurred while trying to delete');
          question.set('tags', this.oldTags);
        }
      }
    },
    async update() {
      const question = this.controller.model;
      if (Number(this.currentSession.user.id) !== Number(question.user)) {
        question.set('tags', this.oldTags);
        this.controller.set("errorMessage", 'User is not allowed to change this question');
      }
      else {
        await question.save()
        .then(() => this.transitionTo('index', 1))
        .catch(
          () => {
            this.controller.set("errorMessage", 'Please, fix all errors and try again');
          }
        )
      }
    }
  }
});
