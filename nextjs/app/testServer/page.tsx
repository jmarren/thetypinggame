'use client'

import React from 'react';

const Page: React.FC = () => {
  const handleClick = () => {
    fetch('http://localhost:3004/test', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <button onClick={handleClick}>Make POST Request</button>
    </div>
  );
};

export default Page;
