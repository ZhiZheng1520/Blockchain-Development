"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface NumberInputProps {
  limit: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export function NumberInput({ limit, value, setValue }: NumberInputProps) {

  const handleIncrement = () => {
    if (value < limit) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= limit) {
      setValue(value);
    }
  };

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center">
        <Input
          id="number"
          type="number"
          value={value}
          onChange={handleNumberChange }
          className="flex-1 rounded-r-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Enter a number"
          min={0}
          max={limit}
        />
        <Button
          variant="outline"
          size="icon"
          className="rounded-l-none"
          onClick={handleIncrement}
        >
          <AiOutlinePlus className="w-4 h-4" />
          <span className="sr-only">Increment</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-l-none"
          onClick={handleDecrement}
        >
          <AiOutlineMinus className="w-4 h-4" />
          <span className="sr-only">Decrement</span>
        </Button>
      </div>
    </div>
  );
}
