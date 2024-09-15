import React from 'react';

function NoProductPage({children}){
  return(
    <div className="flex p-4 h-screen">
      <p className="self-start p-4 bg-gray-400 3xl text-black">{children}
      </p>
    </div>
  );
}

export default NoProductPage;