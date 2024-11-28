import { DragDropContext } from 'react-beautiful-dnd';
import ColumnComponent from './Column';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KanbanBoardTypes } from '../types/types';

const initialBoard: KanbanBoardTypes = {
  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Item 1' },
        { id: 'task-2', content: 'Item 2' },
      ],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [{ id: 'task-3', content: 'Item 3' }],
    },
    {
      id: 'column-3',
      title: 'Done',
      tasks: [],
    },
  ],
};

const KanbanBoard: React.FC = () => {
  const [board, setBoard] = useLocalStorage<KanbanBoardTypes>('kanban-board', initialBoard);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    
    if (!destination) return;

    const sourceColumn = board.columns.find((col) => col.id === source.droppableId);
    const destColumn = board.columns.find((col) => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    
    const [movedTask] = sourceTasks.splice(source.index, 1);

    
    destTasks.splice(destination.index, 0, movedTask);

    
    setBoard({
      columns: board.columns.map((col) => {
        if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
        if (col.id === destColumn.id) return { ...col, tasks: destTasks };
        return col;
      }),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', padding: '16px', gap: '16px' }}>
        {board.columns.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
