import React, { useEffect } from 'react';

const DisqusComments = ({ url, identifier }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mytouristspot.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);

    window.disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.language = 'vi';
    };

    return () => {
      const disqusScript = document.querySelector('script[src="https://mytouristspot.disqus.com/embed.js"]');
      if (disqusScript) {
        document.body.removeChild(disqusScript);
      }
    };
  }, [url, identifier]);

  return (
    <div id="disqus_thread"></div>
  );
};

export default DisqusComments;
