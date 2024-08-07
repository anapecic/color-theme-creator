import { useEffect, useState } from "react";

export default function ContrastChecker({ checkHex, checkContrast }) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({ colors: [checkHex, checkContrast] }),
            mode: "cors",
          }
        );
        const fetchedScore = await response.json();

        if (fetchedScore && fetchedScore.overall) {
          setScore(fetchedScore.overall);
        } else {
          setScore("Currently unavailable, try later.");
        }
      } catch (error) {
        console.error("Error fetching the contrast score:", error);
      }
    }

    postFetch();
  }, [checkHex, checkContrast]);

  function getContrastStyle() {
    if (score === "Nope") {
      return {
        background: "red",
        display: "inline-block",
        color: "black",
        fontWeight: "bold",
      };
    } else if (score === "Yup") {
      return {
        background: "green",
        display: "inline-block",
        color: "white",
        fontWeight: "bold",
      };
    } else if (score === "Kinda") {
      return {
        background: "orange",
        display: "inline-block",
        color: "black",
        fontWeight: "bold",
      };
    } else {
      return { display: "none" };
    }
  }

  return (
    <p style={getContrastStyle()}>
      Overall Contrast Score: {score ? score : null}
    </p>
  );
}
