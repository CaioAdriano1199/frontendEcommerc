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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/produto');
        setItens(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTextChange = (event) => {
    setSearchText(event.target.value); 
  };


  const filteredItems = itens.filter(item => 
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>

      <TextBar text={searchText} onChange={handleTextChange} />

      <div className="item-list">
        {filteredItems.length === 0 ? (
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
