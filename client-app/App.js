import Component from "@/plugins/component";
import Loader from "@/common/components/loader/Loader";
import Alert from "@/common/components/alert/Alert";
import { AsNode } from "@/common/decorators";

export default class App extends Component {
  @AsNode
  getTemplate() {
    return `
            <main class="main-app d-flex min-vh-100">
               <div class="router-view d-flex flex-column"></div>
               <slot name="loader"></slot>
               <slot name="alert"></slot>
            </main>
        `;
  }

  updateTemplate(template) {
    return this.replaceSlot(
      template,
      {
        key: 'slot[name="loader"]',
        replacer: () => new Loader().render(),
      },
      {
        key: 'slot[name="alert"]',
        replacer: () =>
          new Alert({
            time: 3000,
            maxWidth: 300,
            close: true,
            // maxLength: 50,
          }).render(),
      },
    );
  }

  render() {
    return this.updateTemplate(this.getTemplate());
  }
}
