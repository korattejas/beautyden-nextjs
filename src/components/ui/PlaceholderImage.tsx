import { HiPhoto } from "react-icons/hi2";

interface PlaceholderImageProps {
  width?: string | number;
  height?: string | number;
  message?: string;
  className?: string;
}

const PlaceholderImage = ({ 
  width = "100%", 
  height = "100%", 
  message = "Image not available",
  className = ""
}: PlaceholderImageProps) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      style={{ width, height }}
    >
      <HiPhoto className="w-12 h-12 mb-2 opacity-50" />
      <p className="text-sm text-center px-2">{message}</p>
    </div>
  );
};

export default PlaceholderImage;