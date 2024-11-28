import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column } from '../types/types';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: Column;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div
      style={{
        backgroundColor: '#f4f5f7',
        padding: '16px',
        borderRadius: '4px',
        width: '300px',
        margin: '0 8px',
      }}
    >
      <h2 style={{ marginBottom: '16px' }}>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '100px' }}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnComponent;
