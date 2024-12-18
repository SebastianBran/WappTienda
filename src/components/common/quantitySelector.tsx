import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (newQuantity: number) => void;
  className?: string;
  disabled?: boolean;
  step?: number;
}

const QuantitySelector = ({
  quantity,
  max = 100,
  min = 1,
  onChange,
  className,
  disabled = false,
  step = 1,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (!disabled && quantity > min) {
      onChange(Math.max(min, quantity - step));
    }
  };

  const handleIncrease = () => {
    if (!disabled && quantity < max) {
      onChange(Math.min(max, quantity + step));
    }
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-4",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
      >
        <Minus />
      </Button>

      <span className={disabled ? "text-gray-400" : ""}>
        {quantity}
      </span>

      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
      >
        <Plus />
      </Button>
    </div>
  );
}

export default QuantitySelector;
