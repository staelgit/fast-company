import React from 'react';

const Loader = () => {
   return (
      <div>
         <h1 className="d-inline">Loading... </h1>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};

export default Loader;
