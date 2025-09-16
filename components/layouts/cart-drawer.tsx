import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface CartDrawerProps {
  onClose: () => void;
}

export const CartDrawer = ({ onClose }: CartDrawerProps) => {
  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-[722px] bg-black text-white z-50 shadow-xl animate-slideIn flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h2 className="text-xl font-bold">თქვენი შეკვეთა</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/pizza.jpg"
              alt="იმერული ხაჭაპური"
              width={60}
              height={60}
              className="rounded-md"
            />
            <div>
              <p className="font-medium">იმერული ხაჭაპური</p>
              <p className="text-sm text-gray-400">18.30 ₾</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
            <button className="p-1 hover:bg-white/10 rounded">
              <Minus size={16} />
            </button>
            <span>1</span>
            <button className="p-1 hover:bg-white/10 rounded">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <hr className="border-white/10 my-4" />

        {/* Recommendations */}
        <h3 className="text-lg font-semibold mb-2">თქვენსთვის რეკომენდებული</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-2">
            <Image
              src="/pizza2.jpg"
              alt="აჭარული ხაჭაპური"
              width={150}
              height={100}
              className="rounded-md w-full h-auto"
            />
            <p className="text-sm mt-1">აჭარული ხაჭაპური</p>
            <p className="text-xs text-gray-400">23.90 ₾</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <Image
              src="/pizza3.jpg"
              alt="იმერული ლობიანი"
              width={150}
              height={100}
              className="rounded-md w-full h-auto"
            />
            <p className="text-sm mt-1">იმერული ლობიანი</p>
            <p className="text-xs text-gray-400">16.30 ₾</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <Image
              src="/pizza3.jpg"
              alt="იმერული ლობიანი"
              width={150}
              height={100}
              className="rounded-md w-full h-auto"
            />
            <p className="text-sm mt-1">იმერული ლობიანი</p>
            <p className="text-xs text-gray-400">16.30 ₾</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <Image
              src="/pizza3.jpg"
              alt="იმერული ლობიანი"
              width={150}
              height={100}
              className="rounded-md w-full h-auto"
            />
            <p className="text-sm mt-1">იმერული ლობიანი</p>
            <p className="text-xs text-gray-400">16.30 ₾</p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-4 border-t border-white/20">
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition text-white font-semibold py-3 rounded-lg">
          დასრულება შეკვეთა
        </button>
      </div>
    </div>
  );
};
