import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, MapPin, Phone } from 'lucide-react'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AbdullahRana18', label: 'GitHub', target: '_blank', rel: 'noopener noreferrer' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abdullah-rana-4326a1290/', label: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
    { icon: Mail, href: 'mailto:15341@kiet.edu.pk?subject=Portfolio%20Inquiry&body=Hello%20Abdullah,%0D%0A%0D%0AI%20am%20interested%20in%20learning%20more%20about%20your%20services.%0D%0A%0D%0APlease%20contact%20me%20at%20your%20earliest%20convenience.%0D%0A%0D%0AThank%20you!', label: 'Email' }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
          <div className="container-custom section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-lg">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Abdullah Rana
          </motion.h1>

          {/* Role */}
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
          >
            Full-Stack Web Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            I build scalable web apps with clean UIs and solid backends.
            <br />
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              ASP.NET Core MVC · React · SQL Server
            </span>
          </motion.p>

          {/* Location & Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Karachi, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>+92-321-8293386</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map(({ icon: Icon, href, label, target, rel }) => (
              <motion.a
                key={label}
                href={href}
                target={target}
                rel={rel}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
