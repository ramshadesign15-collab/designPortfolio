export interface SocialLinks { email: string; phone: string }
export interface Profile { name: string; shortName: string; tagline: string; role: string; specialization: string; location: string; bio: string; resume: string; social: SocialLinks }
export interface Stat { value: string; label: string }
export interface SkillCategory { name: string; items: string[] }
export interface Skills { categories: SkillCategory[] }
export interface Experience { id: string; company: string; role: string; period: string; location: string; summary: string; highlights: string[] }
export interface EducationItem { id: string; qualification: string; institution: string; period: string; result: string }
export interface PaletteSwatch { name: string; hex: string }
export interface ProjectMeta { label: string; value: string }
export interface SpecGroup { label: string; items: string[] }
export type CaseSectionLayout = 'duo' | 'stack' | 'grid' | 'wide' | 'collage'
export interface CaseSection {
  id: string
  kind: 'overview' | 'moodboard' | 'statement' | 'spec' | 'gallery'
  eyebrow?: string; title?: string; body?: string[]; layout?: CaseSectionLayout
  images?: string[]; specs?: SpecGroup[]; statements?: { label: string; text: string }[]
}
export interface CaseStudy { hero: string; intro: string; meta: ProjectMeta[]; palette: PaletteSwatch[]; sections: CaseSection[] }
export interface Project { id: string; title: string; subtitle: string; description: string; stack: string[]; role: string; year: string; link: string; highlight: boolean; color: string; caseStudy: CaseStudy }
export interface Service {
  title: string
  description: string
  items: string[]
}

export interface Portfolio { profile: Profile; stats: Stat[]; skills: Skills; experience: Experience[]; education: EducationItem[]; projects: Project[]; services: Service[]; galleryStrip: string[]; testimonials: unknown[] }
