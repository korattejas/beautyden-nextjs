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

    const extractNumber = (filename: string) => {
      const match = filename.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : Number.POSITIVE_INFINITY;
    };

    const getPrefixRank = (filename: string) => {
      const lower = filename.toLowerCase();
      if (lower.startsWith("p-")) return 0;
      if (lower.startsWith("pn-")) return 1;
      if (lower.startsWith("p")) return 2;
      return 3;
    };

    const sorted = files.sort((a, b) => {
      const aNum = extractNumber(a);
      const bNum = extractNumber(b);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      const aRank = getPrefixRank(a);
      const bRank = getPrefixRank(b);

      if (aRank !== bRank) {
        return aRank - bRank;
      }

      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
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

