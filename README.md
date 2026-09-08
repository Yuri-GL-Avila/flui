# Flui

Aplicativo mobile desenvolvido anteriormente no Figma na etapa 1 do Challenge, com foco em facilitar a localização de pontos de recarga para veículos elétricos e melhorar a experiência dos motoristas de veículos elétricos no geral..

## Sobre o projeto

O Flui permite visualizar estações de recarga em um mapa interativo, pesquisar pontos próximos, aplicar filtros e consultar informações detalhadas sobre cada estação.

Os dados utilizados nesta etapa são simulados e representam pontos de recarga localizados em Porto Alegre.

## Funcionalidades

- Mapa interativo com Google Maps
- Marcadores personalizados de pontos de recarga
- Busca por nome e endereço
- Filtro por tipo de conector
- Filtro por potência
- Filtro por comodidades
- Filtro por funcionamento 24 horas
- Visualização detalhada dos pontos
- Informações de disponibilidade
- Horário de funcionamento
- Períodos de menor movimento
- Comodidades próximas
- Feedback visual de filtros
- Motion design e animações
- Recursos de acessibilidade

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- React Native Maps
- Ionicons

## Estrutura principal do projeto

```text
app/
├── (tabs)/
│   └── index.tsx
├── station/
│   └── [id].tsx
└── _layout.tsx

data/
└── stations.ts
```

## Identidade visual

A interface utiliza uma identidade baseada em tons escuros combinados com verde e azul-claro, buscando transmitir tecnologia, mobilidade elétrica e sustentabilidade.



### Acessibilidade

**O projeto utiliza:**

- Rótulos de acessibilidade em botões e campos
- Indicação de estados através de texto, ícones e cores
- Contraste entre elementos e fundos
- Botões com áreas de toque adequadas
- Identificação dos filtros selecionados
- Estados visuais que não dependem apenas de cores

---

### Como executar o projeto:

- No terminal clone o repositório

```
git clone https://github.com/Yuri-GL-Avila/flui.git
```

- Entre na pasta

```
cd flui
```

- Instale as dependências
```
npm install
```

- Execute o projeto
```
npx expo start
```

- Abra o aplicativo usando o Expo Go **(provável que precise da versão Sdk54)**
- Escaneie o código QR

## Autores

Equipe de desenvolvimento:
- (**Ana Beatriz Ferreira de Souza**) - RM (**566313**)
- (**Yuri Guerreiro Lopes de Avila**) - RM (**563361**)