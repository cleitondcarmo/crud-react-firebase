import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('produtos');
    this.state = {
      nome: '',
      preco: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  
onSubmit = (e) => {
    e.preventDefault();

    const { nome, preco } = this.state;

    this.ref.add({
      nome,
      preco
    }).then((docRef) => {
      this.setState({
        nome: '',
        preco: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Erro: ", error);
    });
  } 

  render() {
    const { nome, preco } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Adicionar produto
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Lista</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" name="nome" value={nome} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="preco">Preco:</label>
                <input type="text" class="form-control" name="preco" value={preco} onChange={this.onChange} placeholder="preco" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
