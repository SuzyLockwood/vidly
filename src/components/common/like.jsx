import React from 'react';

//converted class component to stateless functional component as it receives all data it needs via props (doesn't have any state)

//to convert -- remove render, pass in props as parameter, and remove references to it

const Like = (props) => {
  //empty to full heart when liked/clicked and hand icon when hovered over heart
  let classes = 'fa fa-heart';
  if (!props.liked) classes += '-o';
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
