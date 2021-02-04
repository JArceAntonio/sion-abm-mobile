import React from 'react';
import {Container, Header, Left, Body, Right, Content, Title, Button, Icon, Fab} from 'native-base';

const Layout = ({children, backMode=true, navigation, showAddButton=true}) => {
  return (
    <Container>
      <Header>
        {
          backMode ?
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            :
            <Left/>
        }
        <Body>
          <Title>ABM Personas</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>{children}</Content>
      {
        showAddButton && <Fab primary position="bottomRight" onPress={() => navigation.navigate('CreateForm')}>
          <Icon name={'ios-add'}/>
        </Fab>
      }
    </Container>
  );
};

export default Layout;
