import "./module.image.css";
import { useState } from "react";
import PropTypes from "prop-types";
function IamgeComponent({ id, form, setForm }) {
  const [imageLink, setImageLink] = useState(
    form.components[id]?.componentData || ""
  );
  const handleInputChange = (e) => {
    const updatedLink = e.target.value;
    setImageLink(updatedLink);

    // Update the form state dynamically
    const updatedComponents = [...form.components];
    updatedComponents[id] = {
      ...updatedComponents[id],
      componentData: updatedLink,
    };
    setForm({ ...form, components: updatedComponents });
  };

  return (
    <div className="imageBody">
      <h1>Image</h1>
      <input
        type="text"
        name="Image"
        placeholder="Click to add link"
        value={imageLink}
        onChange={handleInputChange}
      />
    </div>
  );
}

IamgeComponent.propTypes = {
  id: PropTypes.number,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default IamgeComponent;
