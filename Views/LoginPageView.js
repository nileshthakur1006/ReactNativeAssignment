import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import screens from '../Components';
import {loginAction, updateToken, updateUser} from '../Redux/Actions/appAction';
import CustomLoader from '../Components/CustomLoader';
import {getToken, getUser} from '../Components/storage';
import {StackActions} from '@react-navigation/native';

import {setAuthToken} from '../Services/AxiosAPICalling';

const LoginPageView = props => {
  const [email, setEmail] = useState('dasdasd@gmail.com');
  const [password, setPassword] = useState('dsfafsdfsd');
  const {isLoading, screen} = useSelector(state => state?.loaderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(userObject => {
      if (!!userObject) {
        getToken(access_token => {
          setAuthToken(access_token);

          dispatch(updateToken(access_token));
        });
        dispatch(updateUser(userObject));
        props?.navigation?.dispatch(StackActions.replace(screens.app));
      }
    });
  }, []);

  btnLoginClick = () => {
    const params = {user: {email: email, password: password}};
    dispatch(
      loginAction(params, () => {
        props?.navigation?.dispatch(StackActions.replace(screens.app));
      }),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        testId="Email"
        style={styles.inputBox}
        placeholder="Enyer Your Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        estId="Password"
        style={styles.inputBox}
        placeholder="Enter Your Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login Now" onPress={btnLoginClick} />
      {screen === screens.auth && isLoading ? <CustomLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputBox: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginPageView;
