import { ChangeEvent, useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import Papa from 'papaparse'

interface firstHundredInterface {
  nombre: string,
  edad: string,
  equipo: string,
}

interface TeamResult {
  equipo: string,
  cantidadSocios: number,
  totalAge: number,
  lowestAge: number,
  highestAge: number,
}

interface TeamStatistics {
  totalSocios: number;
  totalEdad: number;
  minEdad: number;
  maxEdad: number;
}

function App() {
  const [data, setData] = useState<Array<Array<string>>>([])
  const [countRacing, setCountRacing] = useState(0) // Utilizada para: (1) Contar total de registrados de racing; (2) Promedio de edad de socios de racing
  const [totalAgeRacing, setTotalAgeRacing] = useState(0) // Utilizado para: (1) Promedio de edad junto a countRacing
  const [firstHundred, setFirstHundred] = useState<firstHundredInterface[]>([]) // Utilizado para: Primeras 100 que cumplen las condiciones
  const [commonNames, setCommonNames] = useState<string[]>([]) // Utilizado para: 5 Nombres más comunes
  const [teams, setTeams] = useState<TeamResult[]>([])


  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files![0]
    Papa.parse(uploadedFile, {
      header: false,
      skipEmptyLines: true,
      complete: function (result) {
        const parsedData = result.data
        setData(parsedData as Array<Array<string>>)
      }
    })
  }

  const calculateResults = () => {
    const nameCounts = new Map();
    const teamStatistics: Record<string, TeamStatistics> = {};

    data.forEach((row) => {
      const [nombre, edad, equipo, estado, estudios] = row

      if (equipo === 'Racing') {
        setCountRacing((prevCountRacing) => prevCountRacing + 1)
        setTotalAgeRacing((prevTotalAgeRacing) => prevTotalAgeRacing + parseInt(row[1], 10))
      }
      if (estado === 'Casado' && estudios === 'Universitario') {
        const persona: firstHundredInterface = {
          nombre: row[0],
          edad: row[1],
          equipo: equipo,
        };
        setFirstHundred((prevFirstHundred) =>
          prevFirstHundred.length <= 99 ? [...prevFirstHundred, persona] : prevFirstHundred // 100 Personas casadas y universitarias
        );
      }

      if (equipo === 'River') {
        nameCounts.set(row[0], (nameCounts.get(row[0]) || 0) + 1); // 5 Nombres + comunes de hinchas de River
      }

      const age = parseInt(edad);

      if (!teamStatistics[equipo]) {
        teamStatistics[equipo] = {
          totalSocios: 0,
          totalEdad: 0,
          minEdad: Number.MAX_SAFE_INTEGER,
          maxEdad: Number.MIN_SAFE_INTEGER,
        };
      }

      teamStatistics[equipo].totalSocios++;
      teamStatistics[equipo].totalEdad += age;
      teamStatistics[equipo].minEdad = Math.min(teamStatistics[equipo].minEdad, age);
      teamStatistics[equipo].maxEdad = Math.max(teamStatistics[equipo].maxEdad, age);

      const resultados: TeamResult[] = Object.keys(teamStatistics).map((equipo) => {
        const stats: TeamStatistics = teamStatistics[equipo];
        const averageAge: string = (stats.totalEdad / stats.totalSocios).toFixed(2);

        return {
          equipo,
          cantidadSocios: stats.totalSocios,
          averageAge,
          minAge: stats.minEdad,
          maxAge: stats.maxEdad,
        };
      });

      const resultadosOrdenados = resultados.sort((a, b) => b.cantidadSocios - a.cantidadSocios);
      setTeams(resultadosOrdenados)

    })

    const sortedNames = [...nameCounts.entries()].sort((a, b) => b[1] - a[1]);
    const top5Names: Array<string> = sortedNames.slice(0, 5).map(([name]) => name);
    setCommonNames(top5Names)
  }

  useEffect(() => {

    calculateResults()

  }, [data]); // Corre unicamente cuando se actualiza la data y en el primer render.
  console.log(`CountRacing: ${countRacing}`)
  console.log(`firstHundred: ${firstHundred}`)
  console.log(`commonNames: ${commonNames}`)
  console.log(`teams: ${teams}`)
  return (
    <div className='bg-white rounded-xl shadow-xl w-[300px] h-[400px] flex items-center justify-center'>
      <div className='flex flex-row gap-x-4 items-center justify-center'>
        <div className='size-10 bg-indigo-500 flex items-center justify-center rounded-full text-white'>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        </div>
        <div className='flex flex-col w-[150px]'>
          <label htmlFor='file' className='font-normal text-2xl'>Subir archivo </label>
          <input
            id='file'
            type="file"
            name='file'
            accept='.csv'
            onChange={handleFile}
            className='file:flex file:flex-col file:border-none file:bg-background file:underline '
          />
        </div>
      </div>
    </div>
  )
}

export default App








