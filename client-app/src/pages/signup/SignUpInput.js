import Component from "@/plugins/component";
import { AsNode } from "@/common/decorators";

class SignUpInput extends Component {
  constructor(...props) {
    super(...props);
  }

  @AsNode
  getTemplate() {
    return `
            <div class="form-floating">
                <input 
                type="${this.props.type}" 
                name="${this.props.name}"
                class="form-control"
                id="${this.props.id}">
                <label for="floatingInput">${this.props.label}</label>
            </div>
        `;
  }

  render() {
    return this.getTemplate();
  }
}
export default SignUpInput;
