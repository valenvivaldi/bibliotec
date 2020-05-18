import React,{Component} from 'react';

class Book extends Component{
    
    
    data = this.props.data;
    render(){
        
        return(
            <div className='bookData'>
                <p><strong>Titulo:</strong>{this.data.title}</p>
            </div>
        )
    }
};

export default Book;