import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  session: service(),
  actions: {
    login(email, password) {
      this.get("session")
        .authenticate("authenticator:oauth2", email, password)
        .then(() => this.transitionTo("index", 1))
        .catch(() => {
          this.controller.set("errorMessage", "Invalid login.");
        });
    }
  }
});
