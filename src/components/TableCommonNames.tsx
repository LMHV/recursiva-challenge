import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const TableCommonNames = ({ data }: { data: string[] }) => {

  return (
    <Table className='bg-white rounded-xl'>
      <TableCaption className="sticky bottom-0 bg-white">Lista de los nombres más comunes de los hinchas de River.</TableCaption>
      <TableHeader className="sticky top-0 bg-white ">
        <TableRow>
          <TableHead className="w-[50px]">Nombre</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((nombre, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{nombre}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}