import React, { useState } from "react";
import "./index.scss";

const ClickToCopy = ({ textToCopy, customIcon = "", showName = true }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    // Create a temporary input element to copy the text
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setIsCopied(true);

    // Reset the "Copied" state after a few seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <div className="copy-comp" onClick={copyToClipboard}>
      {isCopied ? "Copied" : showName ? textToCopy : null}{" "}
      {customIcon ? (
        customIcon
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.344"
          height="16"
          viewBox="0 0 13.344 16"
        >
          <path
            id="content_copy_FILL0_wght200_GRAD200_opsz48"
            d="M163.048-841.535a1.447,1.447,0,0,1-1.071-.449,1.466,1.466,0,0,1-.442-1.064v-10.439a1.466,1.466,0,0,1,.442-1.064,1.448,1.448,0,0,1,1.071-.449h7.783a1.455,1.455,0,0,1,1.064.449,1.455,1.455,0,0,1,.449,1.064v10.439a1.454,1.454,0,0,1-.449,1.064,1.454,1.454,0,0,1-1.064.449Zm0-.969h7.783a.52.52,0,0,0,.375-.17.521.521,0,0,0,.17-.375v-10.439a.521.521,0,0,0-.17-.375.521.521,0,0,0-.375-.17h-7.783a.521.521,0,0,0-.375.17.521.521,0,0,0-.17.375v10.439a.521.521,0,0,0,.17.375A.52.52,0,0,0,163.048-842.5Zm-2.535,3.5a1.448,1.448,0,0,1-1.071-.449,1.466,1.466,0,0,1-.442-1.064v-11.407h.969v11.407a.52.52,0,0,0,.17.374.521.521,0,0,0,.375.17h8.752V-839Zm1.99-3.5v0Z"
            transform="translate(-159 855)"
            fill="#3b7fd9"
          />
        </svg>
      )}
    </div>
  );
};

export default ClickToCopy;
