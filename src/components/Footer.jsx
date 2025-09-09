import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AbdullahRana18', label: 'GitHub', target: '_blank', rel: 'noopener noreferrer' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abdullah-rana-4326a1290/', label: 'LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
    { icon: Mail, href: 'mailto:15341@kiet.edu.pk?subject=Portfolio%20Inquiry&body=Hello%20Abdullah,%0D%0A%0D%0AI%20am%20interested%20in%20learning%20more%20about%20your%20services.%0D%0A%0D%0APlease%20contact%20me%20at%20your%20earliest%20convenience.%0D%0A%0D%0AThank%20you!', label: 'Email' }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Abdullah Rana
                </h3>
                <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                  Full-Stack Web Developer passionate about creating scalable web applications 
                  with clean UIs and solid backends. Let's build something amazing together.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, href, label, target, rel }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={target}
                      rel={rel}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-dark-800 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-dark-700 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => {
                          const element = document.querySelector(link.href)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                <div className="space-y-3 text-gray-400">
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a 
                      href="mailto:15341@kiet.edu.pk"
                      className="hover:text-primary-400 transition-colors"
                    >
                      15341@kiet.edu.pk
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a 
                      href="tel:+923218293386"
                      className="hover:text-primary-400 transition-colors"
                    >
                      +92-321-8293386
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p>Karachi, Pakistan</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-400"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by Abdullah Rana</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © 2024 Abdullah Rana. All rights reserved.
            </motion.div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
