import React, { useEffect } from 'react';

const FacebookComments = () => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="fb-comments" data-href="http://localhost:3000" data-width="" data-numposts="5"></div>
  );
};

export default FacebookComments;
