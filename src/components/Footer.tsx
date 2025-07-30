import React from 'react';
import { BookOpen, Heart, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Ononamais Acadêmico</h3>
                <p className="text-sm text-gray-400">Democratizando o conhecimento</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A maior plataforma digital de acesso aberto para livros, monografias, teses, 
              dissertações e artigos científicos do país.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Teses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dissertações</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Monografias</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Artigos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Livros</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Como usar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Submeter obra</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Licenças</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Ononamais Acadêmico. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>para a comunidade acadêmica</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}