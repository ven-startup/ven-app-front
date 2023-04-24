import dayjs from 'dayjs';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import calendar from '../../../assets/images/calendar.png';
import ErrorComponent from '../../components/error.component';
import NavigationComponent from '../../components/navigation.component';
import SelectElementComponent from '../../components/select-element.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TextComponent from '../../components/text.component';
import TitleComponent from '../../components/title.component';
import {Gender} from '../../contexts/user.context';
import female from './../../../assets/images/female.png';
import male from './../../../assets/images/male.png';
import {setUser} from '../../store/slices/user.slice';
import {RootState} from '../../store/store';

const MyDataScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  // declared for birthday
  const [datePickerSelected, setDatePickerSelected] = React.useState(
    dayjs().subtract(13, 'year').toDate(),
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

  const onPressBackButton = () => {
    navigation.navigate('Nickname');
  };
  const onPressNextButton = () => {
    if (isValidateBirthday(birthday) && isValidateGender(gender)) {
      user.birthday = birthday;
      user.gender = gender;
      dispatch(setUser(user));
      navigation.navigate('TopicsToTalk');
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

  return (
    <SafeAreaView style={styles.myDataContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
        style={styles.navigation}
      />
      <StepComponent total={3} actualStep={2} style={styles.step} />
      <TitleComponent text="Mis Datos" style={styles.title} />
      <SubtitleComponent
        text="Estos datos no podrán ser modificados nunca.&#10;Revísalos bien!"
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
        minimumDate={dayjs().subtract(100, 'year').toDate()}
        maximumDate={dayjs().subtract(13, 'year').toDate()}
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
