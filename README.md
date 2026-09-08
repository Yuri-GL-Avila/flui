# Flui

Aplicativo mobile desenvolvido para a etapa 2 do Challenge, com foco em facilitar a localização de pontos de recarga para veículos elétricos.

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

## Estrutura principal

```text
app/
├── (tabs)/
│   └── index.tsx
├── station/
│   └── [id].tsx
└── _layout.tsx

data/
└── stations.ts