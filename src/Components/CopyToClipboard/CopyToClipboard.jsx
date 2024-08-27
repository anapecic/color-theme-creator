import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function CopyToClipboard({ copyValue }) {
  const [active, setActive] = useState(false);

  async function copyToClip(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleCopying(value) {
    copyToClip(value);
    setActive(!active);
    setTimeout(() => {
      setActive(active);
    }, 3000);
  }

  return (
    <button onClick={() => handleCopying(copyValue)} className="copy">
      {active ? "SUCCESFULLY COPIED!" : <FontAwesomeIcon icon={faCopy} />}
    </button>
  );
}
