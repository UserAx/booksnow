import React from 'react';
import { connect } from 'react-redux';
import {startLogInUser} from '../../actions/userauth';

export class LogIn extends React.Component {
    
    state = {
        error: undefined
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const $form = document.querySelector('form');
        const email= $form.querySelectorAll('input')[0].value;
        const password= $form.querySelectorAll('input')[1].value; 
        try{
            await this.props.startLogInUser(email, password);
        }catch(e){
            console.log(e);
        }

        if(!this.props.Authenticated){
            this.setState(() => ({error: 'Unable to log in. Please check your credentials properly.'}));
        } else if(this.props.Authenticated){
            this.props.history.push("/user");
            this.setState(() => ({error: undefined}));
        }
    }
    
    render() {
        return (
            <div className="signup login">
                {this.state.error && <h3 className="signup__error">{this.state.error}</h3>}
                <form className="signup__container" onSubmit={this.onSubmit}>
                <input className="signup__form__input"
                type="text" placeholder="Email"/>
                <input className="signup__form__input" type="password"
                placeholder="Password"/>
                <button className="signup__form__button login__button">Log In</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Authenticated: !!state.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogInUser: (email, password) => dispatch(startLogInUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);