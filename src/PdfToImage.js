import React, { useState, useEffect } from "react";
import { getDocument } from "pdfjs-dist/webpack";

const PdfToImage = ({ file, fromPdfToImage }) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfDoc = await getDocument(file).promise;
        const pagesArray = Array.from({ length: pdfDoc.numPages }, (_, index) =>
          pdfDoc.getPage(index + 1).then((page) => pageToImage(page))
        );

        const pageImages = await Promise.all(pagesArray);
        setPages(pageImages);
        !!fromPdfToImage && fromPdfToImage(true);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [file]);

  const pageToImage = async (page) => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height - 630;

    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL("image/jpeg");
  };

  return (
    <div>
      {pages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Page ${index + 1}`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ))}
    </div>
  );
};

export default PdfToImage;
