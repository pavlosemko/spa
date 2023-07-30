import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";

class Heading extends Component {
  constructor(...props) {
    super(...props);
  }

  @AsNode
  getTemplate() {
    return `
           <${this.props.tagName}
            class="${this.parseClassList(this.props.classList)}"
           >
           ${this.props.text}
           </${this.props.tagName}>
        `;
  }

  render() {
    return this.getTemplate();
  }
}

export default Heading;
