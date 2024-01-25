import { ChangeEvent, useState, useEffect } from 'react'
import Papa from 'papaparse'
import { DataField } from './DataField';
import { TableHundred } from './TableHundred';
import { TableCommonNames } from './TableCommonNames';
import { TableTeams } from './TableTeams';


interface firstHundredInterface {
  nombre: string,
  edad: string,
  equipo: string,
}

interface TeamResult {
  equipo: string,
  cantidadSocios: number,
  averageAge: number,
  lowestAge: number,
  highestAge: number,
}

interface TeamStatistics {
  cantidadSocios: number;
  totalAge: number;
  lowestAge: number;
  highestAge: number;
}

export function InputForm() {
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
        setTotalAgeRacing((prevTotalAgeRacing) => prevTotalAgeRacing + parseInt(edad, 10))
      }
      if (estado === 'Casado' && estudios === 'Universitario') {
        const persona: firstHundredInterface = {
          nombre: nombre,
          edad: edad,
          equipo: equipo,
        };
        setFirstHundred((prevFirstHundred) =>
          prevFirstHundred.length <= 99 ? [...prevFirstHundred, persona].sort((a, b) => parseInt(a.edad, 10) - parseInt(b.edad, 10)) : prevFirstHundred // 100 Personas casadas y universitarias
        );
      }

      if (equipo === 'River') {
        nameCounts.set(nombre, (nameCounts.get(nombre) || 0) + 1); // 5 Nombres + comunes de hinchas de River
      }

      const age = parseInt(edad);

      if (!teamStatistics[equipo]) {
        teamStatistics[equipo] = {
          cantidadSocios: 0,
          totalAge: 0,
          lowestAge: Number.MAX_SAFE_INTEGER,
          highestAge: Number.MIN_SAFE_INTEGER,
        };
      }

      teamStatistics[equipo].cantidadSocios++;
      teamStatistics[equipo].totalAge += age;
      teamStatistics[equipo].lowestAge = Math.min(teamStatistics[equipo].lowestAge, age);
      teamStatistics[equipo].highestAge = Math.max(teamStatistics[equipo].highestAge, age);

      const resultados: TeamResult[] = Object.keys(teamStatistics).map((equipo) => {
        const stats: TeamStatistics = teamStatistics[equipo];
        const averageAge: number = Number((stats.totalAge / stats.cantidadSocios).toFixed(2));

        return {
          equipo,
          cantidadSocios: stats.cantidadSocios,
          averageAge,
          lowestAge: stats.lowestAge,
          highestAge: stats.highestAge,
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

  return (
    <div className='flex flex-row items-center justify-center h-screen relative'>
      <div className='bg-white rounded-xl border shadow-2xl w-[300px] h-[400px] flex items-center justify-center m-5'>
        <div className='flex flex-row gap-x-4 items-center justify-center'>
          <div className='size-10 bg-indigo-500 flex items-center justify-center rounded-full text-white'>
            <svg className="icon icon-tabler icon-tabler-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
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

      <div className='flex flex-col items-center justify-center'>

        <div className='flex flex-row gap-x-4'>
          {firstHundred.length
            ? <div className='h-[500px] w-[400px] overflow-y-auto relative rounded-xl shadow-xl border'>
              <TableHundred data={firstHundred} />
            </div>
            : null}

          {commonNames.length
            ? <div className='h-[500px] w-[200px] overflow-y-auto relative rounded-xl shadow-xl border'>
              <TableCommonNames data={commonNames} />
            </div>
            : null}
          {teams.length
            ? (<div className='h-[500px] w-[600px] overflow-y-auto relative rounded-xl shadow-xl border' >
              <TableTeams data={teams} />
            </div>)
            : null
          }
        </div>
        {data.length && totalAgeRacing && countRacing
          ? <div className='flex flex-row gap-x-10 m-5'>
            <DataField label='Total registrados' data={data.length} />
            <DataField label='Promedio edad socios Racing' data={Math.round(totalAgeRacing / countRacing)} />
          </div>
          : null}
      </div>
      <img src="src\assets\images\recursivalogo.png" alt="" className='absolute bottom-10 left-10 w-[200px] h-[100px]' />
    </div >
  )
}