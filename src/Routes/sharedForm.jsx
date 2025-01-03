import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { getFormDataByToken } from "../../Services";
import "./module.shareForm.css";
import { chatIcon, sendIcon } from "../data";
import { storeFormResponse, countFormViews } from "../../Services";

function SharedForm() {
  const { token } = useParams();
  const [formComponents, setFormComponents] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedRating, setSelectedRating] = useState(null);
  const [formId, setFormId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    getFormDataByToken(token)
      .then((res) => res.json())
      .then((data) => {
        setFormId(data.form._id);
        setFormComponents(data.form.components);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const updateFormView = () => {
    try {
      countFormViews(formId);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (formId !== null) {
      updateFormView();
    }
  }, [formId]);

  const handleInputChange = (componentId, value) => {
    const updatedResponses = {
      ...responses,
      [componentId]: value || " ",
    };
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    const currentComponent = formComponents[currentComponentIndex];

    if (!responses[currentComponent._id]) {
      handleInputChange(currentComponent._id, " ");
    }

    setCurrentComponentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    formComponents.forEach((component) => {
      if (!responses[component._id]) {
        handleInputChange(component._id, " ");
      }
    });

    try {
      console.log(JSON.stringify(responses, null, 2));

      const res = await storeFormResponse(formId, responses);
      if (res.status === 200) {
        alert("Form submitted successfully");
      } else if (res.status === 404) {
        alert("Form not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const currentComponent = formComponents[currentComponentIndex];
    if (
      currentComponent &&
      (currentComponent.componentType === "Image" ||
        currentComponent.componentType === "Text")
    ) {
      const timeoutId = setTimeout(() => {
        handleNext();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentComponentIndex, formComponents]);

  const renderComponent = (component, index) => {
    const isActive = currentComponentIndex === index;
    const activeClass = isActive
      ? `at${component.componentType}`
      : component.componentType.toLowerCase();

    switch (component.componentType) {
      case "Image":
        return (
          <div key={index} className={`ImageBubbleContainer ${activeClass}`}>
            <img
              src={chatIcon}
              alt="Chat Icon"
              className="ImageBubbleContainerlogo"
            />
            <img
              src={component.componentData}
              alt="Component"
              className="ImageBubbleContainerImage"
            />
          </div>
        );
      case "Text":
        return (
          <div key={index} className={`TextBubbleContainer ${activeClass}`}>
            <img
              src={chatIcon}
              alt="Chat Icon"
              className="TextBubbleContainerlogo"
            />
            <p className="TextBubbleContainerPara">{component.componentData}</p>
          </div>
        );
      case "InputText":
      case "InputNumber":
      case "InputEmail":
      case "InputPhone":
      case "InputDate":
        return (
          <div key={index} className={`test ${activeClass}`}>
            <input
              type={component.componentType.toLowerCase().replace("input", "")}
              placeholder={`Enter your ${component.componentType
                .replace("Input", "")
                .toLowerCase()}`}
              onChange={(e) => handleInputChange(component._id, e.target.value)}
              disabled={!isActive}
            />
          </div>
        );
      case "InputRating":
        return (
          <div key={index} className={`test ${activeClass}`}>
            <div className="RatingContainer">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`rating-btn ${
                    selectedRating === rating ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(rating);
                    handleInputChange(component._id, rating);
                  }}
                  disabled={!isActive}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        );
      case "SubmitButton":
        return (
          <button
            key={index}
            className={activeClass}
            onClick={handleSubmit}
            disabled={submitted}
          >
            <img src={sendIcon} className="SubmitNextBtn" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sharedFormBody">
      {formComponents
        .slice(0, currentComponentIndex + 1)
        .map((component, index) => renderComponent(component, index))}
      {currentComponentIndex < formComponents.length - 1 &&
        formComponents[currentComponentIndex].componentType !== "Image" &&
        formComponents[currentComponentIndex].componentType !== "Text" && (
          <button onClick={handleNext} className="nextbtn">
            <img src={sendIcon} className="SubmitNextBtn" />
          </button>
        )}
    </div>
  );
}

export default SharedForm;
