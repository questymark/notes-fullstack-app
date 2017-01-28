import React, {Component} from 'react';
import autoBind from 'react-autobind';
import './NoteEditor.less';
import ColorPicker from './ColorPicker.jsx';

class NotesEditor extends Component {
    constructor(props, context) {
        super(props, context);
        autoBind(this);

        this.state = {
            title: '',
            text: '',
            color: '#ffffff'
        }  
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleColorChange(color) {
        this.setState({ color });
    }

    handleNoteAdd() {
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            color: this.state.color
        };

        this.props.onNoteAdd(newNote);
        this.setState({
            title: '',
            text: '',
            color: '#ffffff'
        })
    }

    render() {
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <textarea
                    placeholder='Enter note text'
                    rows={5}
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className='NoteEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='NoteEditor__button'
                        disabled={!this.state.text}
                        onClick={this.handleNoteAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
};

export default NotesEditor;