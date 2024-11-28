export class UndoRedoManager {
    private history: any[] = [];
    private future: any[] = [];
  
    public addState(state: any) {
      this.history.push(state);
      this.future = [];
    }
  
    public undo(): any | null {
      const previousState = this.history.pop();
      if (previousState) {
        this.future.push(previousState);
        return this.history[this.history.length - 1] || null;
      }
      return null;
    }
  
    public redo(): any | null {
      const futureState = this.future.pop();
      if (futureState) {
        this.history.push(futureState);
        return futureState;
      }
      return null;
    }
  }
  