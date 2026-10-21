import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Download, ExternalLink, FileText, Mail, Menu, X, Video, Presentation, PenTool, FileCheck2, UsersRound, ChartNoAxesColumnIncreasing, GraduationCap, MessageCircle, Target, Laptop, BriefcaseBusiness, Image as ImageIcon, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const resumeUrl = '/veronika-resume.pdf';
const gatewayPage = 'https://www.facebook.com/gateway.bridge.3/';
// Links are external references to company-owned content, not hosted copies.
const archive = [
  { title: 'Facebook Reel 01', url: 'https://www.facebook.com/reel/1606339526614233' },
  { title: 'Facebook Reel 02', url: 'https://www.facebook.com/reel/1111627923864649' },
  { title: 'Facebook Reel 03', url: 'https://www.facebook.com/reel/1002805811383674' },
  { title: 'Facebook Video 04', url: 'https://www.facebook.com/watch/?v=730534825859830' },
  { title: 'Facebook Reel 05', url: 'https://www.facebook.com/reel/887628899640944' },
  { title: 'Facebook Reel 06', url: 'https://www.facebook.com/reel/1024437795538676' },
  { title: 'Facebook Reel 07', url: 'https://www.facebook.com/reel/665385515586117' },
  { title: 'Facebook Post 08', url: 'https://www.facebook.com/story.php?story_fbid=1759920291193355&id=100015262032975' },
  { title: 'Visa Approval Highlight 01', url: 'https://www.facebook.com/100072122739369/posts/1315450439004531/' },
  { title: 'Visa Approval Highlight 02', url: 'https://www.facebook.com/100072122739369/posts/332262332521189/' },
  { title: 'Visa Approval Highlight 03', url: 'https://www.facebook.com/100072122739369/posts/324050173342405/' },
  { title: 'Visa Approval Highlight 04', url: 'https://www.facebook.com/100072122739369/posts/352038787210210/' },
  { title: 'Visa Approval Highlight 05', url: 'https://www.facebook.com/story.php?story_fbid=1720735505111834&id=100015262032975' },
  { title: 'Visa Approval Highlight 06', url: 'https://www.facebook.com/photo.php?fbid=1701676863684365&type=3' },
  { title: 'Visa Approval Highlight 07', url: 'https://www.facebook.com/story.php?story_fbid=1740073993177985&id=100015262032975' },
  { title: 'Visa Approval Highlight 08', url: 'https://www.facebook.com/story.php?story_fbid=1796960910822626&id=100015262032975' },
];
// Update extensions here if Windows Explorer shows .jpg/.jpeg rather than .png.
const testimonials = [
  { src: '/images/testimonials/gt1.png', alt: 'Gateway Bridge Facebook client recommendation screenshot 1' },
  { src: '/images/testimonials/gt2.png', alt: 'Gateway Bridge Facebook client recommendation screenshot 2' },
];
const gatewayPhotos = [
  { src: '/images/gbphotos/gb1.png', alt: 'Gateway Bridge professional group photograph 1' },
  { src: '/images/gbphotos/gb2.png', alt: 'Gateway Bridge professional group photograph 2' },
];
const contributions = [
  { title: 'Social Media Management', description: 'Managed the company Facebook page and published selected posts and updates.', Icon: UsersRound },
  { title: 'Video Content', description: 'Created selected promotional videos used in the company’s social media activities.', Icon: Video },
  { title: 'Marketing Layouts & Templates', description: 'Developed promotional layouts and reusable templates; some were used by the company.', Icon: PenTool },
  { title: 'Proofreading', description: 'Reviewed copy and presentation materials for clarity, grammar, and accuracy.', Icon: FileCheck2 },
];
const presentations = [
  { title: 'Pre-Departure Orientation', description: 'Updated orientation presentation slides.' },
  { title: 'Australia, Canada & USA', description: 'Prepared information-session presentation materials.' },
  { title: 'Germany & Ireland', description: 'Created presentation materials subsequently used in company information sessions.' },
];
const roles = ['Business Operations Analyst', 'Virtual Assistant', 'Marketing & Client Relations', 'B2B Lead Generation'];
const tiles = [
  { label: 'People', Icon: UsersRound, className: 'tile-people' },
  { label: 'Marketing', Icon: ChartNoAxesColumnIncreasing, className: 'tile-marketing' },
  { label: 'Student Support', Icon: GraduationCap, className: 'tile-students' },
  { label: 'Client Relations', Icon: MessageCircle, className: 'tile-clients' },
  { label: 'Lead Generation', Icon: Target, className: 'tile-leads' },
  { label: 'Operations', Icon: BriefcaseBusiness, className: 'tile-operations' },
];
const experience = [
  { period: 'AUG 2025 — PRESENT*', role: 'Business Operations Analyst', company: 'The Fullsuite Pod', description: 'Venture capital document extraction and screening, quality checks, B2B prospect research, DocuSign preparation, invoices, and executive support.', tasks: ['Extract and organize information from venture capital documents, including corporate charters and investor agreements.', 'Screen documents and perform partial quality checks for missing pages, signatures, dates, formatting issues, and discrepancies.', 'Research B2B prospects, relevant decision-makers, and potential users based on project requirements.', 'Prepare and send DocuSign documents, create invoices, and support executive administration and filing.'] },
  { period: 'OCT 2024 — JUL 2025', role: 'Builder Relations & Marketing Specialist', company: 'REEDU Virtual Staffing', description: 'Builder outreach, preconstruction project research, brokerage communications, marketing-material rebranding, file organization, and CRM support.', tasks: ['Contact builders and sales representatives to source preconstruction projects for brokerage marketing.', 'Maintain builder and sales relationships through email and phone communication.', 'Collect project details and rebrand brochures, price lists, and incentive materials.', 'Organize raw project files and support uploading subdomains to HighKey CRM.'] },
  { period: 'JUN 2023 — AUG 2024', role: 'Junior Consultant & Marketing Representative', company: 'Gateway Bridge Educational Consultancy', description: 'Student visa documentation, study-abroad guidance, eligibility review, marketing communication, social media updates, and lead generation.', tasks: ['Assist students in gathering and preparing visa application documents.', 'Assess student eligibility using academic records and explain study-abroad, visa, and financial considerations.', 'Provide student guidance by phone and online channels.', 'Support marketing and lead generation through Facebook updates about visa grants, school partnerships, and immigration news.', 'Proofread content for grammar, spelling, punctuation, and accuracy.'] },
  { period: 'FEB 2023 — JUN 2023', role: 'Administrative Assistant — Client Relations & Student Support', company: 'Gateway Bridge Educational Consultancy', description: 'Student inquiries, visa applications, client communication, social media content, accommodation and airport-pickup coordination.', tasks: ['Respond to student inquiries and maintain client relationships and communication.', 'Manage and publish Facebook content related to visa grants and school partnerships.', 'Proofread and edit documents to maintain accuracy and professionalism.', 'Coordinate airport pickups and accommodation arrangements.', 'Assist with student visa applications and provide internal team support.'] },
  { period: 'MAR 2022 — AUG 2022', role: 'TUPAD Coordinator — Job Order Payroll Officer', company: 'Department of Labor and Employment — CAR', description: 'Monthly payroll for over 200 job-order employees, Excel payroll records, attendance review, employee inquiries, and bookkeeping assistance.', tasks: ['Process monthly payroll for more than 200 job-order employees.', 'Review time records, attendance, and required payroll authorizations.', 'Maintain Excel payroll programs and update salaries, promotions, and deductions.', 'Protect confidential payroll information and respond to employee payroll questions.', 'Assist with bookkeeping-related tasks.'] },
  { period: 'JUN 2021 — DEC 2021', role: 'Government Internship Program', company: 'Regional Tripartite Wages and Productivity Board — CAR', description: 'Administrative and technical support, social media monitoring, event coordination, document distribution, and video editing.', tasks: ['Provide administrative and technical support to the regional board.', 'Monitor social media content and assist with engagement efforts.', 'Review and distribute incoming memoranda.', 'Help organize conferences and programs including Productivity Olympics, Good Housekeeping Training, and Media Marketing Training.', 'Answer client and employee calls, and assist with AVP video editing and Zoom backgrounds.'] },
];
const skills = ['B2B Prospect Research', 'Lead Generation', 'Document Screening', 'Quality Assurance', 'Client Relations', 'Marketing Communications', 'Social Media Management', 'Administrative Support', 'Project Coordination', 'Email Management', 'Proofreading', 'Cold Calling'];

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay }}>{children}</motion.div>;
}
function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={`photo-fallback ${className}`}><span>VERONIKA.</span><small>Place {src.split('/').pop()} in public/images</small></div> : <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
function HeroLaptop() {
  return <div className="laptop-scene"><div className="laptop-lid"><div className="laptop-bezel"><span className="webcam" /><div className="screen-portrait"><Photo src="/images/veronika-hero.png" alt="Veronika at work" /></div></div></div><div className="laptop-base"><div className="laptop-notch" /></div><div className="laptop-shadow" /></div>;
}
function ResumeModal({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll('.resume-modal button, .resume-modal a')).filter(el => !el.hasAttribute('disabled'));
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); previousFocus?.focus?.(); };
  }, [onClose]);
  return <div className="resume-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <div className="resume-toolbar"><div><strong id="resume-title">VERONIKA — RESUME</strong><small>Professional profile · 2-page PDF</small></div><div className="resume-tools"><a href={resumeUrl} target="_blank" rel="noopener noreferrer" title="Open resume in new tab"><ExternalLink size={19} /><span>Open</span></a><a href={resumeUrl} download="Veronika-Jose-De-Leon-Resume.pdf" title="Download resume"><Download size={19} /><span>Download</span></a><button type="button" ref={closeRef} onClick={onClose} aria-label="Close resume"><X size={23} /></button></div></div>
      <iframe className="resume-frame" title="Veronika Jose De Leon resume PDF" src={`${resumeUrl}#toolbar=1`} />
      <p className="resume-mobile-hint">If the PDF does not display on your device, use Open or Download above.</p>
    </section>
  </div>;
}

