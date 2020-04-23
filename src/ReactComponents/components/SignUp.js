import React from 'react';
import {startLogin, login} from '../../actions/firebaseauth';
import { connect } from 'react-redux';
import formValidator from '../../utils/signupDataValidator';
import {addUser, startSignUpUser} from '../../actions/userauth';

class SignUp extends React.Component {
    state = {
        error: undefined
    }

    handleSignIn = async() => {
        await this.props.startLogin();
        this.props.login(this.props.Authenticated);
        //redirect from here to the purchases of that user.
        console.log('After firebase function.');
        this.props.history.push('/');
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const $form= document.querySelector('form');
        const username= $form.querySelectorAll('input')[0].value;
        const password = $form.querySelectorAll('input')[1].value;
        const passwordCheck = $form.querySelectorAll('input')[2].value;
        const email =  $form.querySelectorAll('input')[3].value;
        const user = formValidator({username, password, passwordCheck, email});
        
        if(user.error){
            this.setState(() => ({error: user.error}));
        }else{
            this.setState(() => ({error: user.error}));
            await this.props.startSignUpUser(user);
        }

        if(this.props.Authenticated){
            this.props.history.push('/');
        }
    }
    
    render() {
        return (
            <div className="signup">
                {this.state.error && <h3 className="signup__error">{this.state.error}</h3>}
                <form className="signup__container" onSubmit={this.onSubmit}>
                    <input  className="signup__form__input" type="text" 
                    placeholder="Username"/>
                    <input className="signup__form__input" type="password"
                    placeholder="Password"/>
                    <input className="signup__form__input" type="password"
                    placeholder="Retype Password"/>
                    <input className="signup__form__input"
                    type="text" placeholder="Email"/>
                    <div >
                        <button className="signup__form__button" 
                        >Sign Up</button>
                    </div>
                </form>
                    <div className="login__buttons">
                        <button className="signup__form__button"
                        onClick={() => {
                            // if(props.Authenticated){
                                this.handleSignIn();
                            // }
                            }}>Log In with Google</button>
                        <button className="signup__form__button login__buttons--login"
                        onClick={() => {this.props.history.push('/log-in')}}>Log In</button>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Authenticated: !!state.firebaseAuthUser.uid || !!state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: () => dispatch(startLogin()),
        login: (uid) => dispatch(login(uid)),
        startSignUpUser: (userData) => dispatch(startSignUpUser(userData))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);