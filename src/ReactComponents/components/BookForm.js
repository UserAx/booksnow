import React from 'react';
import moment from 'moment';
// const fs = require('fs');
// const sharp = require('sharp');
import {SingleDatePicker} from 'react-dates';

export class BookForm extends React.Component {
    
    state = {
        title: this.props.title ? this.props.title : '',
        price: this.props.price ? this.props.price.toString() : '',
        author: this.props.author ? this.props.author : '',
        isbn: this.props.isbn ? this.props.isbn.toString() : '',
        ratings: this.props.ratings ? this.props.ratings.toString() : '',
        description: this.props.description ? this.props.description : '',
        published: this.props.published ? moment(this.props.published): moment(),
        calanderFocus: false,
        error: undefined
    }

    handleImageUpload = async (id) => {
        const imageBuffer = document.querySelector('form').querySelectorAll('input')[5].value;
        console.log(imageBuffer);
        if(imageBuffer){
            //const buffer = await sharp(imageBuffer).png().toBuffer();
            //fs.writeFile(`/images/${id}.jpg`,  buffer, 'binary', (error)=> {console.log(error);});
        }   
    }

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    onAuthorChange = (e) => {
        const author = e.target.value;
        this.setState(() => ({author}));
    }

    onPriceChange = (e) => {
        const price = e.target.value;
        if(!price || price.match(/^[0-9]+$/)){
            this.setState(() => ({price}));
        }
    }

    onRatingsChange = (e) => {
        const ratings = e.target.value;
        if(!ratings || ratings.match(/^[0-9]+$/)){
            this.setState(() => ({ratings}));
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }

    onISBNChange = (e) => {
        const isbn = e.target.value;
        if(!isbn || isbn.match(/^[0-9]+$/)){
            this.setState(() => ({isbn}));
        }
    }

    onDateChange = (published) => {
        if(published){
            this.setState(() => ({published}));
        }
        console.log(moment(published));
    }

    onFocusChange = (({focused}) => {//this thing isn't a function but an object.
        this.setState(() => ({calanderFocus: focused}));
    });

    onSubmit = async (e) => {
        e.preventDefault();
        if(!this.state.title || !this.state.price || !this.state.author || !this.state.published){
            this.setState(() => ({error: "Title, price and published date are compulsory details. Please fill them all."}));
        }else {
            this.setState(() => ({error: undefined}));
            const book = {
                title: this.state.title, 
                price: parseInt(this.state.price),
                ratings: parseInt(this.state.ratings),
                published: this.state.published.valueOf(),
                isbn: parseInt(this.state.isbn),
                author: this.state.author,
                description: this.state.description,
            };
            await this.props.onSubmitHandle(book);

            //this.handleImageUpload();
        }
    }

    render () {
        return (
            <div className = "BookForm-Container">
                <h2>Book Details:</h2>
                <form className = "BookForm-Container__form" onSubmit= {this.onSubmit}>
                    {this.state.error && <h3 className="signup__error">{this.state.error}</h3>}
                    <input className="BookForm-Container__input" value={this.state.title} 
                    placeholder="Title Here" autoFocus onChange={this.onTitleChange}/>
                    <input className="BookForm-Container__input" value={this.state.price} 
                    placeholder="Price Here" onChange={this.onPriceChange}/>
                    <input className="BookForm-Container__input" value={this.state.author} 
                    placeholder="Author Here" onChange={this.onAuthorChange}/>
                    <input className="BookForm-Container__input" value={this.state.isbn} 
                    placeholder="ISBN Here" onChange={this.onISBNChange}/>
                    <input className="BookForm-Container__input" value={this.state.ratings} 
                    placeholder="Ratings Here" onChange={this.onRatingsChange}/>
                    <textarea className="BookForm-Container__textarea" value={this.state.description} 
                    placeholder="Description Here" onChange={this.onDescriptionChange}></textarea>
                    <SingleDatePicker 
                    date= {this.state.published}
                    onDateChange = {this.onDateChange}
                    focused = {this.state.calanderFocus}
                    onFocusChange = {this.onFocusChange}
                    numberOfMonths = {1}
                    isOutsideRange = {() => false}
                    />
                    <input className="BookForm-Container__image" type="file" name="img" accept="image/jpg"></input>
                    <button className="BookForm-Container__button">Save</button>
                </form>
            </div>
        )
    }
}