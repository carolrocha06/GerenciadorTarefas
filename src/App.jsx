import ListaTarefas from './components/ListaTarefas'; // importa ListaTarefas, que vai mostrar as tarefas
import './App.css';  // importa o arquivo CSS para estilizar o aplicativo

function App() { // define a função App, responsavel por definir o que será exibido na tela
  return ( // é o que será retornado (será exibido na tela)
    <> 
      <h3>Estabelaça metas e tarefas para maior produtividade!</h3> {/* tem um título menor com uma mensagem, incentivando a organizacao e produtividade */}
      <h1> Gerenciador de Tarefas </h1> {/* é o título principal do app, dizendo ao usuário o que ele está usando */}
      <ListaTarefas/> {/* chama o componente que mostra todas as tarefas*/}
    </>
  );
}

export default App // exporta o App para que ele possa ser usado em outros arquivos, como o de inicialização do React