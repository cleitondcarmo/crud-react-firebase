import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
/* const express = require('express')
const app = express() */



/* module.exports = {
  add
} */

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nome: '',
      preco: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('produtos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const produto = doc.data();
        this.setState({
          key: doc.id,
          nome: produto.nome,
          preco: produto.preco
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({produto:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nome, preco } = this.state;

    const updateRef = firebase.firestore().collection('produtos').doc(this.state.key);
    updateRef.set({
      nome,
      preco
    }).then((docRef) => {
      this.setState({
        key: '',
        nome: '',
        preco: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar produto
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">produto</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" name="nome" value={this.state.nome} onChange={this.onChange} placeholder="nome" />
              </div>
              <div class="form-group">
                <label for="preco">Preço:</label>
                <input type="text" class="form-control" name="preco" value={this.state.preco} onChange={this.onChange} placeholder="preco" />
              </div>
              <button type="submit" class="btn btn-success">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
