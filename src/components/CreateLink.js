import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $nombre: String!
    $precio: String!
    $descripcion: String!
    $url: String!
  ) {
    createLink(nombre: $nombre, precio: $precio, descripcion: $descripcion, url: $url) {
      id
      nombre
      precio
      descripcion
      url
    }
  }
`;

const CreateLink = () => {
  const Navigate = useNavigate();
  const [formState, setFormState] = useState({
    nombre:'',
    precio:'',
    descripcion: '',
    url: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
        nombre: formState.nombre,
        precio: formState.precio,
        descripcion: formState.descripcion,
        url: formState.url
    },
    onCompleted: () => Navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.nombre}
            onChange={(e) =>
              setFormState({
                ...formState,
                nombre: e.target.value
              })
            }
            type="text"
            placeholder="Nombre"
          />
          <input
            className="mb2"
            value={formState.precio}
            onChange={(e) =>
              setFormState({
                ...formState,
                precio: e.target.value
              })
            }
            type="text"
            placeholder="Precio"
          />
            <input
            className="mb2"
            value={formState.descripcion}
            onChange={(e) =>
              setFormState({
                ...formState,
                descripcion: e.target.value
              })
            }
            type="text"
            placeholder="Descripción"
          />
             <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="Url"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;