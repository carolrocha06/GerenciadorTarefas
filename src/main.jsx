 // arquivo para inicializar o aplicativo
 import { StrictMode } from 'react' // importa a ferramenta que ajuda a identificar problemas potenciais/erros no código durante o desenvolvimento
 import { createRoot } from 'react-dom/client'  // função responsavel por permitir que "coloque" o nosso aplicativo na página da web
 import './index.css' // importa o arquvivo que muda a aparencia  do aplicativo
 import App from './App.jsx' // importa o componente App
 
 createRoot(document.getElementById('root')).render( // o `createRoot` faz essa conexão entre o React e a nossa página
   <StrictMode>
     <App />
   </StrictMode>,
 )