import * as Linking from 'expo-linking';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import formatInThousands from '../utils/formatInThousands';
import Button from './Button';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const CountItem = ({ label, count }) => (
  <View style={styles.countItem}>
    <Text style={styles.countItemCount} fontWeight="bold">
      {formatInThousands(count)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showOpenLink }) => {
  const navigate = useNavigate();

  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  return (
    <View style={styles.container} testID="repositoryItem">
      <Pressable onPress={() => navigate(`${id}`)}>
        <View style={styles.topContainer}>
          <View style={styles.avatarContainer}>
            {/* <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} /> */}
            <Text source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={styles.nameText}
              fontWeight="bold"
              fontSize="subheading"
              numberOfLines={1}
            >
              {fullName}
            </Text>
            <Text style={styles.descriptionText} color="textSecondary">
              {description}
            </Text>
            {language ? (
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
      <View style={styles.bottomContainer}>
        <CountItem count={stargazersCount} label="Stars" />
        <CountItem count={forksCount} label="Forks" />
        <CountItem count={reviewCount} label="Reviews" />
        <CountItem count={ratingAverage} label="Rating" />
      </View>
      <View style={{ display: showOpenLink ? 'flex' : 'none' }}>
        <Button onPress={() => Linking.openURL(url)}>Open in GitHub</Button>
      </View>
    </View>
  );
};

export default RepositoryItem;
