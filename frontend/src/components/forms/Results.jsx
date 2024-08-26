import React, { useState } from 'react';
import DocumentVerification from './DocumentVerification';
import ResultsDisplay from './ResultsDisplay';

function Results() {
  const [isDocumentVerified, setIsDocumentVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  return (
    <>
      {!isDocumentVerified ? (
        <DocumentVerification
          setUserData={setUserData}
          setCategoryData={setCategoryData}
          setIsDocumentVerified={setIsDocumentVerified}
        />
      ) : (
        <ResultsDisplay
          userData={userData}
          categoryData={categoryData}
        />
      )}
    </>
  );
}

export default Results;