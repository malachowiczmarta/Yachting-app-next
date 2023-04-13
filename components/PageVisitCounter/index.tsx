import { useState, useEffect } from 'react';

const PageVisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  return (
    <div>
      <p>The page has been refreshed {count} time(s).</p>
    </div>
  );
};

export default PageVisitCounter;
