import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchCamera} from 'react-native-image-picker';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import faceRecognition from '../../../assets/images/face-recognition.png';
import remove from '../../../assets/images/remove.png';
import ErrorComponent from '../../components/error.component';
import FloatButtonComponent from '../../components/float-button.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TitleComponent from '../../components/title.component';
import {setApp} from '../../store/slices/app.slice';
import {RootState} from '../../store/store';
import avatarUtil from '../../utils/avatar.util';
import {API_AVATAR} from '../../utils/constants.util';

const AvatarScreen = ({navigation, route}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const isUpdateFlow = route?.params?.isUpdateFlow;
  const setUriAvatarHome = route?.params?.setUriAvatar;
  const dispatch = useDispatch();
  // declared for camera
  const [uriAvatar, setUriAvatar] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const onPressBackButton = () => {
    if (isUpdateFlow) {
      if (uriAvatar) {
        setUriAvatarHome(uriAvatar);
      }
      navigation.navigate('Home');
    } else {
      navigation.navigate('MyData');
    }
  };
  const onPressNextButton = () => {
    if (uriAvatar) {
      navigation.navigate('TopicsToTalk');
    } else {
      setErrorMessage('Es necesario crear un nuevo avatar!');
    }
  };

  // Functions for Photo
  const takePhoto = async () => {
    console.info('Take Photo');
    setErrorMessage('');
    try {
      await validatePermissionsCamera();
      dispatch(setApp({isLoading: true}));
      const photo = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        cameraType: 'back',
        includeBase64: true,
        includeExtra: false,
      });
      if (photo?.assets?.[0]?.base64) {
        await sendPictureToAPI(photo?.assets?.[0].base64 as string);
        setUriAvatar(
          avatarUtil.generateAvatarImageUrlWithPreventCache(
            user.user as string,
          ),
        );
      } else if (photo.errorCode) {
        setErrorMessage('Necesitamos permisos a tu camara!');
        openSettings().catch(() => console.error('Cannot open settings'));
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

  const validatePermissionsCamera = async () => {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result !== RESULTS.GRANTED) {
      await request(PERMISSIONS.ANDROID.CAMERA);
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
  };

  const removeAvatar = () => {
    setUriAvatar(null);
  };

  React.useEffect(() => {
    validatePermissionsCamera();
  }, []);
  return (
    <SafeAreaView style={styles.myDataContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={isUpdateFlow ? null : onPressNextButton}
        style={styles.navigation}
      />
      {isUpdateFlow ? (
        <View style={styles.spaceVertical} />
      ) : (
        <StepComponent total={4} actualStep={3} style={styles.step} />
      )}
      <TitleComponent text="Avatar" style={styles.title} />
      <SubtitleComponent
        text="Tomate una foto para crear tu propio avatar!"
        style={styles.subtitle}
      />
      {!uriAvatar && (
        <TouchableOpacity
          style={styles.faceRecognitionContainer}
          onPress={takePhoto}>
          <Image source={faceRecognition} style={styles.faceRecognition} />
        </TouchableOpacity>
      )}
      {uriAvatar && (
        <FastImage
          style={styles.avatar}
          source={{
            uri: uriAvatar as string,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      {uriAvatar && (
        <FloatButtonComponent
          icon={remove}
          styles={styles.remove}
          onPress={removeAvatar}
        />
      )}
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
  spaceVertical: {
    height: 52,
  },
  title: {
    marginBottom: 21,
  },
  subtitle: {
    marginBottom: 0,
  },
  faceRecognitionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceRecognition: {
    height: 100,
    width: 100,
  },
  avatar: {
    flex: 1,
    marginBottom: 27,
  },
  remove: {
    backgroundColor: 'white',
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
