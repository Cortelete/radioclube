import React, { useState } from 'react';
import { Info, MessageCircle, MapPin, Star, Instagram, Facebook, Music } from 'lucide-react';
import { ModalType, ContactFormData, MusicRequestFormData } from './types';
import { Logo } from './components/Logo';
import { Subtitle } from './components/Subtitle';
import { AudioPlayer } from './components/AudioPlayer';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { BrowserGuide } from './components/BrowserGuide';

// Minimalist Social Button
const SocialButton = ({ icon: Icon, onClick, label }: { icon: React.ElementType, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center gap-1 sm:gap-2 transition-transform active:scale-95"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-brand-cyan group-hover:border-brand-cyan group-hover:shadow-[0_0_20px_rgba(45,170,225,0.4)]">
      <Icon size={18} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
    </div>
    <span className="text-[10px] sm:text-xs font-display font-medium text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<ModalType>(ModalType.NONE);
  const [rating, setRating] = useState(0);
  
  // State for Contact Form
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    age: '',
    type: 'listener',
    observation: ''
  });

  // State for Music Request Form
  const [musicForm, setMusicForm] = useState<MusicRequestFormData>({
    name: '',
    music: '',
    artist: '',
    version: '',
    message: ''
  });

  const openModal = (type: ModalType) => setModalOpen(type);
  const closeModal = () => {
    setModalOpen(ModalType.NONE);
    if(modalOpen === ModalType.RATING && rating !== 5) setRating(0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5541998709704";
    const text = `Olá! Me chamo *${contactForm.name}* (${contactForm.age} anos).%0A` +
                 `Sou *${contactForm.type === 'listener' ? 'Ouvinte' : 'Anunciante'}*.%0A` +
                 `*Observação:* ${contactForm.observation}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    closeModal();
  };

  const handleMusicRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5541998709704";
    const text = `🎵 *PEDIDO MUSICAL* 🎵%0A%0A` +
                 `👤 *Nome:* ${musicForm.name}%0A` +
                 `🎼 *Música:* ${musicForm.music}%0A` +
                 `🎤 *Cantor/Banda:* ${musicForm.artist}%0A` +
                 `💿 *Versão:* ${musicForm.version || 'Original'}%0A` +
                 `✉️ *Recado:* ${musicForm.message || 'Sem recado'}`;
    
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    closeModal();
    // Optional: clear form
    setMusicForm({ name: '', music: '', artist: '', version: '', message: '' });
  };

  const handleDevContact = (clientName: string) => {
    const phone = "5541988710303";
    const text = `Olá! Vi o link da *${clientName}* e quero um site igual!`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleRating = (stars: number) => {
    setRating(stars);
    if (stars === 5) {
      window.open("https://search.google.com/local/writereview?placeid=ChIJnWPNYEEa6JQRFKsTFSXCJfw", "_blank");
      closeModal();
    } else {
      openModal(ModalType.RATING_FEEDBACK);
    }
  };

  // Minimalist Custom Icon
  const TikTokIcon = ({size, strokeWidth, className}: {size: number, strokeWidth?: number, className?: string}) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <div className="h-[100dvh] w-full relative flex flex-col items-center justify-center py-2 sm:py-6 px-3 sm:px-4 font-sans overflow-hidden">
      
      {/* Tip for Instagram Browser */}
      <BrowserGuide />

      {/* --- LUXURY ANIMATED BACKGROUND START --- */}
      
      {/* 1. Base Dark Blue Layer */}
      <div className="fixed inset-0 -z-40 bg-[#051826]"></div>

      {/* 2. Animated Blobs (Moving Gradients) */}
      <div className="fixed inset-0 -z-30 overflow-hidden opacity-60">
        {/* Top Left - Lighter Blue */}
        <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-[#1e4e70] rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
        
        {/* Top Right - Cyan Accent */}
        <div className="absolute top-[10%] -right-[10%] w-[70vw] h-[70vw] max-w-[450px] max-h-[450px] bg-[#2DAAE1] rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        
        {/* Bottom Left - Dark Navy */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] bg-[#0B2F48] rounded-full mix-blend-screen filter blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 3. Luxury Texture Overlay (Subtle Stardust/Noise) */}
      <div className="fixed inset-0 -z-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15"></div>

      {/* 4. Elegant Reflection/Sheen (Diagonal Sweep) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 sm:opacity-20 animate-pulse-slow pointer-events-none"></div>
      
      {/* --- BACKGROUND END --- */}


      {/* Main Card Wrapper - Uses 100% height minus padding, distributed via Flexbox */}
      <div className="w-full max-w-[400px] h-full z-10 relative flex flex-col">
        
        {/* The Glass Card - Removed inline border classes as glass-panel handles it now */}
        <div className="w-full flex-grow glass-panel rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 flex flex-col items-center relative overflow-hidden transition-all">
            
            {/* Subtle top reflection inside card */}
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[50%] bg-gradient-to-b from-white/10 to-transparent rotate-12 blur-xl pointer-events-none"></div>

            {/* Content Container: Flex Column with space distribution */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between animate-float">
                
                {/* Header Section: Logo + Title + Subtitle */}
                <div className="flex flex-col items-center shrink-0 w-full">
                    <Logo onClick={() => openModal(ModalType.ABOUT)} />
                    
                    <div className="relative w-full flex justify-center mt-2 sm:mt-4 mb-2">
                         <img 
                            src="/clubefm.png" 
                            alt="Rádio Clube FM" 
                            className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(45,170,225,0.3)]" 
                         />
                    </div>

                    <div className="w-full">
                      <Subtitle />
                    </div>
                </div>

                {/* Middle Section: Player + Buttons */}
                <div className="w-full flex flex-col gap-2 sm:gap-4 my-auto justify-center">
                    <AudioPlayer />
                    
                    <div className="flex flex-col gap-2 sm:gap-3 w-full">
                        <Button 
                            label="O que é a Rádio Clube" 
                            icon={Info} 
                            onClick={() => openModal(ModalType.ABOUT)} 
                        />

                        <Button 
                            label="Pedir Música" 
                            icon={Music} 
                            onClick={() => openModal(ModalType.MUSIC_REQUEST)} 
                        />
                        
                        <Button 
                            label="Contato WhatsApp" 
                            icon={MessageCircle} 
                            onClick={() => openModal(ModalType.CONTACT)} 
                        />
                        
                        <Button 
                            label="Localização" 
                            icon={MapPin} 
                            onClick={() => openModal(ModalType.LOCATION)} 
                        />
                        
                        <Button 
                            label="Avalie-nos" 
                            icon={Star} 
                            onClick={() => openModal(ModalType.RATING)} 
                        />
                    </div>
                </div>

                {/* Bottom Section: Socials + Footer */}
                <div className="flex flex-col items-center gap-2 sm:gap-6 shrink-0 mt-2 sm:mt-4">
                     {/* Divider */}
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <div className="w-full flex items-center justify-center gap-6 sm:gap-8">
                        <SocialButton 
                            label="Instagram"
                            icon={Instagram}
                            onClick={() => openModal(ModalType.SOCIALS)}
                        />
                        <SocialButton 
                            label="Facebook"
                            icon={Facebook}
                            onClick={() => openModal(ModalType.SOCIALS)}
                        />
                        <SocialButton 
                            label="TikTok"
                            icon={(props: any) => <TikTokIcon {...props} />}
                            onClick={() => openModal(ModalType.SOCIALS)}
                        />
                    </div>

                    <footer className="">
                        <button 
                            onClick={() => openModal(ModalType.CREDITS)}
                            className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-brand-cyan transition-colors"
                        >
                            Desenvolvido por InteligenciArte.IA
                        </button>
                    </footer>
                </div>

            </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      <Modal 
        isOpen={modalOpen === ModalType.ABOUT} 
        onClose={closeModal} 
        title="Nossa História"
      >
        <div className="space-y-4 font-light">
            <div className="rounded-xl overflow-hidden mb-4 shadow-lg border border-white/10 relative group">
                <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                <img src="/clube.png" alt="Rádio Antiga" className="w-full h-40 object-cover" />
            </div>
            <p className="text-xl font-display text-brand-cyan pl-4 border-l-2 border-brand-cyan/50 italic">
                "A voz ativa da comunidade, conectando gerações."
            </p>
            <p className="text-base leading-relaxed text-white/80">
                A <strong>Rádio Clube Pontagrossense</strong> é um dos maiores patrimônios da comunicação do Paraná. Fundada em 1940, é reconhecida como a emissora de rádio mais antiga em atividade no estado.
            </p>
            <p className="text-base leading-relaxed text-white/80">
                Hoje, na frequência <strong>94,1 FM</strong>, oferece uma programação completa que integra música, jornalismo, esportes e conteúdo local de relevância.
            </p>
        </div>
      </Modal>

      <Modal
        isOpen={modalOpen === ModalType.CONTACT}
        onClose={closeModal}
        title="Fale Conosco"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
            <p className="text-sm text-white/60 mb-4 font-display text-center">Inicie seu atendimento via WhatsApp</p>
            
            <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Seu Nome</label>
                <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="Ex: João Silva"
                    value={contactForm.name}
                    onChange={e => setContactForm({...contactForm, name: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Idade</label>
                    <input 
                        required
                        type="number" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                        placeholder="Ex: 30"
                        value={contactForm.age}
                        onChange={e => setContactForm({...contactForm, age: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                     <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Perfil</label>
                     <div className="relative">
                        <select 
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all appearance-none"
                            value={contactForm.type}
                            onChange={e => setContactForm({...contactForm, type: e.target.value as any})}
                        >
                            <option value="listener" className="bg-[#0B2F48]">Sou Ouvinte</option>
                            <option value="advertiser" className="bg-[#0B2F48]">Quero Anunciar</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                     </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Mensagem</label>
                <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all h-24 resize-none placeholder:text-white/20"
                    placeholder="Escreva aqui..."
                    value={contactForm.observation}
                    onChange={e => setContactForm({...contactForm, observation: e.target.value})}
                ></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-cyan hover:bg-[#2390C0] text-white font-display font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-cyan/20 transform active:scale-95 transition-all mt-2 text-base">
                Enviar para WhatsApp
            </button>
        </form>
      </Modal>

      <Modal
        isOpen={modalOpen === ModalType.MUSIC_REQUEST}
        onClose={closeModal}
        title="Pedir Música"
      >
        <form onSubmit={handleMusicRequestSubmit} className="space-y-4">
             <p className="text-sm text-white/60 mb-4 font-display text-center">Peça seu som favorito!</p>
             
             <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Seu Nome</label>
                <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="Quem manda o som?"
                    value={musicForm.name}
                    onChange={e => setMusicForm({...musicForm, name: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Música</label>
                    <input 
                        required
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                        placeholder="Nome da música"
                        value={musicForm.music}
                        onChange={e => setMusicForm({...musicForm, music: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Cantor/Banda</label>
                    <input 
                        required
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                        placeholder="Quem canta?"
                        value={musicForm.artist}
                        onChange={e => setMusicForm({...musicForm, artist: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Versão <span className="text-white/30 font-light normal-case tracking-normal">(Opcional)</span></label>
                <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="Ex: Ao vivo, Acústico..."
                    value={musicForm.version}
                    onChange={e => setMusicForm({...musicForm, version: e.target.value})}
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-cyan font-bold pl-1">Mensagem <span className="text-white/30 font-light normal-case tracking-normal">(Opcional)</span></label>
                <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all h-20 resize-none placeholder:text-white/20"
                    placeholder="Mande um recado para a galera..."
                    value={musicForm.message}
                    onChange={e => setMusicForm({...musicForm, message: e.target.value})}
                ></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-cyan hover:bg-[#2390C0] text-white font-display font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-cyan/20 transform active:scale-95 transition-all mt-2 text-base">
                Enviar Pedido
            </button>
        </form>
      </Modal>

      <Modal
        isOpen={modalOpen === ModalType.SOCIALS}
        onClose={closeModal}
        title="Redes Sociais"
      >
        <div className="grid gap-3">
            <a href="https://www.instagram.com/radioclubepg" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg text-white"><Instagram size={20} /></div>
                    <span className="font-display font-medium text-white text-base">Instagram</span>
                </div>
                <div className="text-white/40 group-hover:translate-x-1 transition-transform">→</div>
            </a>
            <a href="https://www.facebook.com/radioclubefm941" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-600 rounded-lg text-white"><Facebook size={20} /></div>
                    <span className="font-display font-medium text-white text-base">Facebook</span>
                </div>
                <div className="text-white/40 group-hover:translate-x-1 transition-transform">→</div>
            </a>
            <a href="https://www.tiktok.com/@clube941" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-black rounded-lg text-white border border-white/20"><TikTokIcon size={20} /></div>
                    <span className="font-display font-medium text-white text-base">TikTok</span>
                </div>
                <div className="text-white/40 group-hover:translate-x-1 transition-transform">→</div>
            </a>
        </div>
      </Modal>

      <Modal
         isOpen={modalOpen === ModalType.LOCATION}
         onClose={closeModal}
         title="Localização"
      >
        <div className="space-y-5 font-light">
            <p className="text-center text-white/70 text-base">Venha tomar um café conosco!</p>
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg relative bg-white/5">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.162130679708!2d-50.16386731373718!3d-25.096372520473036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81a4160cd639d%3A0xfc25c2251513ab14!2sR%C3%A1dio%20Clube%20Pontagrossense!5e0!3m2!1spt-BR!2sbr!4v1765803793350!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </div>
            <div className="text-center">
                <h3 className="font-display font-bold text-white text-xl">Rádio Clube FM</h3>
                <p className="text-base text-brand-cyan mt-1">XV de Novembro, 344<br/>Ponta Grossa - PR</p>
            </div>
            <a 
                href="https://goo.gl/maps/YOUR_MAP_LINK_HERE" 
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-display font-medium transition-colors border border-white/5 text-base"
            >
                Abrir no Google Maps
            </a>
        </div>
      </Modal>

      <Modal
        isOpen={modalOpen === ModalType.RATING}
        onClose={closeModal}
        title="Avalie a Rádio"
      >
         <div className="flex flex-col items-center gap-8 py-6">
            <p className="text-center text-white/80 font-light text-base">Sua opinião é fundamental para nós.</p>
            <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star}
                        onMouseEnter={() => setRating(star)}
                        onClick={() => handleRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none group"
                    >
                        <Star 
                            size={36} 
                            strokeWidth={1}
                            className={`${star <= rating ? "fill-brand-cyan text-brand-cyan drop-shadow-[0_0_10px_rgba(45,170,225,0.5)]" : "fill-transparent text-white/20"} transition-all`}
                        />
                    </button>
                ))}
            </div>
         </div>
      </Modal>

      <Modal
         isOpen={modalOpen === ModalType.RATING_FEEDBACK}
         onClose={closeModal}
         title="Feedback"
      >
          <form action="https://formsubmit.co/your-email@example.com" method="POST" className="space-y-4">
             <input type="hidden" name="_subject" value="Feedback Negativo - Rádio Clube" />
             <p className="text-base text-white/60 font-light">Como podemos melhorar para chegar às 5 estrelas?</p>
             <textarea 
                name="message"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white h-32 resize-none focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                placeholder="Digite aqui..."
             ></textarea>
             <button type="submit" className="w-full bg-brand-cyan hover:bg-[#2390C0] text-white font-display font-semibold py-3 rounded-xl shadow-lg shadow-brand-cyan/20 text-base">
                Enviar
             </button>
          </form>
      </Modal>

      <Modal
        isOpen={modalOpen === ModalType.CREDITS}
        onClose={closeModal}
        title="Desenvolvedor"
      >
        <div className="text-center space-y-6">
            <div className="p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5">
                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                    InteligenciArte.IA
                </h3>
                <p className="text-xs text-brand-cyan mt-1 uppercase tracking-widest opacity-80">Tecnologia & Design</p>
            </div>
            
            <p className="text-white/60 text-sm font-light px-4">
                Deseja um projeto exclusivo e de alta performance como este?
            </p>

            <button 
                onClick={() => handleDevContact("Rádio Clube")}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 transform active:scale-95 transition-all text-base"
            >
                <MessageCircle size={20} />
                Solicitar Orçamento
            </button>
            
            <a 
                href="https://instagram.com/inteligenciarte.ia" 
                target="_blank" 
                rel="noreferrer"
                className="block text-xs text-white/40 hover:text-white mt-4 hover:underline transition-colors"
            >
                @inteligenciarte.ia
            </a>
        </div>
      </Modal>

    </div>
  );
};

export default App;