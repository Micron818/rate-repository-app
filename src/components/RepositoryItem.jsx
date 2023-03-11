import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemScore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  description: {
    maxWidth: 300,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

const SubHeadText = ({ ...props }) => (
  <Text fontSize="subheading" fontWeight="bold" {...props} />
);

const LanguageText = ({ ...props }) => (
  <Text
    color="white"
    backgroundColor="primary"
    style={{ maxWidth: 80 }}
    {...props}
  />
);

const RespositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = repository;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image style={styles.ownerAvatar} source={{ uri: ownerAvatarUrl }} />
        <View>
          <SubHeadText>{fullName}</SubHeadText>
          <View style={styles.description}>
            <Text>{description}</Text>
          </View>
          <LanguageText>{language}</LanguageText>
        </View>
      </View>
      <View style={styles.itemScore}>
        <View>
          <SubHeadText>{`${(stargazersCount / 1000).toFixed(1)}K`}</SubHeadText>
          <Text>Stars</Text>
        </View>
        <View>
          <SubHeadText>{`${(forksCount / 1000).toFixed()}K`}</SubHeadText>
          <Text>Forks</Text>
        </View>
        <View>
          <SubHeadText>{reviewCount}</SubHeadText>
          <Text>Reviews</Text>
        </View>
        <View>
          <SubHeadText>{ratingAverage}</SubHeadText>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};
export default RespositoryItem;
