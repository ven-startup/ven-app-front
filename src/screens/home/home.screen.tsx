import {Auth} from 'aws-amplify';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import female from '../../../assets/images/female.png';
import male from '../../../assets/images/male.png';
import off from '../../../assets/images/off.png';
import ButtonComponent from '../../components/button.component';
import ListOfElementsComponent from '../../components/list-of-elements.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextComponent from '../../components/text.component';
import {Gender, UserContext} from '../../contexts/user.context';
import edit from '../../../assets/images/edit.png';

const HomeScreen = ({navigation}: any) => {
  const context = React.useContext(UserContext);
  const [userContext, setUserContext] = React.useState(context);

  const validatedAvatarForGender = () => {
    return userContext.user.gender === Gender.MALE ? male : female;
  };
  const calculateYear = () => {
    dayjs.extend(customParseFormat);
    const birthday = dayjs(userContext.user.birthday, 'DD/MM/YYYY');
    const age = dayjs().diff(birthday, 'year');
    return age + ' años';
  };

  React.useEffect(() => {
    console.log('context', userContext);
    setUserContext(userContext);
  }, [navigation, userContext]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.offButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            Auth.signOut();
          }}>
          <Image style={styles.offButton} source={off} />
        </TouchableOpacity>
      </View>
      <Image style={styles.avatar} source={validatedAvatarForGender()} />
      <SubtitleComponent
        style={styles.nickname}
        text={userContext.user.nickname}
        icon={edit}
        onPress={() => {
          navigation.navigate('Nickname', {isUpdateFlow: true});
        }}
      />
      <TextComponent style={styles.age} text={calculateYear()} />
      <View style={styles.topicsToTalkContainer}>
        <SubtitleComponent
          style={styles.topicsToTalkSubTitle}
          text={'Puedo hablar de ...'}
        />
      </View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('TopicsToListen');
        }}>
        <View>
          <Text>Conversar</Text>
        </View>
      </TouchableHighlight>
      <ListOfElementsComponent
        styles={{}}
        elements={userContext.user.topicsToTalk as string[]}
      />
      <ButtonComponent
        styles={styles.talkButton}
        onPress={() => {
          navigation.navigate('TopicsToListen');
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  offButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  offButton: {
    width: 32,
    height: 32,
  },
  avatar: {
    marginBottom: 5,
  },
  nickname: {
    marginBottom: 1,
    textDecorationLine: 'underline',
  },
  age: {
    fontSize: 12,
    marginBottom: 25,
  },
  topicsToTalkContainer: {},
  topicsToTalkSubTitle: {
    textDecorationLine: 'underline',
  },
  talkButton: {},
});
