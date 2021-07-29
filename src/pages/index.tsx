import Head from 'next/head'
import RestrictionSchedule from '../components/RestrictionSchedule'

export default function Home() {
  return (
    <div className='py-12 bg-white'>
      <Head>
        <title>Pico y placa predictor</title>
        <meta name='description' content='Exercise for job application.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div className={'lg:text-center'}>
            <h2 className={'text-base text-indigo-600 font-semibold tracking-wide uppercase'}>
                Welcome to pico y placa app!
            </h2>
            <p className={'mt-4 max-w-2x1 text-xl text-gray-500 lg:mx-auto'}>
                En este sitio puedes conocer si tu auto puede circular en el perímetro autorizado de la ciudad de Quito con las reglas del 2019.
            </p>
        </div>
        <div className={'mt-10'}>
            <RestrictionSchedule />
        </div>
      </main>
    </div>
  )
}
