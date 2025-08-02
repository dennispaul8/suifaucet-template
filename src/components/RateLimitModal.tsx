import { XIcon } from "@phosphor-icons/react";
import { ClockIcon, LightningIcon } from "@phosphor-icons/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RateLimitModal({ open, onClose }: Props) {
  if (!open) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing when clicking inside modal
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        onClick={stopPropagation}
        className="bg-[#0f0f0f] border border-[#60A5FA] rounded-2xl p-6 w-[90%] max-w-md text-white relative shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full  p-1 hover:bg-green-600/20"
        >
          <XIcon size={20} color="#60A5FA" />
        </button>

        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-[#60A5FA]">
          <ClockIcon size={18} />
          Rate Limit Information
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Information about rate limits for the selected chain
        </p>

        {/* Rate Limit Box */}
        <div className="bg-[#1e293b] border border-[#1c311c] rounded-lg p-4 mb-4">
          <h3 className="font-semibold flex items-center gap-2 text-[#60A5FA] text-sm">
            <ClockIcon size={16} />
            Rate Limit:
          </h3>
          <p className="mt-1 text-sm">2 requests per day(12 hours)</p>
        </div>

        {/* Token Amount Box */}
        <div className="bg-[#1e222b] border border-[#1c312c] rounded-lg p-4">
          <h3 className="font-semibold flex items-center gap-2 text-[#60A5FA] text-sm">
            <LightningIcon size={16} />
            Token Amount per Request:
          </h3>
          <p className="mt-1 text-sm">0.001 SUI</p>
          <p className="text-xs text-gray-400 mt-1">
            Each successful request will send <strong>0.001 SUI</strong> tokens
            to your address.
          </p>
        </div>
      </div>
    </div>
  );
}
