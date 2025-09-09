import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Database, Palette, Cpu } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const stats = [
    { label: 'CGPA', value: '3.2', icon: Cpu },
    { label: 'Credit Hours', value: '81.5', icon: Database },
    { label: 'Semester', value: '6th', icon: Code },
    { label: 'Graduation', value: '2026', icon: Palette }
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
    <section id="about" ref={ref} className="section-padding bg-white dark:bg-dark-900">
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
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about creating digital solutions that make a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a dedicated Computer Science student at PAF KIET, currently in my 6th semester 
                  with a strong foundation in both frontend and backend development. My journey in 
                  technology began with a passion for solving real-world problems through code.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As a Full-Stack Web Developer, I specialize in building robust applications using 
                  modern technologies like React, ASP.NET Core MVC, and SQL Server. I believe in 
                  writing clean, maintainable code and creating user experiences that are both 
                  beautiful and functional.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or working on personal projects that challenge me to grow 
                  as a developer.
                </p>
              </div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-6 pt-8"
              >
                {stats.map(({ label, value, icon: Icon }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gray-50 dark:bg-dark-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Current Focus</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Building scalable web applications</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Learning advanced React patterns</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Mastering ASP.NET Core architecture</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Database optimization techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
              >
                <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
              >
                <Database className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
