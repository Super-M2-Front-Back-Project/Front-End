'use client';
import React from "react";
import Select from "@/Components/Select";
import Checkbox from "@/Components/Checkbox";
const Page = () => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  return (
    <div>
      <Select
        label="Option"
        options={[
          { value: "Option1", label: "Option1" },
          { value: "Option2", label: "Option2" },
          { value: "Option3", label: "Option3" },
          { value: "Option4", label: "Option4" },
        ]}
        value={selectedOption}
        placeholder="Choisissez une Option"
        onChange={(value) => {
          console.log("Option sélectionnée :", value);
          setSelectedOption(value);
        }}
      />

      {/* Pour afficher la valeur choisie */}
      <p>Option choisie : {selectedOption}</p>
      <Checkbox label="Accepter les termes et conditions"/>
    </div>

  );
};

export default Page;