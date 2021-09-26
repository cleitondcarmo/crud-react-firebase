import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produto: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('produtos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          produto: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('produtos').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <body class="main"> 
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
            <h4><Link to="/">Lista de produtos</Link></h4>
              <h3 class="panel-title">
                {this.state.produto.nome}
              </h3>
            </div>
            <div class="panel-body">
              <dl>
                <dt>Preco:</dt>
                <dd>{this.state.produto.preco}</dd>
              </dl>
              <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Excluir</button>
            </div>
          </div>
        </div>
      </body>

    );
  }
}

export default Show;
