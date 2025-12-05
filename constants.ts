
import { 
  Code, 
  Brain, 
  Video, 
  Palette, 
  Music, 
  GraduationCap, 
  Briefcase, 
  School 
} from 'lucide-react';
import { CourseModule, AudienceType } from './types';

export const ENROLL_URL = "#enroll"; 
export const WHATSAPP_NUMBER = "2348125650249";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello,%20I%20want%20to%20know%20more%20about%20the%20AI%20Young%20Innovators%20Program%20and%20get%20a%20free%20trial.`;
export const INSTAGRAM_URL = "https://www.instagram.com/skillhivedigitalagency?igsh=MXJrd3AydWNjZ3NiOA==";
export const FACEBOOK_URL = "https://www.facebook.com/SalesSurgeon";
export const PHONES = ["08125650249", "09031433152"];
export const CONTACT_EMAIL = "skillhivedigitalagency@gmail.com";
export const LOCATION = "Imo State, Nigeria";
export const PRICING = "₦35,000";

// Curated images with African/Black representation in Tech/Education
// Mapped to the user's specific request:
// 0: Kid with VR headset (Hero)
// 1: Kid with headphones (Hero)
// 2: Kid with microphone (Hero)
// 3: Kid with VR headset and controllers (Hero)
// 4: Kid with headphones and screen (Overview)
// 5: Kid with VR headset (Overview)
// 6-8: Additional images for other sections
export const TECH_KID_IMAGES = [
  "/images/Whisk_484d88912117c2596e147d748c031dfadr.jpeg",
  "/images/Whisk_9a05ffa371852d9971e40f14e51e41b5dr.jpeg",
  "/images/Whisk_a1b0b62f99167fea1424d330e77d6874dr.jpeg",
  "/images/Whisk_ac0d20fad759e9a8f95439a1a7b5694bdr.jpeg",
  "/images/Whisk_ae69f2a8aef60f09b644f79ea5c32f79dr.jpeg",
  "/images/Whisk_beda12dfe77716fb67b439cf9cb8f33ddr.jpeg",
  "/images/Whisk_d665ed21bf095459dde451c402e66024dr.jpeg",
  "/images/Whisk_ed6893e67582810a4e24d512fd118dc0dr.jpeg",
  "/images/Whisk_umy5kznxemzmv2yw0izwqjytkdoxqtlhvmmm1co.jpeg"
];

export const SYLLABUS_CONTEXT = `
AI Young Innovators Program - Weekend Virtual Training

Program Overview:
- Ages 7-20 (Adults welcome)
- 100% Virtual training 
- Project-based learning
- Weekend schedule (no academic disruption)

5 Modules:
1. Web Development & AI: Build websites and mini-games using AI tools
2. AI for Learning: Research assistant, text-to-speech, AI quizzes/flashcards  
3. Multimedia Creation: AI video production, podcasts, animations
4. Visual Design: AI presentations, image generation, storybook creation
5. Advanced Skills: AI music creation, prompt engineering, flyer design

Requirements: Computer/Tablet, Internet, Parental consent

Contact: WhatsApp 2348125650249 | Email skillhivedigitalagency@gmail.com
`;

export const MODULES: CourseModule[] = [
  {
    id: 1,
    title: "Foundations of AI & Web Development",
    subtitle: "Build digital products from scratch",
    icon: Code,
    items: [
      {
        title: "Building Real Web Apps",
        description: "Use AI-powered platforms to design, build, and publish functional websites instantly."
      },
      {
        title: "Creating Mini-Games",
        description: "Apply logic to build fun, interactive mini-games using proven AI models."
      }
    ]
  },
  {
    id: 2,
    title: "AI-Powered Learning & Academic Excellence",
    subtitle: "Transform study habits with AI",
    icon: GraduationCap,
    items: [
      {
        title: "AI Research Assistant",
        description: "Learn to find reliable info, summarize lessons, and condense topics efficiently."
      },
      {
        title: "Text-to-Speech Mastery",
        description: "Use AI voice tech to convert study materials into audio for better retention."
      },
      {
        title: "Interactive Quizzes",
        description: "Generate personalized quizzes and flashcards tailored to your curriculum."
      }
    ]
  },
  {
    id: 3,
    title: "Creative Multimedia & Content Creation",
    subtitle: "Modern storytelling through video & audio",
    icon: Video,
    items: [
      {
        title: "AI Video Production",
        description: "From concept to final edit: Scripting, editing, and effects with AI."
      },
      {
        title: "Podcast Production",
        description: "Plan, record, and clean audio for professional-sounding podcasts."
      },
      {
        title: "AI Animation",
        description: "Bring stories to life with simplified AI animation tools."
      }
    ]
  },
  {
    id: 4,
    title: "Visual Design & Storytelling",
    subtitle: "Present ideas powerfully",
    icon: Palette,
    items: [
      {
        title: "Dynamic Presentations",
        description: "Design visually compelling slides that move beyond the basics."
      },
      {
        title: "AI Image Generation",
        description: "Master the art of 'prompting' to create high-quality artwork."
      },
      {
        title: "Digital Storybooks",
        description: "Combine AI writing and images to create captivating stories."
      }
    ]
  },
  {
    id: 5,
    title: "Advanced Skills: Music & Prompt Engineering",
    subtitle: "Mastering the artistic side of AI",
    icon: Music,
    items: [
      {
        title: "AI Music Creation",
        description: "Compose original melodies, beats, and soundtracks."
      },
      {
        title: "Prompt Engineering",
        description: "The core skill of the future: How to talk to AI effectively."
      },
      {
        title: "Professional Design",
        description: "Create professional flyers and social media assets."
      }
    ]
  }
];

export const AUDIENCES: AudienceType[] = [
  {
    id: 'students',
    title: "Young Innovators (7-20)",
    description: "The core program designed to turn consumers of technology into confident creators.",
    features: [
      "Weekend interactive sessions",
      "Project-based learning",
      "Future-ready skill acquisition",
      "Safe, guided environment"
    ],
    cta: "Enroll Your Child",
    url: ENROLL_URL, // Points to #enroll
    color: "bg-brand-600"
  },
  {
    id: 'adults',
    title: "Adults & Professionals",
    description: "Don't get left behind. Master the tools that are reshaping industries and productivity.",
    features: [
      "Boost workplace productivity",
      "Automate mundane tasks",
      "Create professional content quickly",
      "Understand the AI landscape"
    ],
    cta: "Join Adult Cohort",
    url: ENROLL_URL, // Points to #enroll
    color: "bg-slate-800"
  },
  {
    id: 'schools',
    title: "Schools & Institutions",
    description: "Partner with us to bring cutting-edge AI education to your classrooms and curriculum.",
    features: [
      "Custom curriculum integration",
      "Teacher training workshops",
      "After-school program partnerships",
      "Prepare students for the future economy"
    ],
    cta: "Partner With Us",
    url: `mailto:${CONTACT_EMAIL}`, // Points to Email
    color: "bg-accent-600"
  }
];