import fs from "fs";
import path from "path";
// @ts-ignore
import pdf2img from "pdf-img-convert";

async function main() {
  const plansDir = path.join(process.cwd(), "public", "images", "plans");
  
  // Ensure target folder exists
  if (!fs.existsSync(plansDir)) {
    console.log(`Creating directory ${plansDir}...`);
    fs.mkdirSync(plansDir, { recursive: true });
  }

  // 1. Convert Site Plan PDF
  const sitePlanPath = path.join(process.cwd(), "public", "pdfs", "site-plan.pdf");
  console.log(`Converting Site Plan: ${sitePlanPath}...`);
  try {
    const sitePlanImages = await pdf2img.convert(sitePlanPath, {
      scale: 2.0 // render at 2x scale for clear zoomed text
    });
    
    const outputPath = path.join(plansDir, "site-plan-page-1.png");
    fs.writeFileSync(outputPath, sitePlanImages[0]);
    console.log(`Successfully saved Site Plan page 1 to ${outputPath}`);
  } catch (err) {
    console.error("Error converting Site Plan:", err);
  }

  // 2. Convert Aspen Floor Plans PDF
  const aspenPath = path.join(process.cwd(), "public", "pdfs", "aspen-plan-set.pdf");
  console.log(`Converting Aspen Floor Plans Set: ${aspenPath}...`);
  try {
    const aspenImages = await pdf2img.convert(aspenPath, {
      scale: 2.0 // render at 2x scale
    });
    
    console.log(`Found ${aspenImages.length} pages in Aspen Plan Set PDF.`);
    
    (aspenImages as any[]).forEach((imgBuffer: Buffer, idx: number) => {
      const pageNum = idx + 1;
      const outputPath = path.join(plansDir, `aspen-page-${pageNum}.png`);
      fs.writeFileSync(outputPath, imgBuffer);
      console.log(`Saved Aspen page ${pageNum} to ${outputPath}`);
    });
    
    console.log("Successfully converted all pages of Aspen Plan Set!");
  } catch (err) {
    console.error("Error converting Aspen Floor Plans:", err);
  }
}

main().catch(console.error);
