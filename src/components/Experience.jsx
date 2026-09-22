import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar,
  MapPin,
  Building,
  Code,
  Database
} from 'lucide-react'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.2
  })

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'CloudEx Pakistan',
      location: 'Remote',
      period: 'Aug 2026 – Present',
      type: 'Professional Experience',
      description:
        'Working on a full-stack CRM platform using modern .NET and Next.js technologies.',
      achievements: [
        'Developing REST APIs using ASP.NET Core and Entity Framework Core',
        'Building CRM modules and reusable UI components with Next.js and Tailwind CSS',
        'Working with SQL Server for database-driven application functionality',
        'Debugging, testing, and contributing to ongoing platform improvements'
      ],
      technologies: [
        '.NET 10',
        'ASP.NET Core',
        'EF Core',
        'SQL Server',
        'Next.js',
        'JavaScript',
        'Tailwind CSS'
      ],
      icon: Database
    },
    {
      title: 'Software Intern',
      company: 'Devsinz Intern Connect',
      location: 'Remote',
      period: '2024',
      type: 'Internship',
      description:
        'Gained practical experience in full-stack development by working on real-world web applications.',
      achievements: [
        'Built CRUD modules using ASP.NET Web API and SQL Server',
        'Developed reusable React components',
        'Worked with RESTful APIs and database operations',
        'Collaborated with the team using Git and GitHub'
      ],
      technologies: [
        'ASP.NET Web API',
        'SQL Server',
        'React',
        'Git',
        'C#',
        'Entity Framework'
      ],
      icon: Code
    }
  ]

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="section-padding bg-gray-50 dark:bg-dark-800"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Work <span className="gradient-text">Experience</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My professional experience and the projects that shaped my development journey.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-600 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp) => {
                const Icon = exp.icon

                return (
                  <motion.div
                    key={`${exp.company}-${exp.title}`}
                    variants={itemVariants}
                    className="relative flex items-start gap-8"
                  >
                    {/* Timeline Icon */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white dark:bg-dark-800 rounded-full border-4 border-primary-500 shadow-lg z-10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>

                    {/* Experience Card */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="flex-1 card p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {exp.title}
                          </h3>

                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mb-3">
                            <Building size={18} />
                            {exp.company}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {exp.location}
                            </div>

                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {exp.period}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Key Contributions
                        </h4>

                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />

                              <span className="text-gray-600 dark:text-gray-400">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Open to Opportunities
              </h3>

              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                Open to job opportunities in Full-Stack Development where I can
                contribute to meaningful projects and continue growing as a
                software developer.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .querySelector('#contact')
                      ?.scrollIntoView({
                        behavior: 'smooth'
                      })
                  }
                  className="btn-primary"
                >
                  Get In Touch
                </motion.button>

                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Database size={20} />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience