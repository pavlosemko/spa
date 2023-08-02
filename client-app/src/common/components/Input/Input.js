import "./input.scss";
import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";

class Input extends Component {
  constructor(...props) {
    super(...props);

    console.log(this.props, "props");
  }

  onChangeHandler(event) {
    this.props.onChange(event);
  }

  @AsNode
  getTemplate() {
    return `
            <div class="mb-3">
                <label
                  for="login"
                  class="form-label"
                >${this.props.label}</label>
                <input
                  type="${this.props.type}"
                  id="${this.props.id}"
                  name="${this.props.name}"
                  class="form-control login"
                  aria-labelledby="passwordHelpBlock"
                />
            </div>
        `;
  }

  bindEvent(node) {
    node
      .querySelector("input")
      .addEventListener("change", (event) => this.onChangeHandler(event));
    return node;
  }

  render() {
    return this.bindEvent(this.getTemplate());
  }
}
export default Input;
