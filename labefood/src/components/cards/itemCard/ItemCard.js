import React, { useContext } from 'react'
import * as C from './Styled'
import { ContainerCategorias } from '../../../pages/Restaurantes/TelaDetalhe/Styled'
import GlobalContext from '../../../global/GlobalContext'
import Swal from 'sweetalert2'


export default function ItemCard(props) {
  const { states, setters } = useContext(GlobalContext)
  console.log(states)

  const adicionarProduto = (product) => {

    Swal.fire({
      text: 'Selecione a quantidade desejada',
      input: 'select',
      inputOptions: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10
      },
      inputPlaceholder: 'Quantidade',
      inputValidator: (value) => {
        const newProduct = {
          ...product,
          quantity: value
        }
        setters.setCarrinho([...states.carrinho, newProduct])

      }
    })
  }
  const removerProduto = (id) => {
    if (id == states.carrinho.id) {

    }
  }

  const chooseButtons = (product, id) => {
    if (states.carrinho.length === 0) {
      return (
        <>
          <C.RetanguloBotaoAdd>
            <C.BotaoAdicionar
              onClick={() => adicionarProduto(product)}
            >adicionar</C.BotaoAdicionar>
          </C.RetanguloBotaoAdd>
        </>
      )
    } else {
      return (
        <>
          <C.RetanguloIndice>
            <C.Indice></C.Indice>
          </C.RetanguloIndice>
          <C.RetanguloBotaoRem>
            <C.BotaoRemover
              onClick={() => removerProduto(id)}
            >remover</C.BotaoRemover>
          </C.RetanguloBotaoRem>
        </>
      )
    }
  }

  return (
    <>
      {props.categories && props.categories?.map((element, i) => {
        return (
          <ContainerCategorias key={i}>
            <p>{element}</p>
            <hr />
            {props.products && props.products?.map((product) => {
              if (product.category == element) {
                return (
                  <C.MainDiv key={product.id}>

                    <div>
                      <img src={product.photoUrl} alt='Ilustração do alimento' />
                    </div>

                    <C.TextoProduto>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <h4>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                    </C.TextoProduto>
                    
                    <C.ContainerButton>
                      {chooseButtons(product, product.id)}
                    </C.ContainerButton>

                  </C.MainDiv>
                )
              }
            })}
          </ContainerCategorias>
        )
      })}
    </>
  )
}
