import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

type Sender = 'bot' | 'user';

interface Message {
  id: string;
  sender: Sender;
  text: string;
  isTyping?: boolean;
}

interface ChatData {
  nome: string;
  motivo: string;
  detalhe1: string;
  detalhe2: string;
  contatoPreferido: string;
  telefone: string;
}

const WHATSAPP_NUMBER = "558187928331";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatData, setChatData] = useState<ChatData>({
    nome: '',
    motivo: '',
    detalhe1: '',
    detalhe2: '',
    contatoPreferido: '',
    telefone: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll para o final das mensagens
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping, isOpen]);

  // Iniciar conversa apenas quando o chat é aberto pela primeira vez e não há mensagens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      simulateBotResponse(
        "Oi! 👋 Sou a assistente virtual da Perrier Dental Clinic. Posso te fazer algumas perguntas rápidas pra entender como podemos te ajudar?"
      );
    }
  }, [isOpen, messages.length]);

  const simulateBotResponse = (text: string, delay = 1000) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text }]);
      setIsBotTyping(false);
    }, delay);
  };

  const handleUserResponse = (text: string) => {
    if (!text.trim()) return;
    
    // Adiciona a mensagem do usuário
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setInputText('');

    // Lógica do fluxo de conversa
    if (step === 0) {
      if (text === 'Prefiro falar direto com a clínica') {
        setStep(99); // Vai direto para o fim
        simulateBotResponse("Sem problemas! Clique no botão abaixo para nos chamar no WhatsApp.");
      } else {
        setStep(1);
        simulateBotResponse("Ótimo! Para começar, qual é o seu nome?");
      }
    } else if (step === 1) {
      setChatData(prev => ({ ...prev, nome: text }));
      setStep(2);
      simulateBotResponse(`Muito prazer, ${text}! O que te trouxe até a clínica hoje?`);
    } else if (step === 2) {
      setChatData(prev => ({ ...prev, motivo: text }));
      setStep(3);
      if (text === 'Estética do sorriso') simulateBotResponse("Você está pensando em algo específico?");
      else if (text === 'Dor de dente / urgência') simulateBotResponse("Há quanto tempo você está sentindo essa dor?");
      else if (text === 'Implante') simulateBotResponse("Quantos dentes você precisa repor?");
      else if (text === 'Prótese') simulateBotResponse("Que tipo de prótese você está buscando?");
      else if (text === 'Avaliação de rotina') simulateBotResponse("Quando foi sua última consulta odontológica?");
      else simulateBotResponse("Sem problema! Me conta rapidinho o que você está precisando:");
    } else if (step === 3) {
      setChatData(prev => ({ ...prev, detalhe1: text }));
      setStep(4);
      if (chatData.motivo === 'Estética do sorriso') simulateBotResponse("Você já fez alguma avaliação estética antes, em outro lugar?");
      else if (chatData.motivo === 'Dor de dente / urgência') simulateBotResponse("A dor é constante ou só aparece em algum momento (ao mastigar, com frio/quente etc.)?");
      else if (chatData.motivo === 'Implante') simulateBotResponse("O dente já foi extraído ou ainda está no lugar?");
      else if (chatData.motivo === 'Prótese') simulateBotResponse("Você já usa alguma prótese hoje?");
      else if (chatData.motivo === 'Avaliação de rotina') simulateBotResponse("Tem algum incômodo específico que você quer que a gente dê uma olhada, ou é só um check-up?");
      else simulateBotResponse("Isso é algo mais urgente ou você quer planejar com calma?");
    } else if (step === 4) {
      setChatData(prev => ({ ...prev, detalhe2: text }));
      setStep(5);
      simulateBotResponse("Certo. Qual a melhor forma da nossa equipe entrar em contato com você?");
    } else if (step === 5) {
      setChatData(prev => ({ ...prev, contatoPreferido: text }));
      setStep(6);
      simulateBotResponse(`Perfeito! Me passa o seu ${text}?`);
    } else if (step === 6) {
      setChatData(prev => ({ ...prev, telefone: text }));
      setStep(7);
      simulateBotResponse(`Show, ${chatData.nome || text}! Já tenho tudo que preciso. Pode clicar no botão abaixo para agendar sua consulta pelo WhatsApp com todas as suas respostas salvas!`);
    }
  };

  const resetChat = () => {
    setIsOpen(false);
    // Aguarda a animação de fechamento para limpar o estado
    setTimeout(() => {
      setMessages([]);
      setStep(0);
      setInputText('');
      setChatData({
        nome: '',
        motivo: '',
        detalhe1: '',
        detalhe2: '',
        contatoPreferido: '',
        telefone: ''
      });
    }, 300);
  };

  const handleSendWhatsApp = () => {
    let prefix1 = '';
    let prefix2 = '';

    switch (chatData.motivo) {
      case 'Estética do sorriso':
        prefix1 = '*O que busca:* ';
        prefix2 = '*Avaliação anterior:* ';
        break;
      case 'Dor de dente / urgência':
        prefix1 = '*Tempo de dor:* ';
        prefix2 = '*Tipo de dor:* ';
        break;
      case 'Implante':
        prefix1 = '*Qtd. de dentes:* ';
        prefix2 = '*Situação do dente:* ';
        break;
      case 'Prótese':
        prefix1 = '*Tipo de prótese:* ';
        prefix2 = '*Uso atual:* ';
        break;
      case 'Avaliação de rotina':
        prefix1 = '*Última consulta:* ';
        prefix2 = '*Incômodo:* ';
        break;
      case 'Outro':
        prefix1 = '*Detalhes:* ';
        prefix2 = '*Urgência:* ';
        break;
    }

    let text = `Olá! Meu nome é *${chatData.nome}* e gostaria de agendar uma consulta.\n\n`;
    if (chatData.motivo) {
      text += `*Motivo:* ${chatData.motivo}\n`;
      if (chatData.detalhe1) text += `  - ${prefix1}${chatData.detalhe1}\n`;
      if (chatData.detalhe2) text += `  - ${prefix2}${chatData.detalhe2}\n`;
    }
    if (chatData.contatoPreferido) text += `*Prefiro contato por:* ${chatData.contatoPreferido}\n`;
    if (chatData.telefone) text += `*Meu contato:* ${chatData.telefone}\n`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
    resetChat();
  };

  const renderInputArea = () => {
    if (isBotTyping) return null;

    if (step === 0) {
      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          <button onClick={() => handleUserResponse('Vamos lá')} className="w-full bg-primary-500 hover:bg-primary-600 text-white shadow-md py-3 px-4 rounded-xl text-sm font-bold transition-all">
            Vamos lá
          </button>
        </div>
      );
    }

    if (step === 2) {
      const options = ['Estética do sorriso', 'Dor de dente / urgência', 'Implante', 'Prótese', 'Avaliação de rotina', 'Outro'];
      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          {options.map(opt => (
            <button key={opt} onClick={() => handleUserResponse(opt)} className="w-full text-left px-4 py-3 bg-white hover:bg-primary-50 border border-neutral-200 hover:border-primary-300 rounded-xl text-neutral-700 hover:text-primary-700 text-sm font-medium transition-all shadow-sm">
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (step === 3 && chatData.motivo !== 'Outro') {
      let options: string[] = [];
      if (chatData.motivo === 'Estética do sorriso') options = ['Lentes de contato dental', 'Clareamento dental', 'Alinhamento dos dentes', 'Ainda não sei, quero uma avaliação'];
      else if (chatData.motivo === 'Dor de dente / urgência') options = ['Começou hoje', 'Alguns dias', 'Mais de uma semana'];
      else if (chatData.motivo === 'Implante') options = ['Só 1 dente', 'Mais de 1 dente', 'Prefiro avaliar com o Dr. Rodrigo'];
      else if (chatData.motivo === 'Prótese') options = ['Prótese fixa', 'Prótese removível / dentadura', 'Não sei, preciso de orientação'];
      else if (chatData.motivo === 'Avaliação de rotina') options = ['Menos de 6 meses', 'Entre 6 meses e 1 ano', 'Mais de 1 ano / não lembro'];
      
      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          {options.map(opt => (
            <button key={opt} onClick={() => handleUserResponse(opt)} className="w-full text-left px-4 py-3 bg-white hover:bg-primary-50 border border-neutral-200 hover:border-primary-300 rounded-xl text-neutral-700 hover:text-primary-700 text-sm font-medium transition-all shadow-sm">
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (step === 4) {
      let options: string[] = [];
      if (chatData.motivo === 'Estética do sorriso') options = ['Já avaliei em outro lugar', 'Seria minha primeira avaliação'];
      else if (chatData.motivo === 'Dor de dente / urgência') options = ['Constante, o tempo todo', 'Vai e volta', 'Só ao mastigar ou tocar'];
      else if (chatData.motivo === 'Implante') options = ['Já extraí', 'Ainda está no lugar', 'Não sei dizer'];
      else if (chatData.motivo === 'Prótese') options = ['Sim, quero trocar a atual', 'Não, seria a primeira vez'];
      else if (chatData.motivo === 'Avaliação de rotina') options = ['Tem sim, um incômodo específico', 'Não, é só check-up de rotina'];
      else options = ['É urgente', 'Quero planejar com calma']; // Outro

      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          {options.map(opt => (
            <button key={opt} onClick={() => handleUserResponse(opt)} className="w-full text-left px-4 py-3 bg-white hover:bg-primary-50 border border-neutral-200 hover:border-primary-300 rounded-xl text-neutral-700 hover:text-primary-700 text-sm font-medium transition-all shadow-sm">
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (step === 5) {
      const options = ['WhatsApp', 'Ligação', 'E-mail'];
      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          {options.map(opt => (
            <button key={opt} onClick={() => handleUserResponse(opt)} className="w-full text-left px-4 py-3 bg-white hover:bg-primary-50 border border-neutral-200 hover:border-primary-300 rounded-xl text-neutral-700 hover:text-primary-700 text-sm font-medium transition-all shadow-sm">
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (step === 7 || step === 99) {
      return (
        <div className="flex flex-col gap-2 p-4 bg-white border-t border-neutral-100 shrink-0">
          <button onClick={handleSendWhatsApp} className="w-full bg-primary-500 hover:bg-primary-600 text-white shadow-md py-3 px-4 rounded-xl text-sm font-bold transition-all">
            Agendar Consulta (WhatsApp)
          </button>
          <button onClick={() => resetChat()} className="w-full text-neutral-500 hover:text-neutral-700 py-2 text-sm font-medium transition-colors text-center">
            Encerrar conversa
          </button>
        </div>
      );
    }

    // Default: text input (Steps 1, 3 for 'Outro', 6)
    return (
      <div className="p-4 bg-white border-t border-neutral-100 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleUserResponse(inputText); }}
          className="relative flex items-center"
        >
          <input
            type={step === 6 ? "tel" : "text"}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full bg-neutral-100 border-none rounded-full py-3 pl-4 pr-12 focus:ring-2 focus:ring-primary-300 text-sm outline-none"
            autoFocus
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 p-2 bg-primary-500 text-white rounded-full disabled:bg-neutral-300 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      {/* Background overlay para fechar clicando fora no mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-[9998] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Janela de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-neutral-50 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-neutral-200"
          >
            {/* Header */}
            <div className="bg-primary-500 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1">
                    <img src="/logo.png" alt="Perrier" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full z-10"></div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold leading-tight">Assistente Perrier</h3>
                  <p className="text-primary-100 text-xs">Online agora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Area de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary-500 text-white rounded-br-sm' 
                        : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center h-[42px]">
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Área de Input / Opções */}
            {renderInputArea()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(212,175,55,0.4)] z-[10000] transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative flex items-center justify-center w-full h-full">
              {/* Efeito pulse animado infinito */}
              <div className="absolute inset-0 bg-primary-500 rounded-full opacity-50 animate-ping" style={{ animationDuration: '3s' }}></div>
              
              {/* Círculo interno branco com a logo */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center relative z-10 shadow-sm border border-neutral-100 overflow-hidden">
                <img src="/logo.png" alt="Chat" className="w-10 h-10 object-contain ml-0.5 mt-0.5" />
              </div>

              {/* Notificação Badge "1" */}
              <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
                1
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
