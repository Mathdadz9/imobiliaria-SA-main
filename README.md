# 🏠 Imobiliária Prime - Plataforma Digital

## 📋 Sobre o Projeto
A Imobiliária Prime é uma plataforma web desenvolvida em Angular que conecta corretores a potenciais clientes, oferecendo um sistema completo de gestão imobiliária com autenticação segmentada por perfis.

## 🚀 Tecnologias Utilizadas
- **Frontend:** Angular 16+, TypeScript, SCSS, RxJS  
- **Backend:** JSON Server (API REST simulada)  
- **Autenticação:** Guardas de Rota Angular  
- **UI/UX:** Componentes Angular Material, Design Responsivo  

## 👥 Perfis de Usuário
### 🎯 Público Geral
- Visualizar imóveis em destaque  
- Buscar imóveis por filtros  
- Criar conta como cliente  

### 👤 Cliente
- Buscar e visualizar imóveis  
- Marcar imóveis como interesse  
- Gerenciar lista de interesses  
- Editar perfil pessoal  

### 🏢 Corretor
- Dashboard administrativo  
- CRUD completo de imóveis  
- Visualizar clientes interessados  
- Gerenciar anúncios próprios  

## 🔐 Diagramas de Fluxo

# 🚀 Tecnologias Utilizadas
- **Frontend:** Angular 16+, TypeScript, SCSS, RxJS  
- **Backend:** JSON Server (API REST simulada)  
- **Autenticação:** Guardas de Rota Angular  
- **UI/UX:** Componentes Angular Material, Design Responsivo  

## 👥 Perfis de Usuário
### 🎯 Público Geral
- Visualizar imóveis em destaque  
- Buscar imóveis por filtros  
- Criar conta como cliente  

### 👤 Cliente
- Buscar e visualizar imóveis  
- Marcar imóveis como interesse  
- Gerenciar lista de interesses  
- Editar perfil pessoal  

### 🏢 Corretor
- Dashboard administrativo  
- CRUD completo de imóveis  
- Visualizar clientes interessados  
- Gerenciar anúncios próprios  

## 🔐 Diagramas e Fluxos

### Fluxo de Autenticação e Redirecionamento
```mermaid
flowchart TD
A[Usuário Acessa Sistema] --> B{Página Inicial}
B --> C[Login]
B --> D[Registro Cliente]

C --> E{Valida Credenciais}
E -->|Sucesso| F{Verifica Perfil}
E -->|Falha| G[Exibe Erro]

F -->|Cliente| H[Dashboard Cliente]
F -->|Corretor| I[Dashboard Corretor]

D --> J[Formulário Registro]
J --> K{Cria Usuário}
K -->|Sucesso| H
K -->|Falha| L[Exibe Erro]

H --> M[Home Cliente]
I --> N[Gestão Imóveis]
```

### Fluxo do Cliente - Busca e Interesse
```mermaid
flowchart LR
A[Cliente Logado] --> B[Busca Imóveis]
B --> C{Aplica Filtros?}
C -->|Sim| D[Filtra Resultados]
C -->|Não| E[Lista Completa]

D --> F[Visualiza Lista]
E --> F

F --> G{Seleciona Imóvel?}
G -->|Sim| H[Detalhes Imóvel]
G -->|Não| B

H --> I{Interessado?}
I -->|Sim| J[Adiciona Interesse]
I -->|Não| K[Volta para Busca]

J --> L[Interesse Registrado]
L --> M[Meus Interesses]
M --> N[Gerencia Lista]
```
### Fluxo do Corretor - Gestão de Imóveis
```mermaid
flowchart TB
A[Corretor Logado] --> B[Dashboard]

B --> C{Operação}
C --> D[Criar Imóvel]
C --> E[Editar Imóvel]
C --> F[Excluir Imóvel]
C --> G[Ver Interessados]

D --> H[Formulário Criação]
H --> I{Valida Dados}
I -->|Válido| J[Salva Imóvel]
I -->|Inválido| K[Corrige Dados]

E --> L[Lista Imóveis]
L --> M[Seleciona Imóvel]
M --> N[Formulário Edição]
N --> O[Atualiza Imóvel]

F --> P[Confirma Exclusão]
P --> Q[Remove Imóvel]

G --> R[Lista Interessados]
R --> S[Detalhes Contato]
```

### 📊Diagrama de Casos de Uso
```mermaid
graph TB
A[Sistema Imobiliária Prime] --> B[Usuário Não Autenticado]
A --> C[Cliente]
A --> D[Corretor]

B --> B1[Visualizar Imóveis]
B --> B2[Buscar Imóveis]
B --> B3[Registrar como Cliente]
B --> B4[Fazer Login]

C --> C1[Gerenciar Perfil]
C --> C2[Buscar Imóveis]
C --> C3[Visualizar Detalhes]
C --> C4[Registrar Interesse]
C --> C5[Gerenciar Interesses]

D --> D1[Gerenciar Perfil]
D --> D2[Criar Imóvel]
D --> D3[Editar Imóvel]
D --> D4[Excluir Imóvel]
D --> D5[Listar Imóveis]
D --> D6[Visualizar Interessados]

style A fill:#009B77
style B fill:#e1f5fe
style C fill:#f3e5f5
style D fill:#fff3e0
```
### Diagrama de Classes
```mermaid
classDiagram
class Usuario {
    +number id
    +string nome
    +string email
    +string senha
    +string tipo
    +Date dataCriacao
    +login()
    +logout()
}

class Cliente {
    +string telefone
    +string cpf
    +Interesse[] interesses
    +adicionarInteresse()
    +removerInteresse()
    +listarInteresses()
}

class Corretor {
    +string creci
    +string telefone
    +Imovel[] imoveis
    +criarImovel()
    +editarImovel()
    +excluirImovel()
    +listarInteressados()
}

class Imovel {
    +number id
    +number corretorId
    +string titulo
    +string tipo
    +string descricao
    +number preco
    +string cidade
    +string endereco
    +string[] imagens
    +boolean disponivel
    +Date dataCriacao
}

class Interesse {
    +number id
    +number clienteId
    +number imovelId
    +Date dataInteresse
    +string status
}

Usuario <|-- Cliente
Usuario <|-- Corretor
Cliente "1" -- "*" Interesse
Corretor "1" -- "*" Imovel
Imovel "1" -- "*" Interesse
```
