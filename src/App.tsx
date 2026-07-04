import { MotionConfig } from 'framer-motion'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { RedesignSite } from '@/components/redesign/RedesignSite'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <RedesignSite />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
