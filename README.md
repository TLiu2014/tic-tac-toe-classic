# Tic-Tac-Toe Classic

A modern, feature-rich Tic-Tac-Toe game built with React and Vite, featuring intelligent AI opponents and a beautiful user interface.

## 🎮 Features

### Game Modes
- **Single Player vs Computer**: Challenge an AI opponent
- **Two Players**: Play with a friend on the same device

### AI Difficulty Levels
- **Easy**: Random moves for beginners
- **Impossible**: Unbeatable AI using the Minimax algorithm with Alpha-Beta pruning

### Game Features
- Beautiful, responsive design with smooth animations
- Player turn indicators and game status updates
- Configurable first player (for single player mode)
- Game reset functionality
- Win/draw detection
- Responsive design for mobile and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe-classic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TicTacToe.jsx      # Main game component with game logic
│   ├── TicTacToe.css      # Main component styles
│   ├── GameBoard.jsx      # Game board component
│   └── GameBoard.css      # Game board styles
├── App.jsx                 # Main app component
├── App.css                 # App-level styles
└── main.jsx               # Application entry point
```

## 🧠 AI Implementation

The game features an intelligent AI opponent that uses the **Minimax algorithm** with **Alpha-Beta pruning** optimization:

- **Minimax**: Recursively evaluates all possible game states to find the optimal move
- **Alpha-Beta Pruning**: Significantly reduces the search space for faster decision making
- **Depth-based scoring**: Prefers faster wins and delayed losses

### AI Difficulty Levels

- **Easy**: Makes random moves from available positions
- **Impossible**: Always plays the optimal move, making it unbeatable

## 🎨 Design Features

- **Modern UI**: Clean, card-based design with subtle shadows and rounded corners
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Color Coding**: X's are blue, O's are red for clear visual distinction
- **Icon Integration**: Uses Lucide React icons for enhanced visual appeal

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with CSS Grid and Flexbox
- **Lucide React**: Beautiful, customizable icons
- **ESLint**: Code quality and consistency

## 🎯 How to Play

1. **Choose Game Mode**: Select between single player vs computer or two players
2. **Configure Settings** (Single Player):
   - Choose AI difficulty (Easy or Impossible)
   - Decide who goes first (You or Computer)
3. **Play**: Click on any empty cell to place your mark
4. **Win**: Get three of your marks in a row (horizontally, vertically, or diagonally)
5. **Reset**: Start a new game at any time

## 🔧 Customization

The game is built with modular components, making it easy to customize:

- **Styling**: Modify CSS files to change colors, fonts, and layout
- **Game Logic**: Extend the game with new features like score tracking
- **AI**: Adjust difficulty levels or implement new AI algorithms
- **Board Size**: Extend the grid beyond 3x3 (requires logic modifications)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React and Vite
- Icons from Lucide React
- Inspired by classic Tic-Tac-Toe games
