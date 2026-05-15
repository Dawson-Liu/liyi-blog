import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layout, 
  PenTool, 
  Search, 
  Settings, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  Zap,
  Globe,
  Share2,
  ArrowRight,
  Menu,
  X,
  Languages
} from 'lucide-react';
import { cn } from './lib/utils';
import type { BlogPlan } from './types.ts';
import { translations, type Language } from './translations';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'planner' | 'guide'>('planner');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('zh');

  const t = translations[lang];
  const toggleLang = () => setLang(l => l === 'zh' ? 'en' : 'zh');

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200"
            >
              <PenTool size={20} />
            </motion.div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Blog<span className="text-violet-600">Hub</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-2 rounded-full bg-neutral-100/50 p-1 border border-neutral-200">
            <NavLinks activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
          </div>

          {/* Social Icons / Quick Action */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-black uppercase hover:bg-neutral-50 transition-all active:scale-95"
            >
              <Languages size={14} className="text-violet-600" />
              {lang === 'zh' ? 'English' : '中文'}
            </button>
            <button className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-bold text-white hover:bg-neutral-800 transition-all active:scale-95 shadow-md shadow-neutral-200">
              {t.nav.cta}
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <NavLinks 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }} 
                lang={lang}
              />
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 rounded-xl bg-neutral-100 p-4 text-sm font-black uppercase"
              >
                <Languages size={18} className="text-violet-600" />
                {lang === 'zh' ? 'Switch to English' : '切换至中文'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeTab === 'preview' && <BlogPreview lang={lang} />}
          {activeTab === 'planner' && <BlogPlanner lang={lang} />}
          {activeTab === 'guide' && <WordPressGuide lang={lang} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-sm text-neutral-500">
              © 2026 Modern Blog Designer. Powered by AI Studio.
            </div>
            <div className="flex gap-8 text-sm font-medium text-neutral-600">
              <a href="#" className="hover:text-neutral-900Transition transition-colors">Documentation</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLinks({ activeTab, setActiveTab, lang }: { activeTab: string, setActiveTab: (tab: any) => void, lang: Language }) {
  const t = translations[lang];
  const links = [
    { id: 'planner', label: t.nav.planner, icon: Sparkles },
    { id: 'guide', label: t.nav.guide, icon: BookOpen },
    { id: 'preview', label: t.nav.preview, icon: Layout },
  ];

  return (
    <>
      {links.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={cn(
            "relative flex items-center gap-2 px-6 py-2 text-sm font-bold transition-all duration-300 rounded-full",
            activeTab === id 
              ? "text-neutral-900 shadow-sm" 
              : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          {activeTab === id && (
            <motion.div 
              layoutId="nav-bg"
              className="absolute inset-0 bg-white rounded-full z-0"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            />
          )}
          <Icon size={16} className={cn("relative z-10", activeTab === id ? "text-violet-600" : "")} />
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </>
  );
}

function BlogPlanner({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<BlogPlan | null>(null);

  const generatePlan = async () => {
    if (!niche || !goal) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, goal, language: lang }),
      });
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 mb-6"
        >
          <Sparkles size={12} />
          {t.planner.tag}
        </motion.div>
        <h1 className="text-5xl font-black tracking-tight text-neutral-900 sm:text-7xl leading-[1.1]">
          {t.planner.title.split(' ')[0]} <span className="gradient-text italic font-serif">{t.planner.title.split(' ')[1]}</span>
        </h1>
        <p className="mt-6 text-xl text-neutral-500 max-w-2xl leading-relaxed">
          {t.planner.subtitle}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Input Form - Bento Box 1 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-youthful border-violet-100/50 bg-gradient-to-b from-white to-violet-50/30">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                <Settings size={20} />
              </div>
              {t.planner.configTitle}
            </h2>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-violet-600 transition-colors">
                  {t.planner.nicheLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.planner.nichePlaceholder}
                  className="w-full rounded-[1.25rem] bg-neutral-50 border-2 border-transparent px-5 py-3 focus:border-violet-200 focus:bg-white outline-none transition-all font-medium text-neutral-800"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-cyan-600 transition-colors">
                  {t.planner.missionLabel}
                </label>
                <textarea
                  rows={4}
                  placeholder={t.planner.missionPlaceholder}
                  className="w-full rounded-[1.25rem] bg-neutral-50 border-2 border-transparent px-5 py-3 focus:border-cyan-200 focus:bg-white outline-none transition-all font-medium text-neutral-800 resize-none"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generatePlan}
                disabled={isLoading}
                className="group w-full rounded-[1.25rem] bg-neutral-900 py-4 font-black text-white hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-neutral-200"
              >
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ) : (
                  <>
                    <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all">
                      {t.planner.generateBtn}
                    </span>
                    <ArrowRight size={18} className="text-violet-400" />
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-cyan-900 p-8 text-white relative overflow-hidden shadow-2xl shadow-cyan-100">
            <div className="absolute -right-8 -top-8 size-32 bg-cyan-400/20 blur-3xl" />
            <div className="relative z-10">
              <div className="p-2 rounded-xl bg-cyan-400/20 w-fit text-cyan-300 mb-4">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.planner.socialTitle}</h3>
              <p className="text-sm text-cyan-100/70 leading-relaxed font-medium">
                {t.planner.socialDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Results - Bento Grid Layout */}
        <div className="lg:col-span-8">
          {plan ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Themes Grid Item */}
              <section className="md:col-span-2 card-youthful border-violet-100 bg-white/40">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black italic flex items-center gap-3">
                    <Layout size={24} className="text-violet-600" />
                    {t.planner.results.themes}
                  </h3>
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 text-[10px] font-black rounded-full uppercase">{t.planner.results.themesTag}</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {plan.themes.map((theme, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden rounded-3xl bg-neutral-50 p-6 border-2 border-transparent hover:border-violet-200 transition-all cursor-pointer"
                    >
                      <div className="mb-4 size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-violet-600 font-bold italic">
                        {i + 1}
                      </div>
                      <h4 className="font-black text-xl mb-2">{theme.name}</h4>
                      <p className="text-sm text-neutral-500 font-medium mb-6 leading-relaxed">{theme.description}</p>
                      <div className="flex items-center gap-2 text-xs font-black uppercase text-violet-600 group-hover:gap-4 transition-all">
                        {t.planner.results.explore} <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Content Plan */}
              <section className="card-youthful border-cyan-100 bg-white/40">
                <h3 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                  <PenTool size={24} className="text-cyan-600" />
                  {t.planner.results.content}
                </h3>
                <div className="space-y-4">
                  {plan.contentPlan.map((post, i) => (
                    <div key={i} className="group relative rounded-2xl bg-neutral-50/50 p-4 hover:bg-white transition-all">
                      <div className="flex items-start gap-4">
                        <span className="text-sm font-black font-mono text-cyan-200 group-hover:text-cyan-600 transition-colors">0{i + 1}</span>
                        <div>
                          <h4 className="font-bold text-neutral-800">{post.title}</h4>
                          <p className="text-[11px] font-medium text-neutral-400 mt-1 line-clamp-2">{post.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Plugins & SEO */}
              <div className="space-y-6">
                <section className="card-youthful border-rose-100 bg-gradient-to-br from-white to-rose-50/20 p-6">
                  <h3 className="text-xl font-black italic mb-6 flex items-center gap-3">
                    <Zap size={22} className="text-rose-500" />
                    {t.planner.results.plugins}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.plugins.map((plugin, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-xl bg-white border border-rose-100 text-[11px] font-bold text-rose-600 shadow-sm hover:scale-105 transition-transform cursor-help" title={plugin.purpose}>
                        {plugin.name}
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="card-youthful border-emerald-100 bg-gradient-to-br from-white to-emerald-50/20 p-6">
                  <h3 className="text-xl font-black italic mb-6 flex items-center gap-3">
                    <Search size={22} className="text-emerald-500" />
                    {t.planner.results.seo}
                  </h3>
                  <ul className="space-y-3">
                    {plan.seoTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-bold text-emerald-800/70">
                        <div className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[600px] items-center justify-center rounded-[3rem] border-4 border-dashed border-neutral-100 bg-white/50 text-neutral-300">
              <div className="text-center group clickable" onClick={() => niche && generatePlan()}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Sparkles size={80} className="mx-auto mb-8 text-violet-200 group-hover:text-violet-400 transition-colors" />
                </motion.div>
                <p className="text-xl font-black italic tracking-widest uppercase mb-2">{t.planner.readyTitle}</p>
                <p className="text-sm font-medium">{t.planner.readyDesc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WordPressGuide({ lang }: { lang: Language }) {
  const t = translations[lang];
  const recommendations = {
    themes: [
      { name: "Astra", type: "VERSATILE", desc: lang === 'zh' ? "最受欢迎的力作，几乎能做任何类型的博客。轻量、快速、稳健。" : "Most popular powerhouse. Fast, lightweight, and incredibly versatile.", color: "bg-blue-500" },
      { name: "GeneratePress", type: "PERFORMANCE", desc: lang === 'zh' ? "代码洁癖者的首选。极致性能，让您的博客起飞。" : "The choice for code purists. Performance-first architecture.", color: "bg-emerald-500" },
      { name: "Blocksy", type: "MODERN", desc: lang === 'zh' ? "为古腾堡而生。极佳的视觉定制体验，交互如丝般顺滑。" : "Built for Gutenberg. Modern, smooth interactions and deep customization.", color: "bg-violet-500" }
    ],
    plugins: [
      { name: "Rank Math", cat: "SEO", desc: lang === 'zh' ? "SEO 届的瑞士军刀，帮你搞定搜索排名。" : "The Swiss army knife of SEO. Master your rankings.", icon: Search },
      { name: "WP Rocket", cat: lang === 'zh' ? "缓存" : "Cache", desc: lang === 'zh' ? "让网页像闪电一样加载，用户体验的保障。" : "Make your pages fly like lightning.", icon: Zap },
      { name: "Elementor", cat: lang === 'zh' ? "创意" : "Design", desc: lang === 'zh' ? "可视化设计从未如此简单，释放你的审美。" : "Visual design made easy. Unleash your creativity.", icon: Layout },
      { name: "UpdraftPlus", cat: lang === 'zh' ? "安全" : "Secure", desc: lang === 'zh' ? "数据是博主的生命线，定期自动备份。" : "Your blog's life insurance. Auto backups.", icon: Settings }
    ]
  };

  return (
    <div className="space-y-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-black tracking-tight text-neutral-900 sm:text-7xl leading-[1.1]">
          WordPress <span className="text-violet-600 italic font-serif transition-all duration-300">{t.guide.title.split(' ')[1]}</span>
        </h1>
        <p className="mt-6 text-xl text-neutral-500 max-w-2xl">
          {t.guide.subtitle}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Theme Showcase */}
        <section className="lg:col-span-7 space-y-8">
          <h2 className="text-3xl font-black italic border-b-4 border-violet-100 pb-4 inline-block">{t.guide.themesTitle}</h2>
          <div className="grid grid-cols-1 gap-6">
            {recommendations.themes.map((theme, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="group relative flex items-center gap-6 rounded-[2.5rem] bg-white p-6 shadow-xl shadow-neutral-100/50 border border-neutral-100"
              >
                <div className={cn("flex size-20 shrink-0 items-center justify-center rounded-[1.5rem] text-white", theme.color)}>
                  <Layout size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black">{theme.name}</h3>
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-neutral-100 text-neutral-400 rounded-md">
                      {theme.type}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 font-medium italic">{theme.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Plugin Bento */}
        <section className="lg:col-span-5 space-y-8">
          <h2 className="text-3xl font-black italic border-b-4 border-cyan-100 pb-4 inline-block">{t.guide.pluginsTitle}</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendations.plugins.map((plugin, i) => (
              <div key={i} className={cn(
                "p-6 rounded-[2rem] border border-neutral-100 transition-all hover:shadow-lg",
                i % 3 === 0 ? "bg-white" : "bg-neutral-50"
              )}>
                <div className="mb-4 size-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <plugin.icon size={20} />
                </div>
                <h3 className="font-black text-sm mb-1">{plugin.name}</h3>
                <p className="text-[11px] font-bold text-neutral-400 mb-2 uppercase tracking-widest">{plugin.cat}</p>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">{plugin.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="relative isolate overflow-hidden rounded-[4rem] bg-neutral-900 px-8 py-24 md:px-24 text-center text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-50" />
        <Globe size={64} className="mx-auto mb-8 text-cyan-400 animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-black serif font-serif italic mb-6">{t.guide.ctaTitle}</h2>
        <p className="max-w-xl mx-auto text-neutral-400 font-medium mb-12">
          {t.guide.ctaDesc}
        </p>
        <button className="group relative rounded-full bg-white px-10 py-5 text-sm font-black text-neutral-900 transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
          <span className="relative z-10 flex items-center gap-3">
            {t.guide.ctaBtn} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}

function BlogPreview({ lang }: { lang: Language }) {
  const t = translations[lang];
  const posts = [
    { 
      title: lang === 'zh' ? "数字游民的极简旅行指南" : "Digital Nomad's Minimalist Travel Guide", 
      date: "2026.05.15", 
      category: "LIFESTYLE", 
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      title: lang === 'zh' ? "为什么每个人都应该写博客？" : "Why Should Everyone Start a Blog?", 
      date: "2026.05.12", 
      category: "ESSAY", 
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      title: lang === 'zh' ? "从零开始构建您的个人品牌" : "Building Your Personal Brand from Scratch", 
      date: "2026.05.10", 
      category: "BRANDING", 
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=800" 
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section - Recipe 2: Editorial */}
      <section className="relative overflow-hidden pt-12 pb-24">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">{t.preview.tag}</span>
            <div className="h-px w-12 bg-neutral-200" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 italic font-serif">{t.preview.vol}</span>
          </div>
          <h1 className="text-center font-serif text-[12vw] font-bold leading-[0.8] tracking-tight sm:text-[10vw]">
            {t.preview.title.split(' ')[0]} <br />
            <span className="italic-serif italic">{t.preview.title.split(' ')[1]}</span>
          </h1>
          <p className="mt-12 max-w-lg text-center text-neutral-500 leading-relaxed italic">
            {t.preview.subtitle}
          </p>
          <div className="mt-8 flex gap-4">
            <button className="rounded-full border border-neutral-900 px-6 py-2 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-all">
              {t.preview.readBtn}
            </button>
            <button className="flex items-center gap-2 text-sm font-medium hover:underline">
              {t.preview.subscribeBtn} <Share2 size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="space-y-12">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-6">
          <h2 className="text-4xl font-bold font-serif italic tracking-tight">{t.preview.recentTitle}</h2>
          <span className="text-xs font-bold text-neutral-400 tracking-tighter">{t.preview.newStories}</span>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="space-y-4 group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-200 rounded-2xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{post.category}</span>
                  <div className="size-1 rounded-full bg-neutral-300" />
                  <span className="text-[10px] font-bold text-neutral-400">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif flex items-start justify-between gap-4">
                  {post.title}
                  <ExternalLink size={18} className="text-neutral-300 group-hover:text-neutral-900 transition-colors" />
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-24 border-y border-neutral-200">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="text-3xl md:text-5xl font-serif font-bold leading-tight italic text-neutral-900">
            {t.preview.quote}
          </blockquote>
          <cite className="mt-8 block text-sm font-bold uppercase tracking-widest text-neutral-400">{t.preview.author}</cite>
        </div>
      </section>
    </div>
  );
}
