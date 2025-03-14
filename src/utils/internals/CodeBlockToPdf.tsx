import { PropsWithChildren, useRef } from "react";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Button, Stack } from "@mui/material";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfTwoTone";

const CodeBlockToPdf = ({ children }: PropsWithChildren) => {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = async () => {
    const element = codeBlockRef.current;
    if (!element) {
      console.error("Content element not found");
      return;
    }
    try {
      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width; // Width in pixels
      const imgHeight = canvas.height; // Height in pixels

      // Convert pixel dimensions to points (1 px = 0.75 pt approximately for jsPDF)
      const pdfWidth = imgWidth * 0.75;
      const pdfHeight = imgHeight;

      // Create a new jsPDF instance with custom page size (single page)
      const pdf = new jspdf({
        orientation: "portrait", // or 'landscape' if needed
        unit: "pt", // Use points as the unit
        format: [pdfWidth, pdfHeight], // Custom size based on content
      });

      // Add the canvas image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <Stack direction="row" justifyContent="end" px={2}>
        <Button
          sx={{ px: 2 }}
          variant="contained"
          size="small"
          startIcon={<PictureAsPdfTwoToneIcon />}
          onClick={handleDownloadPdf}
        >
          Print
        </Button>
      </Stack>
      <div ref={codeBlockRef}>{children}</div>
    </div>
  );
};

export default CodeBlockToPdf;
