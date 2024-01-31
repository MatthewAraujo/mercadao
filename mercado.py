from typing import List, Dict
from time import sleep

from models.product import Product
from utils.helper import formata_float_str_moeda

products: List[Product] = []
cart: List[Dict[Product, int]] = []

def main() -> None:
    menu()

def menu() -> None:
    print('=====================================')
    print('============= Bem-vindo =============')
    print('============= Geek Shop =============')
    print('=====================================')

    print('Selecione uma opção abaixo: ')
    print('1 - Cadastrar produto')
    print('2 - Listar produto')
    print('3 - Comprar produto')
    print('4 - Visualizar carrinho')
    print('5 - Fechar pedido')
    print('6 - Sair do sistema')

    option: int = int(input())

    if option == 1:
        register_product()
    elif option == 2:
        list_products()
    elif option == 3:
        buy_product()
    elif option == 4:
        view_cart()
    elif option == 5:
        close_order()
    elif option == 6:
        print('Volte sempre!')
        sleep(2)
        exit(0)
    else:
        print('Opção inválida!')
        sleep(1)
        menu()

def register_product() -> None:
    print('Cadastro de produto')
    print('===================')

    name: str = input('Informe o nome do produto: ')
    price: float = float(input('Informe o preço do produto: '))

    product: Product = Product(name, price)
    products.append(product)

    print(f'O produto {product.name} foi cadastrado com sucesso!')
    sleep(2)
    menu()

def list_products() -> None:
    if len(products) > 0:
        print('Listagem de produtos')
        print('====================')

        for product in products:
            print(product)
            print('------------------')
            sleep(1)
    else:
        print('Ainda não existem produtos cadastrados.')
    sleep(2)
    menu()

def buy_product() -> None:
    if len(products) > 0:
        print('Informe o código do produto desejado: ')
        print('=====================================')
        print('============= Produtos ==============')
        for product in products:
            print(product)
            print('------------------')
            sleep(1)
        code: int = int(input())

        product: Product = get_product_for_code(code)

        if product:
            if len(cart) > 0:
                item_cart: Dict[Product, int] = get_product_for_cart(product, cart)
                if item_cart:
                    item_cart[product] += 1
                    print(f'O produto {product.name} agora possui {item_cart[product]} unidades no carrinho.')
                else:
                    prod = {product: 1}
                    cart.append(prod)
                    print(f'O produto {product.name} foi adicionado ao carrinho.')
            else:
                item = {product: 1}
                cart.append(item)
                print(f'O produto {product.name} foi adicionado ao carrinho.')
            sleep(2)
            menu()
        else:
            print(f'O produto com código {code} não foi encontrado.')
            sleep(2)
            menu()
    else:
        print('Ainda não existem produtos para vender.')
    sleep(2)
    menu()

def view_cart() -> None:
    if len(cart) > 0:
        print('Produtos no carrinho: ')

        for item in cart:
            for data in item.items():
                print(data[0])
                print(f'Quantidade: {data[1]}')
                print('------------------')
                sleep(1)
    else:
        print('Ainda não existem produtos no carrinho.')
    sleep(2)
    menu()

def close_order() -> None:
    if len(cart) > 0:
        total: float = 0
        print('Produtos do carrinho: ')

        for item in cart:
            for data in item.items():
                print(data[0])
                print(f'Quantidade: {data[1]}')
                total += data[0].price * data[1]
                print('------------------')
                sleep(1)
        print(f'Sua fatura é {formata_float_str_moeda(total)}')
        print('Volte sempre!')
        cart.clear()
        sleep(5)
    else:
        print('Ainda não existem produtos no carrinho.')
    sleep(2)
    menu()

def get_product_for_code(code: int) -> Product:
    p: Product = None

    for product in products:
        if product.code == code:
            p = product
    return p

def get_product_for_cart(product: Product, cart: List[Dict[Product, int]]) -> Dict[Product, int]:
    p: Dict[Product, int] = None

    for item in cart:
        for data in item.items():
            if data[0].code == product.code:
                p = item
    return p

if __name__ == '__main__':
    main()