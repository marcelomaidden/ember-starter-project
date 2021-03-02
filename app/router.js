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
  //this.route("dashboard", { path: "" }, function() {});
  this.route("dashboard");
  this.route('questions', function(){
    this.route('edit', { path: '/:question_id' });
  });
});

export default Router;
