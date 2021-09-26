import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('produtos');
    this.unsubscribe = null;
    this.state = {
      produtos: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const produtos = [];
    querySnapshot.forEach((doc) => {
      const { nome, preco } = doc.data();
      produtos.push({
        key: doc.id,
        doc, 
        nome,
        preco,
      });
    });
    this.setState({
      produtos
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Lista de produtos
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Adicionar produto</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preco</th>
                </tr>
              </thead>
              <tbody>
                {this.state.produtos.map(produto =>
                  <tr>
                    <td><Link to={`/show/${produto.key}`}>{produto.nome}</Link></td>
                    <td>{produto.preco}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
