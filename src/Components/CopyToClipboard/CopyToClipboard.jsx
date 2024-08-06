import { useState } from "react";

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
    <button onClick={() => handleCopying(copyValue)}>
      {active ? "SUCCESFULLY COPIED!" : "COPY"}
    </button>
  );
}
