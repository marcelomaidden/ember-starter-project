import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("index", { path: "" });
  this.route("login");
  this.route("signup");
  this.route("dashboard");
  this.route("question-edit", { path: 'question-edit/:id' });
  this.route('question', { path: 'question/:id' });
  this.route('ask')
});

export default Router;
