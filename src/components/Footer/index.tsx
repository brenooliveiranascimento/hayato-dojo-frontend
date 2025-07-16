import React from "react";
import { Linkedin, Instagram, Phone, Code, Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/breno-nascimento-oliveira/",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/allblack_arts/",
      color: "hover:text-pink-600",
    },
    {
      name: "WhatsApp",
      icon: <Phone className="h-5 w-5" />,
      url: "https://api.whatsapp.com/send?phone=5577988871958&text=Olá!%20Vi%20seu%20trabalho%20e%20gostaria%20de%20conversar",
      color: "hover:text-green-600",
    },
  ];

  return (
    <footer className={`bg-transparent text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Seção Principal */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Lado Esquerdo - Marca e Texto */}
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300 flex items-center justify-center md:justify-start space-x-1">
                <span>Desenvolvido com</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>por</span>
                <span className="font-semibold ">Breno Nascimento</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Desenvolvedor Full Stack • {currentYear}
              </p>
            </div>
          </div>

          {/* Lado Direito - Redes Sociais */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              Conecte-se:
            </span>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:scale-110 ${social.color}`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            {/* Copyright */}
            <div className="text-xs text-gray-400 text-center sm:text-left">
              © {currentYear} Sistema de Gerenciamento de Atletas. Todos os
              direitos reservados.
            </div>

            {/* Links Adicionais */}
            <div className="flex space-x-4 text-xs text-gray-400">
              <a
                href="https://api.whatsapp.com/send?phone=5577988871958&text=Gostaria%20de%20contratar%20seus%20serviços%20de%20desenvolvimento"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contratar Serviços
              </a>
              <span>•</span>
              <a
                href="https://api.whatsapp.com/send?phone=5577988871958&text=Preciso%20de%20suporte%20técnico"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
