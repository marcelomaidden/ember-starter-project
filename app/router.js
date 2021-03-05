import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("index", { path: "index/:id" });
  this.route("login");
  this.route("signup");
  this.route("dashboard", { path: "dashboard/:id" });
  this.route("question-edit", { path: 'question-edit/:id' });
  this.route('question-slug-from-title', { path: 'question-slug-from-title/:id' });
  this.route('ask')
});

export default Router;
