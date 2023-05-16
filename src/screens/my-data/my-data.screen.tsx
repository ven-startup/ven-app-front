import {GraphQLQuery} from '@aws-amplify/api';
import {API} from 'aws-amplify';
import dayjs from 'dayjs';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import DialogComponent from '../../components/dialog.component';
import ErrorComponent from '../../components/error.component';
import NavigationComponent from '../../components/navigation.component';
import SelectElementComponent from '../../components/select-element.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TextComponent from '../../components/text.component';
import TitleComponent from '../../components/title.component';
import {Gender} from '../../contexts/user.context';
import {updateUserPersonalInformationMutation} from '../../graphql/user/mutations.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';
import {setApp} from '../../store/slices/app.slice';
import {setUser} from '../../store/slices/user.slice';
import {RootState} from '../../store/store';
import female from './../../../assets/images/female.png';
import male from './../../../assets/images/male.png';

const MyDataScreen = ({navigation, route}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const isUpdateFlow = route?.params?.isUpdateFlow;
  const dispatch = useDispatch();
  // declared for birthday
  const [datePickerSelected, setDatePickerSelected] = React.useState(
    dayjs().subtract(18, 'year').toDate(),
  );
  const [birthday, setBirthday] = React.useState('');
  const [errorMessageBirthday, setErrorMessageBirthday] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);

  // declared for gender
  const genders = [
    {id: Gender.FEMALE, image: female},
    {id: Gender.MALE, image: male},
  ];
  const [gender, setGender] = React.useState('');
  const [errorMessageGender, setErrorMessageGender] = React.useState('');

  // declared for dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const onPressBackButton = () => {
    if (isUpdateFlow) {
      if (isValidateBirthday(birthday) && isValidateGender(gender)) {
        user.birthday = birthday;
        user.gender = gender;
        dispatch(setUser(user));
        setIsDialogOpen(true);
      } else {
        navigation.navigate('Home');
      }
    } else {
      navigation.navigate('Nickname');
    }
  };
  const onPressNextButton = () => {
    if (isValidateBirthday(birthday) && isValidateGender(gender)) {
      user.birthday = birthday;
      user.gender = gender;
      dispatch(setUser(user));
      setIsDialogOpen(true);
    }
  };

  // Functions for Birthday
  const onChangeBirthday = (birthdayPickedDate: Date) => {
    const newBirthdayDate = dayjs(birthdayPickedDate);
    const newBirthday = newBirthdayDate.format('DD/MM/YYYY');
    isValidateBirthday(newBirthday);
    setBirthday(newBirthday);
    setDatePickerSelected(birthdayPickedDate);
    hideDatePicker();
  };
  const isValidateBirthday = (newBirthday: string) => {
    const validated = true;
    setErrorMessageBirthday('');
    if (newBirthday === '') {
      setErrorMessageBirthday('Debes completar tu fecha de nacimiento');
      return false;
    }
    return validated;
  };
  const openDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Functions for Gender
  const onChangeGender = (index: number) => {
    isValidateGender(genders[index].id);
    setGender(genders[index].id);
  };
  const isValidateGender = (newGender: string) => {
    const validated = true;
    setErrorMessageGender('');
    if (!newGender || newGender === '') {
      setErrorMessageGender('Debes seleccionar tu sexo');
      return false;
    }
    return validated;
  };

  // Functions for dialog
  const createDialog = () => {
    return `Hola ${
      user.nickname
    }, registraste tu fecha de nacimiento el ${birthday} y el sexo ${
      gender === Gender.MALE ? 'masculino' : 'femenino'
    }. Recuerda que si finalizas tu registro no podrás editar ni tu fecha de nacimiento y genero pasado los 6 meses! `;
  };

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
        <StepComponent total={4} actualStep={2} style={styles.step} />
      )}
      <TitleComponent text="Mis Datos" style={styles.title} />
      <SubtitleComponent
        text="Estos datos no podrán ser modificados en 6 meses.&#10;Revísalos bien!"
        style={styles.subtitle}
      />
      <TextInputComponent
        value={birthday}
        placeholder="Fecha de Nacimiento"
        style={styles.textInput}
        editable={false}
        image={calendar}
        onPressIn={openDatePicker}
      />
      <DateTimePickerModal
        date={datePickerSelected}
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={dayjs().subtract(130, 'year').toDate()}
        maximumDate={dayjs().subtract(18, 'year').toDate()}
        onConfirm={onChangeBirthday}
        onCancel={hideDatePicker}
      />
      <ErrorComponent
        text={errorMessageBirthday}
        style={styles.errorMessageBirthday}
      />
      <TextComponent text="Sexo" style={styles.titleGender} />
      <SelectElementComponent
        elements={genders}
        onPress={onChangeGender}
        style={styles.selectedElementGender}
      />
      <ErrorComponent text={errorMessageGender} />
      {isDialogOpen && (
        <DialogComponent
          cancelAction={() => {
            setIsDialogOpen(false);
          }}
          acceptAction={async () => {
            if (isUpdateFlow) {
              try {
                dispatch(setApp({isLoading: true}));
                await API.graphql<GraphQLQuery<Operation>>(
                  updateUserPersonalInformationMutation({birthday, gender}),
                );
                dispatch(setUser(user));
                navigation.navigate('Home');
              } catch (error) {
                console.error(error);
              } finally {
                dispatch(setApp({isLoading: false}));
              }
            } else {
              navigation.navigate('Avatar');
            }
            setIsDialogOpen(false);
          }}
          message={createDialog()}
        />
      )}
    </SafeAreaView>
  );
};

export default MyDataScreen;

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
    marginBottom: 78,
  },
  subtitle: {
    marginBottom: 78,
  },
  textInput: {
    marginBottom: 10,
  },
  errorMessageBirthday: {
    marginBottom: 15,
  },
  titleGender: {
    marginBottom: 10,
  },
  selectedElementGender: {
    marginBottom: 10,
  },
});
