"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineCalendar,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

const FixedBookButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Hide on book page
  if (pathname === "/book") return null;

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-30 right-0 z-[9999]"
      whileHover="hover"
    >
      <motion.button
        onClick={() => router.push("/book")}
        initial={{ width: 78 }}
        whileHover={{ width: 180 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 16,
        }}
        className="
          h-14
          bg-black text-white 
          flex items-center gap-3 pr-4
          pl-4
          rounded-l-full
          rounded-r-none
          overflow-hidden
          shadow-xl
        "
      >
        <div
          className="
    w-12 h-12 flex items-center justify-center 
    bg-white/20 rounded-full flex-shrink-0
  "
        >
          <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-white" />
        </div>

        {/* Text appears only on hover */}
        <motion.span
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap text-sm font-medium"
        >
          Book Service
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default FixedBookButton;
