import React, {Component} from 'react';
import autoBind from 'react-autobind';
import Masonry from 'react-masonry-component';
import Note from './Note.jsx';
import './NotesGrid.less'

class NotesGrid extends Component{
    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }
    
    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.notes.map(note =>
                        <Note
                            key={note.id}
                            title={note.title}
                            onDelete={this.props.onNoteDelete.bind(null, note)}
                            color={note.color}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </Masonry>
        )
    }
};

export default NotesGrid;