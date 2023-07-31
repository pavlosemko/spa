import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";

class Button extends Component {
  constructor(...props) {
    super(...props);
  }

  onClickHandler(node, e) {
    this.props.onClick?.call(node, e);
  }
  @AsNode
  getTemplate() {
    return `
         <button class="btn ${this.parseClassList(this.props.classList)}"
            type="${this.props.type}">
            ${this.props.text}
          </button>
        `;
  }

  bindEvent(node) {
    node.addEventListener("click", this.onClickHandler.bind(this, node));
    return node;
  }

  render() {
    return this.bindEvent(this.getTemplate());
  }
}

export default Button;
