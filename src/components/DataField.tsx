import { FC } from "react"

interface DataFieldProps {
  label: string,
  data: number,
}

export const DataField: FC<DataFieldProps> = ({ label, data }) => {
  return (
    <div className="bg-white w-[350px] h-auto flex flex-row rounded-xl justify-between py-2 px-4 shadow-xl border">
      <h3 className="font-semibold text-sm">{label}</h3>
      <h3 className="border border-slate-300 rounded-md w-[100px] flex justify-center items-center">{data ? data : 0}</h3>
    </div>
  )
}