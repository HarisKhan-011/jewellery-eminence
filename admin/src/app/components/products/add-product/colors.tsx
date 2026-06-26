import React, { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};
const Colors = ({ colors, setColors, default_value }: IPropType) => {
  useEffect(() => {
    if (default_value) {
      setColors(default_value);
    }
  }, [default_value, setColors]);
  return (
    <div className="mb-5 tp-product-tags">
      <TagsInput
        value={colors}
        onChange={setColors}
        name="colors"
        placeHolder="enter metal, stone, or finish"
      />
      <em>press enter to add a metal, stone, or finish</em>
    </div>
  );
};

export default Colors;
