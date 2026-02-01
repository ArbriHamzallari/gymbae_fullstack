import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import Workflow from './Workflow'
import Pricing from './Pricing'
import Testimonials from './Testimonials'
import Footer from './Footer'

const Home = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <FeatureSection />
      <Workflow />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default Home
