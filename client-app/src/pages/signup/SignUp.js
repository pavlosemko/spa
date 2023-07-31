import Component from "@/plugins/component";
import "./signup.scss";
import { AsNode } from "@/common/decorators";
import Button from "@/common/components/Button/Button";
import SignUpInput from "@/pages/signup/SignUpInput";
import Heading from "@/common/components/Heading/Heading";
import { router } from "@/router/router";

export default class SignUp extends Component {
  updateTemplate(template) {
    const FormHeading = new Heading({
      tagName: "h1",
      text: "Please sign Up",
      classList: ["h3", "mb-3", "fw-normal"],
    });
    const LoginInput = new SignUpInput({
      type: "email",
      name: "login",
      id: "login",
      label: "Login",
    });

    const PasswordInput = new SignUpInput({
      type: "password",
      name: "password",
      id: "password",
      label: "Password",
    });

    const FormButton = new Button({
      type: "submit",
      text: "Sign Up",
      classList: ["btn-primary", "w-100", "py-2"],
    });
    const SingInButton = new Button({
      type: "button",
      text: "Sign In",
      classList: ["btn-outline-primary", "w-100", "py-2", "mt-3"],
      onClick(e) {
        e.preventDefault();
        router.go("/sign-in");
      },
    });

    return this.replaceSlot(
      template,
      { key: 'slot[name="header"]', replacer: () => FormHeading.render() },
      { key: 'slot[name="login"]', replacer: () => LoginInput.render() },
      { key: 'slot[name="password"]', replacer: () => PasswordInput.render() },
      { key: 'slot[name="button"]', replacer: () => FormButton.render() },
      {
        key: 'slot[name="sing-in-button"]',
        replacer: () => SingInButton.render(),
      },
    );
  }
  @AsNode
  getTemplate() {
    return `
              <div class="form-signup w-100 mx-auto">
                <form>
                    <slot name="header"></slot>
                    <slot name="login"></slot>
                    <slot name="password"></slot>
                    <slot name="button"></slot>
                </form>
                    <slot name="sing-in-button"></slot>
              </div>
          `;
  }
  render() {
    return this.updateTemplate(this.getTemplate());
  }
}
