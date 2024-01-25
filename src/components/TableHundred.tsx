import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Data = {
  nombre: string,
  edad: string,
  equipo: string
}

interface TableHundredProps {
  data: Data[]
}

export const TableHundred = ({ data }: TableHundredProps) => {

  return (
    <Table className='bg-white rounded-xl '>
      <TableCaption className="sticky bottom-0 bg-white">Lista de los primeros 100 socios (Casados&Universitarios).</TableCaption>
      <TableHeader className="sticky top-0 bg-white ">
        <TableRow>
          <TableHead className="w-[50px]">Nombre</TableHead>
          <TableHead className="w-[50px]">Edad</TableHead>
          <TableHead className="w-[50px]">Equipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ nombre, edad, equipo }, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{nombre}</TableCell>
            <TableCell>{edad}</TableCell>
            <TableCell>{equipo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}