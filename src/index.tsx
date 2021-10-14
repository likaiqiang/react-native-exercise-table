import React from 'react';
import Tabel from './Table';
import {Text} from 'react-native';

const Page: React.FC = () => {
  const head = [<Text>姓名</Text>, <Text>年齡</Text>, <Text>性別</Text>];
  const body = [
    [<Text>foo</Text>, <Text>20</Text>, <Text>1</Text>],
    [<Text>bar</Text>, <Text>10</Text>, <Text>2</Text>],
  ];
  return (
    <Tabel
      head={head}
      body={body}
      headViewStyle={[{width: 100}, {width: 100}, {flex: 1}]}
      containerStyle={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0.1)',
      }}
    />
  );
};

export default Page;
