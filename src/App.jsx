import { useState, useEffect } from 'react';
import './App.css';
import api from './api';

function TextBar({ text, onChange }) {
  return (
    <div className='Barra_pesquisa'>
      <input 
        className='Barra_pesquisa_texto'
        type="text"
        value={text}
        onChange={onChange} 
        placeholder="Pesquisar produto"
      />
    </div>
  );
}

function App() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState('nome');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/produto', {
          params: {
            filter: searchText,
            orderBy,
            direction,
          },
        });
        setItens(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if(searchText == ""){
      setItens([]);
      setLoading(false);      
    }else{
    }fetchData();
  }, [searchText,orderBy, direction]);

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    const [newOrderBy, newDirection] = event.target.value.split('_');
    setOrderBy(newOrderBy);
    setDirection(newDirection);
  };

  const filteredItems = itens.filter(item => 
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>

      <TextBar text={searchText} onChange={handleTextChange} />

      <div className="order-selector">
        <label>Ordenar por:</label>
        <select onChange={handleSortChange}>
          <option value="nome_asc">Nome (A-Z)</option>
          <option value="preco_asc">Menor valor</option>
          <option value="preco_desc">Maior valor</option>
        </select>
      </div>

      <div className="item-list">
        {loading ? (
          <div>Carregando...</div>
        ) : error ? (
          <div>Erro ao carregar produtos.</div>
        ) : filteredItems.length === 0 ? (
          <div>Não encontramos produtos com o termo "{searchText}"</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="item">
              <img src={item.imagem} alt={item.nome} className="image" />
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
              <p>R$ {item.preco}</p>
            </div>
          ))
        )}
      </div>

      <div>{filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}</div>
    </div>
  );
}

export default App;
