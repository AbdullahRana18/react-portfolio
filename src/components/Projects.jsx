import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Code, Database, Palette, Server } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const projects = [
    {
      title: 'Job Portal with Skill Matching',
      description: 'A comprehensive job portal featuring role-based authentication, job posting capabilities, and intelligent skill matching algorithm to connect job seekers with relevant opportunities.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Tailwind CSS', 'ASP.NET Web API', 'SQL Server'],
      features: [
        'Role-based authentication system',
        'Advanced job search and filtering',
        'Skill matching algorithm',
        'Real-time notifications',
        'Admin dashboard for job management'
      ],
      github: 'https://github.com/abdullah-rana/job-portal',
      live: 'https://job-portal-demo.vercel.app',
      status: 'Completed',
      category: 'Full-Stack'
    },
    {
      title: 'Student Management System',
      description: 'A complete educational management system with multi-role support, attendance tracking, and grade management for educational institutions.',
      image: '/api/placeholder/600/400',
      technologies: ['ASP.NET Core MVC', 'Entity Framework', 'SQL Server', 'Bootstrap'],
      features: [
        'Multi-role authentication (Admin/Teacher/Student)',
        'Attendance tracking system',
        'Grade and marks management',
        'Student profile management',
        'Report generation'
      ],
      github: 'https://github.com/abdullah-rana/student-management',
      live: 'https://student-mgmt-demo.vercel.app',
      status: 'Completed',
      category: 'Backend'
    },
    {
      title: 'Foodpanda Clone',
      description: 'A responsive food delivery application clone built with Next.js, featuring modern routing, dynamic content, and mobile-first design.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      features: [
        'Responsive design for all devices',
        'Dynamic routing with Next.js',
        'Modern UI/UX design',
        'Restaurant and menu browsing',
        'Shopping cart functionality'
      ],
      github: 'https://github.com/abdullah-rana/foodpanda-clone',
      live: 'https://foodpanda-clone-demo.vercel.app',
      status: 'Completed',
      category: 'Frontend'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Full-Stack': return Code
      case 'Backend': return Server
      case 'Frontend': return Palette
      default: return Code
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Full-Stack': return 'from-blue-500 to-cyan-500'
      case 'Backend': return 'from-green-500 to-emerald-500'
      case 'Frontend': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="projects" ref={ref} className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category)
              const categoryColor = getCategoryColor(project.category)
              
              return (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="card overflow-hidden group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="w-16 h-16 text-primary-600 dark:text-primary-400 opacity-50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColor}`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                        {project.features.length > 3 && (
                          <li className="text-primary-600 dark:text-primary-400 font-medium">
                            +{project.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
