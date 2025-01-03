import "./module.image.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { textIcon } from "../../data";
function TextBubble({ id, form, setForm }) {
  const [text, setText] = useState(form.components[id]?.componentData || "");

  const handleInputChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);

    const updatedComponents = [...form.components];
    updatedComponents[id] = {
      ...updatedComponents[id],
      componentData: updatedText,
    };
    setForm({ ...form, components: updatedComponents });
  };

  return (
    <>
      <img src={textIcon} className="textIcon" />
      <div className="imageBody">
        <h1>Text</h1>

        <input
          type="text"
          name="Text"
          autoComplete="off"
          value={text}
          onChange={handleInputChange}
          placeholder="Click here to edit"
        />
      </div>
    </>
  );
}

TextBubble.propTypes = {
  id: PropTypes.number,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default TextBubble;
