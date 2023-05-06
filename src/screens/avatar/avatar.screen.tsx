import * as React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchCamera} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ErrorComponent from '../../components/error.component';
import FloatButtonComponent from '../../components/float-button.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TitleComponent from '../../components/title.component';
import {setApp} from '../../store/slices/app.slice';
import {RootState} from '../../store/store';
import {
  API_AVATAR,
  URL_AVATAR_IMAGE,
  URL_AVATAR_IMAGE_DEFAULT,
} from '../../utils/constants.util';

const AvatarScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  // declared for camera
  const [isGenerateAvatar, setIsGenerateAvatar] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const onPressBackButton = () => {
    navigation.navigate('MyData');
  };
  const onPressNextButton = () => {
    if (isGenerateAvatar) {
      navigation.navigate('TopicsToTalk');
    } else {
      setErrorMessage('Es necesario crear un nuevo avatar!');
    }
  };

  // Functions for Photo
  const takePhoto = async () => {
    console.info('Take Photo');
    try {
      dispatch(setApp({isLoading: true}));
      const photo = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        cameraType: 'front',
        includeBase64: true,
        includeExtra: false,
      });
      if (!photo.didCancel) {
        await sendPictureToAPI(photo?.assets?.[0].base64 as string);
      }
    } catch (error) {
      setErrorMessage(
        'Es necesario que tu rostro se vea claramente, vuelve a intentar tomar otra foto!',
      );
      console.error(error);
    } finally {
      dispatch(setApp({isLoading: false}));
    }
  };

  const sendPictureToAPI = async (base64: string) => {
    console.info('Call API to generate avatar');
    const response = await fetch(API_AVATAR as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user: user.user as string,
      },
      body: JSON.stringify({base64}),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    await response.json();
    setIsGenerateAvatar(true);
    setErrorMessage(
      'Ya tienes tu propio avatar tomate otra foto si lo necesitas!',
    );
  };

  return (
    <SafeAreaView style={styles.myDataContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
        style={styles.navigation}
      />
      <StepComponent total={4} actualStep={3} style={styles.step} />
      <TitleComponent text="Avatar" style={styles.title} />
      <SubtitleComponent
        text="Tomate una foto para crear tu propio avatar!"
        style={styles.subtitle}
      />
      {!isGenerateAvatar && (
        <FastImage
          style={styles.avatar}
          source={{
            uri: `${URL_AVATAR_IMAGE_DEFAULT}${user.gender}.png`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      {isGenerateAvatar && (
        <FastImage
          style={styles.avatar}
          source={{
            uri: `${URL_AVATAR_IMAGE}${user.user}.png`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      <FloatButtonComponent styles={styles.takePhoto} onPress={takePhoto} />
      <ErrorComponent text={errorMessage} />
    </SafeAreaView>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  myDataContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  navigation: {
    marginBottom: 12,
  },
  step: {
    marginBottom: 27,
  },
  title: {
    marginBottom: 21,
  },
  subtitle: {
    marginBottom: 0,
  },
  avatar: {flex: 1, maxHeight: '45%', marginBottom: 27},
  takePhoto: {
    backgroundColor: '#FF0000',
    position: 'absolute',
    bottom: 25,
    elevation: 5,
    alignSelf: 'center',
    zIndex: 2,
  },
  errorMessage: {
    marginBottom: 15,
  },
});
