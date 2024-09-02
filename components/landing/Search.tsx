"use client";
import TextInput from "@components/input/TextInput";
import { Badge } from "@components/ui/badge";
import { CustomerRoutes } from "@data/enums";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <TextInput
      value={search}
      // onChange={() => {}}
      placeholder="Ex. Bridal Makeup, Wedding Photography etc."
      preIcon={<Search size={22} />}
      icon={<Badge>Search</Badge>}
      onChange={(value) => {
        setSearch(value);
      }}
      onClick={() => {
        router.push(`${CustomerRoutes.EXPLORE}?search=${search}`);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`${CustomerRoutes.EXPLORE}?search=${search}`);
        }
      }}
    />
  );
}
