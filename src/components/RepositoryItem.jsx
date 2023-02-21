import { Text, View } from 'react-native';

const RespositoryItem = ({ repository }) => (
  <View>
    {Object.entries(repository).map(([key, value]) =>
      key === 'id' ? null : <Text key={key}>{`${key}: ${value}`}</Text>
    )}
  </View>
);
export default RespositoryItem;
