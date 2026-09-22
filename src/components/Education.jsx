import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen
} from 'lucide-react'

const Education = () => {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    threshold: 0.2
  })

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'PAF-KIET',
      location: 'Karachi, Pakistan',
      duration: '2022 – Present',
      status: 'Final Semester',
      cgpa: '3.2',
      creditHours: '120',
      semester: 'Final',
      expectedGraduation: '2026',
      description:
        'Pursuing a BS in Computer Science with a focus on software development, web technologies, databases, and application development.',
      courses: [
        'Data Structures & Algorithms',
        'Database Systems',
        'Software Engineering',
        'Computer Networks',
        'Operating Systems',
        'Web Development',
        'Object-Oriented Programming',
        'Data Science Fundamentals'
      ],
      achievements: [
        'Completed 116.5 credit hours',
        'Completed Final Year Project evaluation',
        'Built multiple full-stack and software development projects'
      ],
      icon: GraduationCap
    },
    {
      degree: 'FSc Pre-Engineering',
      institution: 'Govt. Degree College, Malir Cantt',
      location: 'Karachi, Pakistan',
      duration: '2020 – 2022',
      status: 'Completed',
      description:
        'Completed intermediate education with a focus on mathematics, physics, and chemistry.',
      achievements: [
        'Built a strong foundation in mathematics and science',
        'Developed analytical and problem-solving skills'
      ],
      icon: BookOpen
    },
    {
      degree: 'Matriculation',
      institution: 'Nishan-e-Haider Alma Mater',
      location: 'Karachi, Pakistan',
      duration: '2018 – 2020',
      status: 'Completed',
      description:
        'Completed secondary education and developed a strong foundation for further academic studies.',
      achievements: [
        'Completed secondary education',
        'Developed strong academic fundamentals'
      ],
      icon: Award
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
      id="education"
      ref={ref}
      className="section-padding bg-white dark:bg-dark-900"
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
              My <span className="gradient-text">Education</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My academic background and educational journey in computer science.
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-12">
            {education.map((edu) => {
              const Icon = edu.icon

              return (
                <motion.div
                  key={`${edu.degree}-${edu.institution}`}
                  variants={itemVariants}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="card p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {edu.degree}
                          </h3>

                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mb-2">
                            <GraduationCap size={18} />
                            {edu.institution}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {edu.location}
                            </div>

                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {edu.duration}
                            </div>
                          </div>

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              edu.status === 'Final Semester'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {edu.status}
                          </span>
                        </div>
                      </div>

                      {/* Current Degree Stats */}
                      {edu.status === 'Final Semester' && (
                        <div className="grid grid-cols-2 gap-3 lg:min-w-[280px]">
                          <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {edu.cgpa}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              CGPA
                            </div>
                          </div>

                          <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {edu.creditHours}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Credit Hours
                            </div>
                          </div>

                          <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {edu.semester}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Semester
                            </div>
                          </div>

                          <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {edu.expectedGraduation}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Graduation
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Relevant Coursework */}
                    {edu.courses && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Relevant Coursework
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-2">
                          {edu.courses.map((course) => (
                            <div
                              key={course}
                              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                              {course}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Highlights
                      </h4>

                      <ul className="space-y-2">
                        {edu.achievements.map((achievement) => (
                          <li
                            key={achievement}
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
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Continuous Learning */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Continuous Learning
              </h3>

              <p className="text-primary-100 max-w-2xl mx-auto mb-6">
                Alongside my academic studies, I continue developing my
                technical skills through real-world projects, professional
                experience, and hands-on learning.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <BookOpen size={20} />
                  <span>Continuous Learning</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <Award size={20} />
                  <span>Project-Based Learning</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <GraduationCap size={20} />
                  <span>Computer Science</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education