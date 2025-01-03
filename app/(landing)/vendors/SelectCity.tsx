"use client";
import SelectInput from "@components/input/SelectInput";

export default function SelectCity({ cities }: { cities: string[] }) {
  return (
    <SelectInput
      options={cities.map((city) => ({ text: city, value: city }))}
      onChange={(value) => console.log(value)}
      className="max-w-[100px] lg:max-w-xs"
    />
  );
}
