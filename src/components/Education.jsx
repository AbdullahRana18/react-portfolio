import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from 'lucide-react'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'PAF KIET',
      location: 'Karachi, Pakistan',
      duration: '2022 - Present',
      status: 'Ongoing',
      cgpa: '3.2',
      creditHours: '81.5',
      semester: '6th',
      expectedGraduation: '2026',
      description: 'Pursuing comprehensive computer science education with focus on software development, algorithms, and system design.',
      courses: [
        'Data Structures and Algorithms',
        'Database Systems',
        'Software Engineering',
        'Computer Networks',
        'Operating Systems',
        'Web Development',
        'Object-Oriented Programming',
        'Data Science Fundamentals'
      ],
      achievements: [
        'Maintained consistent academic performance',
        'Active participation in coding competitions',
        'Completed multiple software development projects',
        'Collaborated on team-based assignments'
      ],
      icon: GraduationCap
    },
    {
      degree: 'FSc Pre-Engineering',
      institution: 'Govt. Degree College, Malir Cantt',
      location: 'Karachi, Pakistan',
      duration: '2020 - 2022',
      status: 'Completed',
      description: 'Completed intermediate education with focus on mathematics, physics, and chemistry.',
      achievements: [
        'Strong foundation in mathematics and sciences',
        'Developed analytical thinking skills',
        'Prepared for higher education in technical fields'
      ],
      icon: BookOpen
    },
    {
      degree: 'Matriculation',
      institution: 'Nishan-e-Haider Alma Mater',
      location: 'Karachi, Pakistan',
      duration: '2018 - 2020',
      status: 'Completed',
      description: 'Completed secondary education with excellent academic performance.',
      achievements: [
        'Strong academic foundation',
        'Developed study habits and discipline',
        'Participated in school activities'
      ],
      icon: Award
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
    <section id="education" ref={ref} className="section-padding bg-white dark:bg-dark-900">
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
              My <span className="gradient-text">Education</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My academic journey and educational achievements
            </p>
          </motion.div>

          {/* Education Timeline */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className="card p-8 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start gap-4 mb-4 lg:mb-0">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                        <edu.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mb-2">
                          <GraduationCap size={18} />
                          {edu.institution}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {edu.duration}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          edu.status === 'Ongoing' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    {/* Stats for Current Degree */}
                    {edu.status === 'Ongoing' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {edu.cgpa}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {edu.creditHours}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Credit Hours</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {edu.semester}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Semester</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {edu.expectedGraduation}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Expected</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Courses (for current degree) */}
                  {edu.courses && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Relevant Coursework:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {edu.courses.map((course, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
              <p className="text-primary-100 max-w-2xl mx-auto mb-6">
                I believe in lifelong learning and staying updated with the latest technologies. 
                My academic journey has provided me with a strong foundation, and I continue to 
                enhance my skills through online courses, projects, and hands-on experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <Users size={20} />
                  <span>Active in Study Groups</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <BookOpen size={20} />
                  <span>Online Certifications</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg"
                >
                  <Award size={20} />
                  <span>Project-Based Learning</span>
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
