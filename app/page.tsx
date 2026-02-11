'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Particle background component
function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number}>>([]);

  useEffect(() => {
    // Only run on client side
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-30"
          initial={{ 
            x: particle.x, 
            y: particle.y 
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <ParticleBackground />
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6b00] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d4ff] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-6 leading-tight"
          >
            Stop Being Average.
            <br />
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              Actually Build Yourself.
            </span>
          </motion.h1>

          {/* New Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-semibold"
          >
            Get your hormone levels right. Get strong. Actually know what you're doing.
          </motion.p>

          {/* Before → After Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
          </motion.div>

          {/* Limited Spots Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block bg-gradient-to-r from-[#ff6b00] to-orange-600 px-6 py-2 rounded-full text-sm font-bold animate-pulse">
              ⏰ Real talk: 50 spots this month. That's it.
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              href="https://whop.com/checkout/plan_sJmA9B5hhxnJZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#ff6b00] to-orange-600 text-[#0a0a0a] px-12 py-4 rounded-lg font-black text-lg hover:shadow-2xl hover:shadow-[#ff6b00]/50 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get The Plan
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-[#ff6b00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Visual Roadmap Section */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-16 text-center"
          >
            Your Actual Roadmap
          </motion.h2>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b00]/30 via-[#00d4ff]/50 to-[#ff6b00]/30" />

            {/* Timeline Stages */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  stage: 1,
                  title: "You're In",
                  desc: 'Everything unlocked. No waiting, no BS.',
                  icon: '🔓',
                },
                {
                  stage: 2,
                  title: 'Foundation',
                  desc: 'Dial in your diet and habits. This is where it happens.',
                  icon: '🏗️',
                },
                {
                  stage: 3,
                  title: 'Momentum',
                  desc: 'Now you feel different. Energy, clarity, actual strength.',
                  icon: '⚡',
                },
                {
                  stage: 4,
                  title: 'Untouchable',
                  desc: 'This is your life now. You\'ve won.',
                  icon: '👑',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  {/* Glowing Node */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{
                        boxShadow: ['0 0 20px rgba(255, 107, 0, 0.5)', '0 0 40px rgba(0, 212, 255, 0.8)', '0 0 20px rgba(255, 107, 0, 0.5)'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center text-3xl border-2 border-[#00d4ff]/50"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Stage Number and Title */}
                  <div className="mb-2">
                    <p className="text-[#00d4ff] font-bold text-sm mb-1">STAGE {item.stage}</p>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Roadmap Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-16 text-lg italic"
          >
            No timer. Go at your own pace. You own this forever.
          </motion.p>
        </div>
      </section>

      {/* Video Placeholder Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden"
          >
            <div className="relative w-full aspect-video bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-xl border border-[#ff6b00]/30 flex items-center justify-center group cursor-pointer">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/10 to-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl relative z-10"
              >
                ▶️
              </motion.div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] to-transparent p-6">
                <p className="text-xl font-bold text-white">How You Actually Fix Your Test & Get Results</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transformation Journey */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-center"
          >
            What's Actually Going To Happen
          </motion.h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            This isn't a race. You've got lifetime access. Do this right.
          </p>

          {/* Journey Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Week 1: Get Started', desc: 'Download the system. Actually read it. No shortcuts here.' },
              { title: 'Week 2-3: First Changes', desc: 'Sleep better. Lift harder. Energy starts coming back.' },
              { title: 'Week 4-6: People Notice', desc: 'Mates ask what you\'re doing. You look different. You feel invincible.' },
              { title: 'Week 8+: This Is You Now', desc: 'Built different. This isn\'t temporary. This is your baseline.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="p-8 bg-[#0a0a0a] rounded-lg border border-[#ff6b00]/20 hover:border-[#ff6b00] hover:shadow-lg hover:shadow-[#ff6b00]/20 transition-all duration-300 group"
                >
                  <div className="text-5xl font-black text-[#ff6b00] mb-4 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </motion.div>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/4 text-[#00d4ff] font-bold text-xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Transformation Stats */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-16 text-center"
          >
            Listen Up: Here's The Difference
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Where You Are Now */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-400">Right Now (Yeah, You)</h3>
              <div className="space-y-6">
                {[
                  { icon: '😴', text: 'Dead by 3pm every day' },
                  { icon: '🌫️', text: 'Your brain feels like cement' },
                  { icon: '📉', text: 'Hitting the gym for 6 months. Same size.' },
                  { icon: '😕', text: 'No confidence. Zero belief in yourself.' },
                  { icon: '💭', text: 'You know what to do. You just can\'t do it.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Where You'll Be */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-[#00d4ff]">3 Months: The New You</h3>
              <div className="space-y-6">
                {[
                  { icon: '⚡', text: 'Energy all day. Actually want to train.', stat: '+2x' },
                  { icon: '🧠', text: 'Your head is clear. You think straight.', stat: '+100%' },
                  { icon: '💪', text: 'People ask what you\'re doing. You look built.', stat: '+10kg' },
                  { icon: '😎', text: 'Confidence isn\'t faked. It\'s real.', stat: '+Max' },
                  { icon: '🔥', text: 'You\'re unstoppable. Other blokes notice.', stat: '+∞' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg group hover:border-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                    <span className="font-black text-[#00d4ff] text-lg">{item.stat}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Big Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { label: 'Energy Boost', value: 2, suffix: 'x' },
              { label: 'Stronger', value: 10, suffix: 'kg' },
              { label: 'Confidence', value: 100, suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-[#111111] rounded-lg border border-[#ff6b00]/30 text-center">
                <p className="text-gray-400 mb-4">{stat.label}</p>
                <p className="text-6xl font-black text-[#ff6b00]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What's Inside the Club */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 text-center"
          >
            You're Getting Three Things
          </motion.h2>
          <p className="text-center text-gray-400 mb-16 text-lg max-w-2xl mx-auto">
            Lifetime access. Never expires. Never gets upsold. This is it.
          </p>

          {/* Course Modules */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🍽️',
                title: 'The Diet',
                features: ['Exact meals (no guessing)', 'Macros dialled in', 'Supplement stack that works', 'Weekly shopping lists'],
              },
              {
                icon: '⚙️',
                title: 'The Protocol',
                features: ['Sleep system (actually works)', 'Training split (proven)', 'Stress management (real shit)', 'Recovery guide (don\'t skip)'],
              },
              {
                icon: '🧠',
                title: 'The Mindset',
                features: ['Discipline framework', 'Build real confidence', 'Stay motivated (forever)', 'Rules to live by'],
              },
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-[#0a0a0a] rounded-lg border-2 border-[#ff6b00] hover:border-[#00d4ff] hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{module.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.features.map((feature, j) => (
                    <li key={j} className="text-gray-400 flex items-center gap-2">
                      <span className="text-[#00d4ff]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#ff6b00]/10 to-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#00d4ff]">Plus The Real Stuff:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '✉️  Private community - Real blokes. Real talk.',
                '📲  Weekly updates - New science. New tactics.',
                '📚  Downloadable sheets - Print it. Use it. Win.',
                '🔄  Lifetime updates - We keep adding. Forever.',
                '⏱️  No deadlines - You own this. Forever.',
                '💪  Real support - Actual humans. Not bots.',
              ].map((feature, i) => (
                <p key={i} className="text-gray-300 flex items-center gap-3">
                  {feature}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Who Am I?
            </h2>
            <div className="w-32 h-32 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full mx-auto mb-8 flex items-center justify-center text-6xl">
              💪
            </div>
            <p className="text-2xl font-bold mb-6">
              Just a bloke who fixed himself
            </p>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              I was exactly where you are. Tired. Unmotivated. Watching other blokes actually live. So I figured it out. Studied the science. Tested everything.  And yeah, I built myself from zero.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Now I'm giving you the exact blueprint. Not some flashy bullshit. Not influencer nonsense. Real science. Real results. Real talk. This is what actually works when you stop making excuses and start building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-12 text-center"
          >
            Real Blokes. Real Results.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jake',
                location: 'Sydney',
                testimonial: '3 months in and I didn\'t think this would actually work. Mates are asking what I\'m doing. Energy is insane. The system just works.',
                stats: ['+8kg', '+2x Energy'],
                initial: 'J',
              },
              {
                name: 'Lachie',
                location: 'Melbourne',
                testimonial: 'Brain fog completely gone. Actually sharp now. Results showing. Recommended to all my mates. Worth every cent.',
                stats: ['+6kg', '+100% Focus'],
                initial: 'L',
              },
              {
                name: 'Tyler',
                location: 'Brisbane',
                testimonial: 'Didn\'t expect this to work but mate, biggest change I\'ve made. Built different now. Real results. Proper investment.',
                stats: ['+10kg', '+50% Confidence'],
                initial: 'T',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-8 bg-[#111111] rounded-lg border border-gray-800 hover:border-[#ff6b00] hover:shadow-lg hover:shadow-[#ff6b00]/20 transition-all duration-300 group cursor-pointer"
              >
                {/* Photo Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center font-bold text-2xl text-[#0a0a0a] mb-4 group-hover:scale-110 transition-transform">
                  {testimonial.initial}
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#ff6b00]">★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-400 mb-4 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>

                {/* Name & Location */}
                <p className="font-bold mb-1">{testimonial.name}</p>
                <p className="text-sm text-gray-500 mb-4">{testimonial.location}</p>

                {/* Transformation Stats */}
                <div className="flex gap-4 pt-4 border-t border-gray-800">
                  {testimonial.stats.map((stat, j) => (
                    <div key={j} className="text-[#00d4ff] font-bold text-sm">
                      {stat}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">
              Simple Pricing
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              No recurring charges. No hidden costs. No BS.
            </p>

            {/* Premium Price Card */}
            <div className="relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] p-1 rounded-lg mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] rounded-lg opacity-20 blur-xl" />
              
              <div className="relative bg-[#0a0a0a] p-12 rounded-lg border border-[#ff6b00]/30">
                {/* Limited Spots Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#ff6b00] to-orange-600 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                    ⏰ Only 50 spots left
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 mb-4 text-lg font-semibold">One-time investment</p>
                  <div className="text-8xl font-black text-transparent bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text mb-4">
                    $57
                  </div>
                  <p className="text-gray-400 mb-8 text-lg">Lifetime access. Updates forever.</p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                    {[
                      '✓ Complete diet & training system',
                      '✓ Mental game framework',
                      '✓ Community access',
                      '✓ Lifetime updates',
                      '✓ Downloadable resources',
                      '✓ Move at your own pace',
                    ].map((feature, i) => (
                      <p key={i} className="text-gray-300 flex items-center gap-3">
                        <span className="text-[#00d4ff]">{feature.split(' ')[0]}</span>
                        {feature.substring(2)}
                      </p>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="https://whop.com/checkout/plan_sJmA9B5hhxnJZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-full bg-gradient-to-r from-[#ff6b00] to-orange-600 text-[#0a0a0a] px-8 py-5 rounded-lg font-black text-xl hover:shadow-2xl hover:shadow-[#ff6b00]/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Join The Club Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-[#ff6b00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>

                  <p className="text-gray-500 text-sm mt-6">
                    Secure checkout. 30-day access guarantee.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-4 font-bold">Hit Me Up</p>
              <a
                href="https://instagram.com/oikirkybruz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b00] font-bold hover:text-[#00d4ff] transition-colors text-lg"
              >
                @oikirkybruz on Instagram
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="font-bold text-lg mb-2">Built Different™</p>
              <p className="text-sm text-gray-500">
                Testosterone Optimization. For blokes who actually want to change.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-sm border-t border-gray-800 pt-8"
          >
            <p className="mb-4">
              These statements are for education. Not medical advice. Talk to a doctor if you're a complete idiot. Or just actually read the content properly.
            </p>
            <p>&copy; 2026 Built Different™. Stop being average.</p>
          </motion.div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-[#0a0a0a] to-[#0a0a0a]/80 backdrop-blur border-t border-[#ff6b00]/30 p-4 z-50"
      >
        <a
          href="https://whop.com/checkout/plan_sJmA9B5hhxnJZ"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-[#ff6b00] to-orange-600 text-[#0a0a0a] py-4 rounded-lg font-black text-center text-lg hover:shadow-2xl hover:shadow-[#ff6b00]/50 transition-all"
        >
          Join The Club - $57
        </a>
      </motion.div>

      {/* Spacing for mobile CTA */}
      <div className="h-20 md:h-0" />
    </div>
  );
}
