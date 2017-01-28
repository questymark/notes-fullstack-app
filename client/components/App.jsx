import React, {Component} from 'react';
import autoBind from 'react-autobind';
import NotesEditor from'./NotesEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
import './App.less';
import NoteActions from '../actions/NotesActions'
import NotesStore from '../stores/NotesStore';

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    }
}

class App extends Component {
    constructor(props, context) {
        super(props, context);
        autoBind(this);
        
        this.state = getStateFromFlux();
        
    }

    componentWillMount() {
        NoteActions.loadNotes()
    }

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(
            getStateFromFlux()
        )
    }
    
    handleNoteAdd(data) {
      NoteActions.createNote(data);
    }

    handleNoteDelete(note) { 
        NoteActions.deleteNote(note.id);
    }

    render() {
        return (
            <div className="App">
                <h2 className="App__header">NotesApp</h2>
                <NotesEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        )
    }
};

export default App;