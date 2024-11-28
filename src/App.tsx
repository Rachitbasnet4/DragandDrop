import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
};

export default App;
