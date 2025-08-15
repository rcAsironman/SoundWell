import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Text  from '../components/Text';

function ModalGender({
    isVisible,
    setIsVisible,
    selectedGender,
    onConfirm
}: {
    isVisible: boolean,
    setIsVisible: (val: boolean) => void,
    selectedGender: string,
    onConfirm: (val: string) => void
}) {
    const [gender, setGender] = useState(selectedGender);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Modal isVisible={isVisible} coverScreen={false}>
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                }}
            >
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                </Picker>

            </View>
            <TouchableOpacity
                className='
                bg-soundWell-primary
                py-3 px-5 
                rounded-[10px] 
                items-center 
                mt-[30px]
                md:py-5
                '
                onPress={() => onConfirm(gender)}>
                <Text className="text-white font-bold text-base md:text-2xl"
                >Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className='
                items-center 
                mt-[30px]
                '
                onPress={toggleModal}>
                <Text className="text-white font-bold text-base md:text-2xl">Cancel</Text>
            </TouchableOpacity>
        </Modal>
    );




}


const PersonalInfo = () => {

    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState('Female');
    const [isModalVisible, setModalVisible] = useState(false);


    const handleGenderSelection = (selectedGender: string) => {

        setGender(selectedGender);
        setModalVisible(false);
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            className='bg-soundWell-primary'
        >
            <>
                <View
                    style={{
                        flex: 1,
                        paddingTop: paddingTop,
                        padding: 16,

                    }}>
                    <ScrollView>
                        <View className='flex-row items-center justify-between md:mt-[80px]'>
                            <View>
                                <Text
                                    className='
                                text-white 
                                text-xl 
                                font-semibold 
                                mt-[5px] 
                                md:text-4xl'>
                                    Please fill in your personal
                                </Text>
                                <Text
                                    className='
                                text-white 
                                text-xl 
                                font-semibold 
                                mt-[5px] 
                                md:text-4xl'>
                                    information to get started.
                                </Text>
                            </View>

                            <Image
                                source={require("../../assets/logo.png")}
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        <View
                            className='
                   mt-20
                   '
                        >
                            <Text className='
                    text-xl
                    font-semibold
                     md:text-2xl
                    '>Date Of Birth</Text>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                className='
                    bg-white 
                    py-4 
                    px-2 
                    rounded-lg 
                    mt-4 
                    
                    '
                            >
                                <Text
                                    className='
                        font-regular
                        ml-4
                         md:text-2xl
                        '
                                >{date.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode='date'
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <Text
                                className='
                    text-xl
                    font-semibold
                    mt-8

                    md:mt-14
                     md:text-2xl
                    '
                            >
                                Gender
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                className='
                    bg-white 
                    py-4 
                    px-2 
                    rounded-lg 
                    mt-4 
                
                    '
                            >
                                <View className='flex-row justify-between items-center'>
                                    <Text
                                        className='
                        font-regular
                        ml-4
                        md:text-2xl
                        '
                                    >{gender}</Text>
                                    <FontAwesomeIcon icon={faCaretDown} size={20} />
                                </View>
                            </TouchableOpacity>


                        </View>
                        <TouchableOpacity
                            className='
                            bg-black 
                            py-3 
                            px-[20px] 
                            rounded-[10px] 
                            items-center 
                            mt-[80px]
                            
                            '
                            onPress={() => { }}>
                            <Text 
                            className='
                            text-white 
                            font-bold 
                            text-xl
                            md:text-2xl
                            '
                           >
                            Proceed
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>

                </View>
                <ModalGender
                    isVisible={isModalVisible}
                    setIsVisible={setModalVisible}
                    selectedGender={gender}
                    onConfirm={handleGenderSelection}
                />
            </>
        </KeyboardAvoidingView>
    )
}

export default PersonalInfo