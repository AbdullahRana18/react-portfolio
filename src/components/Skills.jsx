import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FileCode, 
  FileText, 
  Code2, 
  Zap, 
  Database, 
  Code, 
  Palette,
  Server,
  GitBranch,
  Terminal
} from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML5', level: 95, icon: FileCode },
        { name: 'CSS3', level: 90, icon: FileText },
        { name: 'JavaScript', level: 85, icon: Code2 },
        { name: 'React', level: 88, icon: Zap },
        { name: 'Tailwind CSS', level: 92, icon: Palette },
        { name: 'Bootstrap', level: 80, icon: Palette }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'C#', level: 90, icon: Code },
        { name: 'ASP.NET MVC', level: 85, icon: Server },
        { name: 'ASP.NET Core', level: 88, icon: Server },
        { name: 'Web API', level: 82, icon: Server },
        { name: 'Entity Framework', level: 80, icon: Database }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'SQL Server', level: 85, icon: Database },
        { name: 'MS Access', level: 75, icon: Database },
        { name: 'Firebase', level: 70, icon: Database }
      ]
    },
    {
      title: 'Tools & Others',
      icon: Terminal,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git/GitHub', level: 88, icon: GitBranch },
        { name: 'Postman', level: 85, icon: Terminal },
        { name: 'VS Code', level: 95, icon: Code },
        { name: 'Visual Studio', level: 90, icon: Code },
        { name: 'OOP', level: 92, icon: Code },
        { name: 'REST APIs', level: 85, icon: Server }
      ]
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

  const SkillBar = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <skill.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {skill.name}
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
        />
      </div>
    </motion.div>
  )

  return (
    <section id="skills" ref={ref} className="section-padding bg-gray-50 dark:bg-dark-800">
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
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name} 
                      skill={skill} 
                      index={skillIndex} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Always Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                I'm constantly exploring new technologies and improving my existing skills. 
                Currently focusing on advanced React patterns, microservices architecture, 
                and cloud technologies to stay ahead in the ever-evolving tech landscape.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
