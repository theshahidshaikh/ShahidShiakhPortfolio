
import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Instagram, ExternalLink, GraduationCap, Briefcase, Award, Cpu, Code, Lightbulb } from 'lucide-react';
import { Project, Experience, Education, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Shahid Himmat Shaikh",
  title: "System Architect & Software Engineer",
  email: "shahidshaikhwork75@gmail.com",
  phone: "+91-8484877820",
  location: "Kolhapur, Maharashtra, India",
  summary: "Focused on high-density system architecture and the deployment of intelligent software layers. Specialist in bridging computational models with physical infrastructure. Current technical objective: optimizing real-world software pipelines through system thinking and high-entropy problem solving. Operational philosophy: Architect for maximum throughput, maintain system integrity, and eliminate sub-optimal logic.",
  links: {
    github: "https://github.com/theshahidshaikh",
    linkedin: "https://www.linkedin.com/in/shahid-shaikh-connect",
    instagram: "https://www.instagram.com/its_shahid_shaikh_ss",
    portfolio: "https://theshahidshaikh.github.io/portfolio",
    resume: "https://drive.google.com/file/d/1Tj1Fg4T8lOcy5tZRCPUg0y9kyCN0SDW7/view?usp=sharing"
  },
  hobbies: [
    "Watching YouTube vlogs about new tech and travel",
    "Traveling to explore different cultures and landscapes",
    "Building automation projects that solve everyday problems"
  ]
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Computational Logic",
    skills: ["Python", "C/C++", "Java", "SQL", "Embedded C"]
  },
  {
    name: "Neural Processing & Vision",
    skills: ["Tensorflow", "PyTorch", "OpenCV", "Numpy", "Pandas", "HuggingFace", "Scikit-learn"]
  },
  {
    name: "Edge & Hardware Interface",
    skills: ["ESP32 Architecture", "Raspberry Pi", "IoT Protocols", "Sensors/Actuators", "Embedded Logic"]
  },
  {
    name: "Infrastructure & Tools",
    skills: ["AWS Cloud", "Git/GitHub", "Firebase", "Linux Systems", "Vibe Coding (Gemini/Cursor)"]
  },
  {
    name: "System Dynamics",
    skills: ["Architecture Design", "Strategic Logic", "Process Optimization", "Technical Leadership"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Lihatech",
    period: "01/2026 – Present",
    location: "Kolhapur",
    offerLetter: "https://drive.google.com/file/d/1VnKCaI4kF7RmnnM5bjOWebmuJ2tlHWZY/view?usp=sharing",
    points: [
      "Executing real-world software development tasks with a focus on clean logic, reliability, and scalability",
      "Building and automating Python-based workflows to reduce manual effort and improve development efficiency",
      "Working with real production codebases to debug issues, optimize processes, and integrate features incrementally"
    ]
  },
  {
    role: "Python Systems Intern",
    company: "VaultOfCode",
    period: "07/2025 – 09/2025",
    location: "Remote",
    points: [
      "Optimized Python logic cycles from foundational implementations to intermediate scaling",
      "Deployed 3-4 distinct codebase projects with modular architecture and low-level file handling",
      "Managed memory-efficient data structures and high-performance OOP logic"
    ]
  },
  {
    role: "AI/ML Logic Intern",
    company: "Next24Tech",
    period: "06/2024 – 08/2024",
    location: "Remote",
    points: [
      "Architected machine learning prediction models for high-accuracy botanical diagnostics",
      "Implemented real-time computer vision masking for autonomous road lane detection",
      "Optimized thermal distribution anomaly detection pipelines for hardware monitoring"
    ]
  },
  {
    role: "IoT Architecture Intern",
    company: "Qualitas Techno Solutions",
    period: "07/2022 – 08/2022",
    location: "Maharashtra, India",
    points: [
      "Engineered IoT network configurations using ESP8266 and ESP32 nodes for industrial telemetry",
      "Calibrated high-precision sensor arrays and mechanical actuators in RLC/PLC environments",
      "Developed edge-computing models on Raspberry Pi infrastructure for greenhouse automation"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    "title": "MPAY — Community Payment System",
    "description": "Full-stack web application for tracking and managing community-based payments. Includes role-based dashboards, monthly payment selection, real-time updates, and admin-level analytics.",
    "technologies": ["React.js", "Firebase", "Tailwind CSS"],
    "link": "https://masjidpay.in",
    "isWorking": true,
    "imageUrl": "https://lh3.googleusercontent.com/d/1znJhi4so1golqrTf51qTEZdgVqWfvA3R"
  },
  {
    "title": "Desktop Voice Assistant (Llama)",
    "description": "AI-powered desktop assistant using Llama models. Capable of executing system commands, answering queries, and providing spoken responses with natural language understanding.",
    "technologies": ["Python", "Llama", "SpeechRecognition", "Pyttsx3"],
    "link": "https://github.com/theshahidshaikh/Desktop-assistant-using-llama",
    "imageUrl": "https://lh3.googleusercontent.com/d/1jHHch9boKHsJ3I9Yg6StX3AZpxU39bQg"
  },
  {
    "title": "Plant Leaf Disease Detection",
    "description": "Computer vision and machine learning system that classifies plant leaf diseases from images using feature extraction and supervised learning techniques.",
    "technologies": ["Python", "OpenCV", "Scikit-learn"],
    "link": "https://github.com/theshahidshaikh/Plant-Leaf-Disease-Detection-System",
    "imageUrl": "https://lh3.googleusercontent.com/d/1mf-lTNWs3xVYNcntssgajMO8wQ0Iamhn"
  },
  {
    "title": "Road Lane Detection Pipeline",
    "description": "Real-time lane detection pipeline using edge detection and region masking techniques for analyzing autonomous driving footage.",
    "technologies": ["Python", "OpenCV", "NumPy"],
    "link": "https://github.com/theshahidshaikh/Road_lane_line_detection",
    "imageUrl": "https://lh3.googleusercontent.com/d/1wYN0wmT1V0StsYoRlgXKT9U0MN1-ymbZ"
  },
  {
    "title": "House Price Prediction Model",
    "description": "Regression-based machine learning model for predicting house prices using cleaned datasets, feature engineering, and data visualization.",
    "technologies": ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    "link": "https://github.com/theshahidshaikh/House_price_prediction",
    "imageUrl": "https://lh3.googleusercontent.com/d/1wcfcyJn0dFp1sIc-Vu2HySXkYWGtDJbM"
  },
  {
    "title": "Fake News Prediction System",
    "description": "NLP-based classification system that detects misinformation in news articles using advanced text vectorization and supervised learning.",
    "technologies": ["Python", "NLP", "Scikit-learn", "NLTK"],
    "link": "https://github.com/theshahidshaikh/Fake_news_prediction",
    "imageUrl": "https://lh3.googleusercontent.com/d/1o2v6MHbW_gEplTQOfIdLNs7FbP1Q_tc9"
  }
];

export const EDUCATIONS: Education[] = [
  {
    degree: "B.E. Computer Science Engineering",
    school: "Bharati Vidyapeeth College of Engineering",
    period: "2023 – 2026",
    grade: "Status: Active // CGPA: 8.42"
  },
  {
    degree: "Diploma in Electronics & Telecommunication",
    school: "Government Polytechnic, Kolhapur",
    period: "2020 – 2023",
    grade: "Score: 89.6% // Honors"
  }
];
