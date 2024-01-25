import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Data {
  equipo: string,
  cantidadSocios: number,
  averageAge: number,
  lowestAge: number,
  highestAge: number,
}

interface TableTeamsProps {
  data: Data[]
}

export const TableTeams = ({ data }: TableTeamsProps) => {

  return (
    <Table className='bg-white rounded-xl '>
      <TableCaption className="sticky bottom-0 bg-white">Lista de info Equipos.</TableCaption>
      <TableHeader className="sticky top-0 bg-white ">
        <TableRow>
          <TableHead className="w-[50px]">Equipo</TableHead>
          <TableHead className="w-[50px]">Cantidad de Socios</TableHead>
          <TableHead className="w-[50px]">Edad promedio</TableHead>
          <TableHead className="w-[50px]">Edad Minima</TableHead>
          <TableHead className="w-[50px]">Edad Maxima</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ equipo, cantidadSocios, averageAge, lowestAge, highestAge }, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{equipo}</TableCell>
            <TableCell>{cantidadSocios}</TableCell>
            <TableCell>{averageAge}</TableCell>
            <TableCell>{lowestAge}</TableCell>
            <TableCell>{highestAge}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}