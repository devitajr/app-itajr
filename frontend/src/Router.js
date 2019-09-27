import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { StyleSheet, StatusBar } from 'react-native';

const style = StyleSheet.create({
    navBarStyle: {
      top: StatusBar.currentHeight
    },
    titleStyle: {
      flexDirection: 'row',
      width: 200
    }
  });

const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Entrar"
            key="login"
            component={Login}
            initial
          />
          <Scene
            title="Me inscrever"
            key="register"
            component={Register}
          />  
        </Stack>
        <Stack
          key="main"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Home"
            key="home"
            component={Home}
            initial
          />
        </Stack>
      </Stack>
    </Router>
  );
};


export default RouterComponent;