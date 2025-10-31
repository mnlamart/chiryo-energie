import { motion } from "motion/react";

interface RatingCardProps {
  rating?: number;
  review: string;
  avatarUrl?: string;
  clientName: string;
  clientRole?: string;
}

export function RatingCard({
  rating = 5,
  review,
  avatarUrl,
  clientName,
  clientRole = "Client Chiryo Energie",
}: RatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400" />

      {/* Star Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <svg
              className={`w-5 h-5 ${
                index < rating ? "text-orange-400" : "text-gray-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Review Text with quotation styling */}
      <div className="relative mb-6 flex-grow">
        <span className="absolute -top-2 -left-2 text-5xl text-orange-100 select-none" style={{ fontFamily: 'Georgia, serif' }}>"</span>
        <p className="text-gray-700 leading-relaxed relative z-10 italic">
          {review}
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {avatarUrl ? (
          <picture>
            <source
              type="image/avif"
              srcSet={avatarUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '-150w.avif')}
            />
            <source
              type="image/webp"
              srcSet={avatarUrl.replace(/\.(jpg|jpeg|png)$/i, '-150w.webp')}
            />
            <img
              src={avatarUrl.replace(/\.(jpg|jpeg|png)$/i, '-150w.jpg')}
              alt={clientName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-100"
              width={150}
              height={150}
              loading="lazy"
            />
          </picture>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 ring-2 ring-orange-100 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-semibold">
              {clientName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-gray-900 font-medium">{clientName}</p>
          <p className="text-gray-500 text-sm">{clientRole}</p>
        </div>
      </div>
    </motion.div>
  );
}

