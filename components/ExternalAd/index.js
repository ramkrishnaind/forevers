import React, { useState, useEffect } from "react";

const index = ({ vzId = "IXP275725VEG2137" }) => {
  const [content, setContent] = useState();
  const randomString = Math.floor(
    Math.random() * 100 * (new Date().getTime() / 1000)
  );
  useEffect(() => {
    const getContent = async () => {
      const response = await fetch(
        `//banner.incrementxserv.com/scripts/pageads.js?vzId=${vzId}&vzR=${randomString}`
      );
      setContent(response);
    };

    getContent();
  }, []);

  return <>{content}</>;
};

export default index;
