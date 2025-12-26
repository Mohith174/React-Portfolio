import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
// Remove this line since project3 is not used
import project3 from "../assets/projects/project-3.jpg";

export const HERO_CONTENT = `I'm a backend-focused software engineer building systems with Java and Spring Boot. I care about clean design, clear responsibilities, and writing code that’s safe to change and hard to break.

My current focus is on backend engineering fundamentals: REST APIs, data modeling with relational databases, and SOLID design, while integrating AI where it actually makes sense. I’ve worked with LLM APIs, embeddings, and retrieval-based patterns, treating AI as a system component with real constraints like latency, cost, and failure.

I also have hands-on experience with Python and Node.js, which helps me reason across stacks and choose tools pragmatically. My goal is simple: ship backend services that survive real usage, not just demos.`;

export const ABOUT_TEXT = `I’m a Computer Science and Data Science (statistics focus) at Rutgers University–New Brunswick. I started out building full-stack web applications and freelancing, which gave me hands-on experience shipping real projects and working with changing requirements.

I have around two years of experience with technologies like React, Next.js, Node.js, and relational databases including PostgreSQL and MySQL, along with MongoDB. More recently, my focus has shifted toward backend engineering: writing cleaner, more maintainable systems with strong separation of concerns and production-minded design. I’ve also worked with Python for data analysis using libraries such as Pandas and NumPy.

I enjoy collaborative environments, tackling complex problems, and building systems that are designed to hold up under real usage. Outside of engineering, I spend my time weightlifting, training MMA, cooking, and playing guitar.`;

export const EXPERIENCES = [
  {
    year: "June 2025 - September 2025",
    role: "Global Technology Intern",
    company: "Colgate Palmolive - Technology Center",
    description: `Engineered automated document migration and processing pipelines using VBA, Excel automation, and batch scripting to migrate 13K+ global documents from SAP DMS and Google Drive to ETQ, collaborating with Asia and Europe stakeholders, and achieving 40% performance gains via optimized workflows, metadata reconciliation, Unicode-safe internationalization, and robust validation with error logging.`,
    technologies: ["VBA (Excel automation and Macros)", "Excel (Power Query)", "Batch Scripts", "SAP DMS"],
  },
  {
    year: "May 2025 - July 2025",
    role: "Software Engineer Extern",
    company: "Data Storytelling, LLC",
    description: `Worked in team of 4 to build a full-stack React-TypeScript Raffle platform with Supabase backend and secure payment integration. Implemented user authentication, raffle creation, ticket purchasing, and real-time winner selection features. Ensured responsive design and cross-browser compatibility for optimal user experience.`,
    technologies: ["TypeScript", "React", "Supabase", "Stripe API", "Vercel"],
  },
  {
    year: "September 2024 - August 2024",
    role: "Data Analyst Extern",
    company: "Colgate Palmolive via Rutgers MBS.",
    description: `As an Data Analyst, I focused on analyzing past purchases from suppliers to identify and close compliance gaps according to regional QTA standards concerning the procurement of highly active ingredients. I improved the efficiency of our analytical processes by integrating and cross-referencing supplier data with historical purchase records through our QTA database. Additionally, I created data visualizations to clearly illustrate these compliance gaps, facilitating proactive adjustments and ensuring continued adherence to quality standards.`,
    technologies: ["Python - Numpy", "Excel", "Tableau", "QTA Database Systems"],
  },
];

export const PROJECTS = [
  {
    title: "ReadEase.AI – Document Processing Platform",
    image: project1,
    description:
      "An AI-powered document processing platform featuring advanced PDF parsing, large-file text extraction (up to 100MB), and automated analysis with optimized memory handling and production-grade reliability.",
    technologies: [
      "JavaScript",
      "Node.js",
      "REST APIs",
      "OpenAI APIs",
      "Prompt Engineering",
      "Rate Limiting",
      ],
  },

  {
    title: "RuDash – Android Food Ordering App",
    image: project2,
    description:
      "A feature-rich Android food ordering application built as a mobile evolution of a JavaFX desktop app, showcasing multi-activity navigation, dynamic UI components, and robust order management.",
    technologies: [
      "Java",
      "Android SDK",
      "MVC Architecture",
      "RecyclerView",
      "Custom Adapters",
      "Singleton Pattern",
      "UI/UX Design",
      "Exception Handling",
      "Gradle"
    ],
  },

  {
    title: "MedVision AI – Medical Imaging Assistant",
    image: project3,
    description:
      "A medical imaging platform for wrist fracture detection, automated report generation, and clinical analytics, designed to accelerate radiology workflows while ensuring data privacy and scalability.",
    technologies: [
      "Python",
      "MONAI",
      "DenseNet121",
      "Medical Imaging (DICOM)",
      "FastAPI",
      "Streamlit",
      "Healthcare Data Privacy"
    ],
  },
];

export const CONTACT = {
  address: "New Brunswick | New York Metropolitan Area | Dallas ",
  phoneNo: "+1 (803) 908 - 9898 ",
  email: "mohitkod178@gmail.com",
};
