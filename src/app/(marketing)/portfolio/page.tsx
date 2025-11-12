import path from "path";
import fs from "fs/promises";
import PortfolioClient from "./PortfolioClient";

type PortfolioItem = {
  src: string;
};

const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  const portfolioDir = path.join(process.cwd(), "public", "images", "portfolio");

  try {
    const entries = await fs.readdir(portfolioDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name));

    const sorted = files.sort((a, b) => {
      const extractNumber = (filename: string) => {
        const match = filename.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : Number.POSITIVE_INFINITY;
      };

      const aNum = extractNumber(a);
      const bNum = extractNumber(b);

      if (aNum === bNum) {
        return a.localeCompare(b);
      }

      return aNum - bNum;
    });

    return sorted.map((name) => ({
      src: `/images/portfolio/${name}`,
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to read portfolio directory:", error);
    }
    return [];
  }
};

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return <PortfolioClient portfolioItems={portfolioItems} />;
}

