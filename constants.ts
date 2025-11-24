
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
// 0: Headphone/AI Kid (Hero)
// 1: Father & Son (Hero)
// 2: Podcast/Mic Kid (Hero)
// 3: Teacher/Presentation (Hero)
// 4: Group Laptop (Overview)
// 5: Happy Coding Kid (Overview)
export const TECH_KID_IMAGES = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop", // Hero 1: AI/Headphones (Futuristic)
  "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=1740&auto=format&fit=crop", // Hero 2: Father helping son
  "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1740&auto=format&fit=crop", // Hero 3: Podcast/Media Kid
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop", // Hero 4: Presentation/Teacher
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1740&auto=format&fit=crop", // Overview 1: Group Collaboration
  "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1740&auto=format&fit=crop", // Overview 2: Happy Student
];

export const SYLLABUS_CONTEXT = `
Program Overview:
This weekend program is designed to equip young learners with practical, future-ready skills in Artificial Intelligence (AI) and digital creation. Through a project-based approach, students will move from being consumers of technology to becoming confident creators, learning to use AI tools responsibly to build, innovate, and express their ideas.

Key Highlight: The training is completely VIRTUAL and designed to NOT disrupt academic activities.

Module 1: Foundations of AI & Web Development
- Building Real Web Applications & Websites: Introduction to web development concepts using AI-powered platforms to design, build, and publish simple, functional websites.
- Creating Mini-Games: Applying logic and creative thinking to build fun, interactive mini-games using proven AI models.

Module 2: AI-Powered Learning & Academic Excellence
- Advanced Study AI Research Assistant: Using AI tools to find reliable information, summarize complex lessons, and condense topics.
- AI Text-to-Speech for Easy Study: Utilizing AI voice technology for reading study materials aloud.
- AI-Powered Quizzes & Flashcards: Generating personalized quizzes and digital flashcards.

Module 3: Creative Multimedia & Content Creation
- AI Video Content Creation: Producing short videos using AI tools for scripting, editing, and effects.
- Podcast Production: Planning, recording, and editing podcast episodes using AI for sound cleaning.
- Short Video Animations: Creating engaging animated clips using simplified AI animation tools.

Module 4: Visual Design & Storytelling with AI
- Creating Powerful Slide Presentations: Using AI to design visually compelling presentations.
- AI Image Generation: Learning "prompting" to generate unique, high-quality images.
- Writing Powerful Storybooks: Combining generated images with AI-assisted writing tools.

Module 5: Advanced AI Skills: Music & Prompt Engineering
- Music Creation: Composing original melodies and beats with AI tools.
- Prompt Engineering Simplified: Mastering the skill of giving clear instructions to AI systems.
- Generating Flyer Designs with AI: Creating professional-looking digital flyers.

Requirements:
1. Ages 7-20 (Adults also welcome).
2. Access to Computer, Laptop, or Tablet.
3. Stable Internet connection.
4. Parental consent.
5. Agreement to schedule.
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