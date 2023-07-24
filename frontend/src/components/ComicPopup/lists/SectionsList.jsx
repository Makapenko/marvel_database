import React from 'react';

function SectionsList({ sections }) {
  return (
    <>
      <b>Sections:</b>
      {sections.map(el => (
        <div key={el}>{el}</div>
      ))}
    </>
  );
}

export default React.memo(SectionsList);
