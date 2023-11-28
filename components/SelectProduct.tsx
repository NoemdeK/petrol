import React from 'react'

 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectProduct = () => {
    const data = [
        {
          label: 'ICE Brent Crude',
          label2: 'Crude',

        },
        {
            label: 'PMS',
            label2: 'Motor Spirit',


         },
        {
          label: 'Automative Gas Oil',
          label2: 'Gas Oil',


        },
        {
            label: 'Dual Purpose Kerosene',
            label2: 'Kerosene',
            text: "text-green-700"

          },
          {
            label: 'Liquefied Petroleum Gas',
            label2: 'Petroleum Gas',
          },
      ];
  return (
<Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Products</SelectLabel>
          {
            data.map((item, i) => (
                <SelectItem key={i} value={item.label}>{item.label}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>  )
}

export default SelectProduct