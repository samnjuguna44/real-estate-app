import Hero from '@/components/Hero/Hero'
import Properties from '@/components/Properties/Properties'
import { propertiesData } from '@/components/Properties/PropertiesData'

export default function Home() {
  return (
    <main>
      <Hero />
      <Properties properties={propertiesData} />
    </main>
  )
}
