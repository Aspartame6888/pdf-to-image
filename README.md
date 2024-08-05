# @xieliang6888/pdf-to-image

A React component to render PDF pages as images using `pdfjs-dist`.

## Installation

To install the package, run:

```bash
npm install @xieliang6888/pdf-to-image


import React from "react";
import PdfToImage from "@xieliang6888/pdf-to-image";

const App = () => {
  const handlePdfLoad = (success) => {
    if (success) {
      console.log("PDF successfully converted to images.");
    } else {
      console.log("Failed to convert PDF.");
    }
  };

  return (
    <div>
      <h1>PDF to Image Example</h1>
      <PdfToImage 
        file="path/to/your/pdf/file.pdf"
        fromPdfToImage={handlePdfLoad}
      />
    </div>
  );
};

export default App;

