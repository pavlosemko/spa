import "./alert.scss";
import Component from "@/plugins/component";
import { AsNode, BindEvent, SaveContainer } from "@/common/decorators";
import Queue from "@/plugins/queue";
import { mutation_types, store } from "@/store/store";

class Alert extends Component {
  #queue = new Queue(this.updateAlert.bind(this));
  #TIMEOUT = this.props.time ?? 3500;
  #MAX_LENGTH = this.props.maxLength ?? 200;
  #HAS_CLOSE = this.props.close ?? false;
  #alertType;
  #timeoutId;

  constructor(...props) {
    super(...props);
    store.subscribe(mutation_types.SET_ALERT, ({ alert }) => {
      this.#queue.addToQueue(alert);
    });
  }
  #truncateText(text) {
    const maxLength = this.#MAX_LENGTH;
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  }
  onCloseHandler(e) {
    e.preventDefault();
    const button = e.target;
    if (button.classList.contains("btn-close")) {
      clearTimeout(this.#timeoutId);
      this.hide();
      this.#queue.generator.next();
    }
  }

  show({ message, type }) {
    const alertNode = this.$container;
    alertNode.firstElementChild.innerText = this.#truncateText(message);
    alertNode.classList.add(type);
    alertNode.classList.remove("d-none");
    setTimeout(() => {
      alertNode.classList.add("show");
    }, 0);
  }
  hide() {
    const alertNode = this.$container;
    alertNode.classList.remove("show");
    alertNode.classList.remove(this.#alertType);
    alertNode.classList.add("d-none");
    alertNode.firstElementChild.innerText = "";
    this.#alertType = null;
  }
  updateAlert(alert) {
    this.#alertType = alert.type;
    this.show(alert);
    this.#timeoutId = setTimeout(() => {
      this.hide();
      this.#queue.generator.next();
    }, this.#TIMEOUT);
  }

  updateTemplate(template) {
    if (this.props.maxWidth) {
      template.style.maxWidth = this.props.maxWidth + "px";
    }
    if (this.#HAS_CLOSE) {
      template.append(this.getCloseButton());
    }
    return template;
  }
  @AsNode
  getCloseButton() {
    return '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
  }

  bindEvent(node) {
    if (this.#HAS_CLOSE) {
      node.addEventListener("click", this.onCloseHandler.bind(this));
    }
    return node;
  }
  @AsNode
  getTemplate() {
    return `
        <div class="alert alert-dismissible fade alert-position" role="alert">
            <span></span>
        </div>
        `;
  }
  @SaveContainer
  @BindEvent
  render() {
    return this.updateTemplate(this.getTemplate());
  }
}
export default Alert;
