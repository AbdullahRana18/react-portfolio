import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin, Building, Code, Database, GitBranch } from 'lucide-react'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const experiences = [
    {
      title: 'Software Intern',
      company: 'Devsinz Intern Connect',
      location: 'Remote',
      duration: '2 months',
      period: '2024',
      type: 'Internship',
      description: 'Gained hands-on experience in full-stack development working on real-world projects using modern technologies.',
      achievements: [
        'Built CRUD modules using ASP.NET Web API and SQL Server',
        'Developed React components with reusable hooks and modern patterns',
        'Collaborated with team using Git and participated in code reviews',
        'Implemented responsive designs using modern CSS frameworks',
        'Worked with RESTful APIs and database optimization'
      ],
      technologies: ['ASP.NET Web API', 'SQL Server', 'React', 'Git', 'C#', 'Entity Framework'],
      icon: Code
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

  return (
    <section id="experience" ref={ref} className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My professional journey and the experiences that shaped my career
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-600 hidden md:block"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  variants={itemVariants}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white dark:bg-dark-800 rounded-full border-4 border-primary-500 shadow-lg z-10">
                    <exp.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex-1 card p-8 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mb-2">
                          <Building size={18} />
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {exp.period} • {exp.duration}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
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
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
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
                        Technologies Used:
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
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Looking for Opportunities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                I'm actively seeking internship and job opportunities where I can contribute to meaningful projects 
                and continue growing as a developer. I'm particularly interested in full-stack development roles 
                that allow me to work with modern technologies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Get In Touch
                </motion.button>
                <motion.a
                  href="/Abdullah_Rana_CV.html"
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