function GalleryModal({ item, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keydown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = overflow; previous?.focus?.(); };
  }, [onClose]);
  return <div className="gallery-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button type="button" ref={closeRef} className="gallery-close" onClick={onClose} aria-label="Close image"><X size={24} /></button>
      <img src={item.src} alt={item.alt} /><p>{item.alt}</p>
    </div>
  </div>;
}


function ExperienceModal({ item, index, onClose }) {
  const closeRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll('.experience-dialog button, .experience-dialog a')).filter(el => !el.disabled);
        if (!elements.length) return;
        if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements[elements.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) { event.preventDefault(); elements[0].focus(); }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', handleKey); previousFocus?.focus?.(); };
  }, [onClose]);
  return <motion.div className="experience-dialog-backdrop" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: .22 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.section className="experience-dialog" role="dialog" aria-modal="true" aria-labelledby="experience-dialog-title" initial={reduced ? false : { opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, scale: .96, y: 12 }} transition={{ duration: .32, ease: [.22, 1, .36, 1] }}>
      <div className="experience-dialog-top"><span>PROFESSIONAL EXPERIENCE / {String(index + 1).padStart(2, '0')}</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Close experience details"><X size={23} /></button></div>
      <div className="experience-dialog-content">
        <p className="experience-dialog-period">{item.period}</p>
        <h2 id="experience-dialog-title">{item.role}</h2>
        <h3>{item.company}</h3>
        <p className="experience-dialog-description">{item.description}</p>
        <div className="experience-dialog-divider" />
        <p className="experience-dialog-label">KEY RESPONSIBILITIES</p>
        <ol className="experience-dialog-tasks">{item.tasks.map((task, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><p>{task}</p></li>)}</ol>
      </div>
      <div className="experience-dialog-footer"><span>VERONIKA JOSE DE LEON</span><button type="button" onClick={onClose}>CLOSE DETAILS <X size={15} /></button></div>
    </motion.section>
  </motion.div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const reduced = useReducedMotion();
  const closeMenu = () => setMenuOpen(false);
  return <div className="site-shell" id="home">
    <header className="site-header"><a className="brand" href="#home" onClick={closeMenu}>VERONIKA<span>.</span></a><button className="mobile-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button><nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">{['Home', 'About', 'Experience', 'Work', 'Testimonials', 'Gallery', 'Contact'].map(item => <a href={`#${item.toLowerCase()}`} key={item} onClick={closeMenu}>{item}</a>)}<button type="button" className="nav-resume" onClick={() => { closeMenu(); setResumeOpen(true); }}><FileText size={16} /> Resume</button></nav></header>
    <main>
      <section className="hero grid-background" aria-labelledby="hero-title"><div className="hero-tiles" aria-hidden="true">{tiles.map(({ label, Icon, className }) => <div className={`hero-tile ${className}`} key={label}><Icon size={30} strokeWidth={1.4} /><span>{label}</span></div>)}</div><div className="ambient-square square-one" /><div className="ambient-square square-two" /><div className="ambient-square square-three" />
        <motion.div className="hero-visual" initial={reduced ? false : { opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9 }}><HeroLaptop /></motion.div>
        <motion.div className="hero-content" initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .15 }}><p className="eyebrow">HELLO, I'M</p><h1 id="hero-title">VERONIKA<span>.</span></h1><p className="role-line">{roles.join('  |  ')}</p><div className="gold-rule" /><p className="hero-description">I connect people, information, and opportunities through business operations, client relations, marketing, and lead generation. From supporting students to organizing complex business documents, I bring care and precision to every project.</p><div className="hero-actions"><a className="button-primary" href="#experience">EXPLORE MY EXPERIENCE <ArrowRight size={17} /></a><button type="button" className="button-outline" onClick={() => setResumeOpen(true)}><FileText size={17} /> VIEW RESUME</button></div></motion.div><p className="hero-script">Turning<br />conversations<br />into opportunities.</p>
      </section>
      <section className="about content-section" id="about"><div className="section-container about-layout"><Reveal className="about-visual"><div className="about-visual-inner about-photo-card"><Photo src="/images/veronika-sideview.png" alt="Veronika Jose De Leon" className="about-portrait" /><span className="corner-label about-photo-label">A LITTLE ABOUT ME / 01</span><p className="about-photo-caption">PEOPLE FIRST.<br />PURPOSE ALWAYS.</p></div></Reveal><Reveal className="about-copy" delay={.1}><p className="section-kicker">01 / ABOUT ME</p><h2>MORE THAN<br /><em>A TITLE.</em></h2><p className="section-lead">Hi, I'm Veronika Jose De Leon — a detail-oriented professional who values communication, organization, and meaningful relationships.</p><p>My experience spans venture capital operations, real estate marketing, educational consultancy, client and student support, and B2B lead generation. I enjoy bringing structure to complex workflows and helping people move forward with confidence.</p><p>I graduated from Saint Louis University with a Bachelor of Science in Business Administration, Major in Marketing.</p><div className="about-actions"><a className="section-link" href="#experience">EXPLORE MY EXPERIENCE <ArrowUpRight size={17} /></a><button className="section-link" type="button" onClick={() => setResumeOpen(true)}>VIEW MY RESUME <FileText size={17} /></button></div></Reveal></div></section>
      <section className="experience content-section" id="experience"><div className="section-container"><Reveal className="section-heading"><p className="section-kicker">02 / PROFESSIONAL JOURNEY</p><h2>EXPERIENCE &amp; <em>EXPERTISE.</em></h2><p>Real work across operations, marketing, consulting, and people-focused support.</p></Reveal><div className="experience-list">{experience.map((item, i) => <Reveal key={`${item.company}-${item.period}`} delay={Math.min(i * .05, .2)}><article className="experience-entry"><button type="button" className="experience-trigger" aria-haspopup="dialog" onClick={() => setSelectedExperience(i)}><span className="experience-date">{item.period}</span><span className="experience-details"><span className="experience-role">{item.role}</span><strong>{item.company}</strong><span className="experience-summary">{item.description}</span><span className="experience-hint">VIEW FULL RESPONSIBILITIES</span></span><span className="experience-toggle" aria-hidden="true"><ArrowUpRight size={27} /></span></button></article></Reveal>)}</div><p className="experience-note">*“Present” reflects the status listed in the supplied resume; confirm before publishing.</p></div></section>
      <section className="skills-section content-section" id="skills"><div className="section-container"><Reveal className="section-heading"><p className="section-kicker">03 / CAPABILITIES</p><h2>WHAT I <em>BRING.</em></h2><p>Skills developed through hands-on experience across industries.</p></Reveal><Reveal className="skills-grid">{skills.map((skill, i) => <div className="skill-item" key={skill}><span>{String(i + 1).padStart(2, '0')}</span>{skill}</div>)}</Reveal><Reveal className="education-card"><GraduationCap size={32} /><div><span className="section-kicker">EDUCATION</span><h3>Saint Louis University</h3><p>Bachelor of Science in Business Administration — Major in Marketing</p><small>2015–2020</small></div></Reveal></div></section>
      <section className="projects content-section" id="work">
        <div className="section-container">
          <Reveal className="section-heading"><p className="section-kicker">04 / SELECTED PROFESSIONAL WORK</p><h2>CREATIVE WORK &amp; <em>CONTRIBUTIONS.</em></h2><p>Marketing, educational content, and social media contributions during my time at Gateway Bridge Educational Consultancy (2023–2024).</p></Reveal>
          <Reveal><div className="gateway-intro"><span>GATEWAY BRIDGE EDUCATIONAL CONSULTANCY</span><h3>Social Media, Marketing &amp; Presentation Support</h3><p>My contributions included Facebook page management, content publishing, selected video creation, promotional layouts and templates, proofreading, and educational presentation development.</p></div></Reveal>
          <div className="contribution-grid">{contributions.map(({ title, description, Icon }, i) => <Reveal key={title} delay={i * .06}><article className="contribution-card"><Icon size={28} strokeWidth={1.5} /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div>
          <Reveal className="presentation-panel"><div className="presentation-heading"><Presentation size={34} /><div><p className="section-kicker">EDUCATIONAL PRESENTATIONS</p><h3>Orientation &amp; International Information Sessions</h3></div></div><div className="presentation-grid">{presentations.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}</div></Reveal>
          <Reveal className="archive-section"><div className="archive-heading"><div><p className="section-kicker">PUBLIC CONTENT REFERENCES</p><h3>Gateway Bridge Facebook Archive</h3><p>Links to company posts, videos, and layouts associated with this work (availability depends on Facebook privacy settings). These are references, not a claim that I independently created every linked item.</p></div><a href={gatewayPage} target="_blank" rel="noopener noreferrer" className="section-link">COMPANY FACEBOOK PAGE <ExternalLink size={17} /></a></div><div className="archive-grid">{archive.slice(0, 8).map((item, i) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="archive-card"><span className="archive-index">{String(i + 1).padStart(2, '0')} / CONTENT REFERENCE</span><Video size={29} strokeWidth={1.5} /><strong>{item.title}</strong><span className="archive-open">VIEW ON FACEBOOK <ExternalLink size={15} /></span></a>)}</div>
            <div className="visa-highlights-heading"><p className="section-kicker">GATEWAY BRIDGE / CLIENT SUCCESS STORIES</p><h3>VISA APPROVAL <em>HIGHLIGHTS.</em></h3><p>Visa approval announcements I published while managing Gateway Bridge’s Facebook content. My contribution was social media management and publishing; the original visual layouts for these posts were created by other team members.</p></div>
            <div className="archive-grid">{archive.slice(8).map((item, i) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="archive-card"><span className="archive-index">{String(i + 9).padStart(2, '0')} / CLIENT SUCCESS</span><GraduationCap size={29} strokeWidth={1.5} /><strong>{item.title}</strong><span className="archive-open">VIEW ON FACEBOOK <ExternalLink size={15} /></span></a>)}</div><p className="ip-note">Company-owned materials remain the intellectual property of Gateway Bridge Educational Consultancy and their respective owners. Original videos and presentation slides are not rehosted here. Links open the original public posts on Facebook.</p></Reveal>
        </div>
      </section>

      <section className="testimonials-section content-section" id="testimonials"><div className="section-container">
        <Reveal className="section-heading"><p className="section-kicker">05 / CLIENT APPRECIATION</p><h2>WORDS THAT <em>MATTER.</em></h2><p>Client feedback shared about Gateway Bridge Educational Consultancy, including recognition of Veronika and her colleagues. These are testimonials for the company, not personal endorsements of Veronika alone.</p></Reveal>
        <div className="gateway-media-grid testimonials-grid">{testimonials.map((item, i) => <Reveal key={item.src} delay={i * .08}><button type="button" className="gateway-media-card testimonial-media" onClick={() => setActiveImage(item)} aria-label={`Enlarge testimonial ${i + 1}`}><img src={item.src} alt={item.alt} loading="lazy" /><span><Quote size={17} /> CLIENT TESTIMONIAL {String(i + 1).padStart(2, '0')} <ImageIcon size={16} /></span></button></Reveal>)}</div>
        <p className="ip-note">Testimonials are screenshots of feedback originally shared about Gateway Bridge. Obtain permission to republish identifiable names, profile photos, and comments before making this section public.</p>
      </div></section>
      <section className="gallery-section content-section" id="gallery"><div className="section-container">
        <Reveal className="section-heading"><p className="section-kicker">06 / BEHIND THE WORK</p><h2>MOMENTS &amp; <em>MEMORIES.</em></h2><p>A glimpse into the people and experiences from my time with Gateway Bridge Educational Consultancy.</p></Reveal>
        <div className="gateway-media-grid photo-grid">{gatewayPhotos.map((item, i) => <Reveal key={item.src} delay={i * .08}><button type="button" className="gateway-media-card photo-media" onClick={() => setActiveImage(item)} aria-label={`Enlarge Gateway Bridge photo ${i + 1}`}><img src={item.src} alt={item.alt} loading="lazy" /><span>GATEWAY BRIDGE / {String(i + 1).padStart(2, '0')} <ImageIcon size={16} /></span></button></Reveal>)}</div>
        <p className="ip-note">Professional photographs are shared for career context. Confirm permission from the company and identifiable individuals before publication.</p>
      </div></section>
      <section className="contact content-section" id="contact"><Reveal className="section-container contact-inner"><p className="section-kicker">07 / CONTACT</p><h2>LET'S START A<br /><em>CONVERSATION.</em></h2><p>For professional opportunities, collaborations, or a conversation about how I can help, feel free to reach out.</p><div className="contact-actions"><a className="button-primary" href="mailto:deleonveronika@gmail.com?subject=Hello%20Veronika">EMAIL ME <Mail size={18} /></a><a className="button-outline" href="https://www.linkedin.com/in/veronika-de-leon" target="_blank" rel="noopener noreferrer">LINKEDIN <ExternalLink size={17} /></a><button type="button" className="button-outline" onClick={() => setResumeOpen(true)}>VIEW RESUME <FileText size={17} /></button></div></Reveal></section>
    </main><footer className="footer"><a className="brand" href="#home">VERONIKA<span>.</span></a><span>© {new Date().getFullYear()} Veronika Jose De Leon</span><a href="#home">BACK TO TOP ↑</a></footer>{resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    {activeImage && <GalleryModal item={activeImage} onClose={() => setActiveImage(null)} />}<AnimatePresence>{selectedExperience !== null && <ExperienceModal key={selectedExperience} item={experience[selectedExperience]} index={selectedExperience} onClose={() => setSelectedExperience(null)} />}</AnimatePresence></div>;
}
