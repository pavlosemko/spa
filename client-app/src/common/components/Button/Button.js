import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";

class Button extends Component {
  constructor(...props) {
    super(...props);
  }

  onClickHandler() {}
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
    node.addEventListener("click", this.props.onClick ?? this.onClickHandler);
    return node;
  }

  render() {
    return this.bindEvent(this.getTemplate());
  }
}

export default Button;
