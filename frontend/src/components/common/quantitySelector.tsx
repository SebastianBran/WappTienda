import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps, FC, MouseEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type QuantitySelectorProps = ComponentProps<typeof Input> & {
  max?: number;
  min?: number;
  className?: string;
  step?: number;
};

const QuantitySelector: FC = ({
  value: defaultValue,
  max = 100,
  min = 1,
  onChange,
  className,
  disabled = false,
  step = 1,
}: QuantitySelectorProps) => {
  const [value, setValue] = useState<number>(Number(defaultValue) || min);

  useEffect(() => {
    setValue(Number(defaultValue || min));
  }, [defaultValue, min]);

  const handleDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled && value > min) {
      setValue(Math.max(min, value - step));
    }
  };

  const handleIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled && value < max) {
      setValue(Math.min(max, value + step));
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
        disabled={disabled || value <= min}
      >
        <Minus />
      </Button>

      <Input
        className={disabled ? "text-gray-400" : ""}
        value={value}
        onChange={onChange}
      />

      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantitySelector;
