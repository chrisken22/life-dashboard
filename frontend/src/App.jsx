import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <header className="border-b border-dark-border px-8 py-4">
        <h1 className="text-2xl font-bold">Compass</h1>
        <p className="text-sm text-dark-muted">Your personal life dashboard</p>
      </header>

      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
