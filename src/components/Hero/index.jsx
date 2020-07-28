import React from 'react';

function Hero(props) {
  console.log('render Hero');
  const { name, dataMemo } = props;
  return (
    <div>
      {name}
      <div>
        {dataMemo.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Hero);
