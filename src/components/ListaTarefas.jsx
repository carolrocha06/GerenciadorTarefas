import { useState, useEffect } from 'react'; // importa os hooks (react disponibiliza alguns hooks internos) do React pra lidar com estado e efeitos colaterais (estao entre chaves)
import './ListaTarefas.css'; // importa o CSS que vai deixar a lista bonitinha

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]); // cria um estado pra guardar a lista de tarefas
    const [novaTarefa, setNovaTarefa] = useState(''); // outro estado pra guardar o texto que o usuário digita

    // Quando o componente for carregado, busca as tarefas salvas no navegador (localStorage)
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')); // pega e converte as tarefas salvas
        if (tarefasSalvas) {
            setTarefas(tarefasSalvas); // atualiza o estado com o que foi salvo
        }
    }, []); // só roda uma vez quando a página carrega

    // Toda vez que a lista de tarefas mudar, ela é salva no localStorage
    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas)); // salva a lista como string
    }, [tarefas]); // só roda quando a lista for alterada

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') { // só adiciona se o campo não estiver vazio
            setTarefas([
                ...tarefas,
                { texto: novaTarefa, concluida: false, priorizada: false } // cria a tarefa nova com os campos padrão
            ]);
            setNovaTarefa(''); // limpa o campo de texto depois de adicionar
        }
    };

    const removerTarefa = (indice) => {
        // filtra a tarefa que não tem o índice clicado, ou seja, remove a selecionada
        setTarefas(tarefas.filter((_, i) => i !== indice));
    };

    const marcarConcluida = (indice) => {
        const novasTarefas = [...tarefas]; // copia a lista atual
        novasTarefas[indice].concluida = !novasTarefas[indice].concluida; // inverte o status de concluída
        setTarefas(novasTarefas); // atualiza o estado com a nova lista
    };

    const organizarTarefas = () => {
        const tarefasOrganizadas = [...tarefas].sort((a, b) =>
            a.texto.localeCompare(b.texto) // ordena alfabeticamente pelo texto
        );
        setTarefas(tarefasOrganizadas); // atualiza a lista ordenada
    };

    const mudarPrioridadeTarefa = (indice, valor) => {
        const novasTarefas = [...tarefas]; // copia a lista
        novasTarefas[indice].priorizada = valor === 'priorizar'; // define a prioridade com base na opção escolhida
        setTarefas(novasTarefas); // atualiza a lista com a mudança
    };

    return (
        <div> {/* esse é o container principal, onde tudo da lista vai aparecer na tela */}
    
            <h2>Lista de Tarefas</h2> {/* título principal da lista */}
    
            <input
                type='text' // tipo do campo: texto
                value={novaTarefa} // valor que o usuário digita
                onChange={(e) => setNovaTarefa(e.target.value)} // toda vez que digita, atualiza o estado novaTarefa
                placeholder='Digite uma nova tarefa' // mensagem que aparece dentro da caixinha como dica
            />
    
            <button onClick={adicionarTarefa}>Adicionar à Lista</button> {/* botão que adiciona a tarefa nova à lista */}
    
            <button 
                onClick={organizarTarefas} 
                style={{ backgroundColor: 'DeepSkyBlue' }} // cor azul só pra esse botão se destacar
            >
                Organizar em Ordem Alfabética {/* texto do botão */}
            </button>
    
            <ul> {/* começa a lista em si */}
                {tarefas.map((tarefa, indice) => ( // percorre todas as tarefas que estão no estado
                    <li 
                        key={indice} // cada item precisa de uma chave única
                        className={`${tarefa.concluida ? 'concluidas' : ''} ${tarefa.priorizada ? 'priorizada' : ''}`} // aplica estilos se estiver concluída ou priorizada
                    >
                        {tarefa.texto} {/* mostra o texto da tarefa na tela */}
    
                        <div> {/* bloco onde ficam os botões de ação */}
                            
                            <button 
                                onClick={() => marcarConcluida(indice)} // marca como concluída ou desmarca
                                style={{ backgroundColor: 'LightSeaGreen' }} // corzinha verde pro botão
                            >
                                {tarefa.concluida ? 'Desmarcar' : 'Concluir'} {/* texto muda conforme o estado da tarefa */}
                            </button>
    
                            <button 
                                onClick={() => removerTarefa(indice)} // botão que remove a tarefa da lista
                                style={{ backgroundColor: '#dc3545' }} // vermelho bem chamativo
                            >
                                Remover
                            </button>
    
                            {/* select para o usuário escolher se quer priorizar ou não aquela tarefa */}
                            <select
                                value={tarefa.priorizada ? 'priorizar' : 'despriorizar'} // valor depende do estado da tarefa
                                onChange={(e) => mudarPrioridadeTarefa(indice, e.target.value)} // muda o estado quando o usuário troca a opção
                                style={{
                                    backgroundColor: tarefa.priorizada ? '#FBCF3B' : 'white', // se tiver priorizada, o fundo fica amarelo
                                    marginLeft: '10px' // um espacinho entre os botões
                                }}
                            >
                                <option value="despriorizar">Despriorizar</option> {/* opção para tirar a prioridade */}
                                <option value="priorizar">Priorizar</option> {/* opção para deixar a tarefa como importante */}
                            </select>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;  // exporta o componente e tona possivel usar em outros arquivo
 