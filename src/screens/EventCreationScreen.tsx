import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ScrollView, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { createEvent } from '../api/api';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
    Home: undefined;
    EventDetails: { eventId: string };
    EventCreation: undefined;
    Profile: undefined;
};

type EventCreationScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'EventCreation'>;
};

function EventCreationScreen({ navigation }: EventCreationScreenProps) {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [ticketPrice, setTicketPrice] = useState('Free');
    const [requireApproval, setRequireApproval] = useState(false);
    const [capacity, setCapacity] = useState('Unlimited');
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showCapacityModal, setShowCapacityModal] = useState(false);
    const [tempPrice, setTempPrice] = useState('');
    const [tempCapacity, setTempCapacity] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleCreateEvent = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const eventData = {
                title: eventName,
                startDate,
                endDate,
                location,
                description,
                ticketPrice: ticketPrice === 'Free' ? 0 : parseFloat(ticketPrice),
                requireApproval,
                capacity: capacity === 'Unlimited' ? null : parseInt(capacity),
                image,
            };
            await createEvent(eventData);
            navigation.goBack();
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error (show alert, etc.)
        }
    };

    const validateForm = () => {
        // Add form validation logic here
        return true;
    };

    const renderPriceModal = () => (
        <Modal
            visible={showPriceModal}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter Ticket Price</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={tempPrice}
                        onChangeText={setTempPrice}
                        keyboardType="numeric"
                        placeholder="Enter price or 'Free'"
                        placeholderTextColor="#999999"
                    />
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setTicketPrice(tempPrice || 'Free');
                            setShowPriceModal(false);
                        }}
                    >
                        <Text style={styles.modalButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderCapacityModal = () => (
        <Modal
            visible={showCapacityModal}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter Capacity</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={tempCapacity}
                        onChangeText={setTempCapacity}
                        keyboardType="numeric"
                        placeholder="Enter capacity or 'Unlimited'"
                        placeholderTextColor="#999999"
                    />
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setCapacity(tempCapacity || 'Unlimited');
                            setShowCapacityModal(false);
                        }}
                    >
                        <Text style={styles.modalButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                ) : (
                    <Ionicons name="add-circle-outline" size={50} color="#F0F0F0" />
                )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={24} color="#F0F0F0" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                    placeholderTextColor="#999999"
                />
            </View>
            <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Start</Text>
                    <DateTimePicker
                        value={startDate}
                        mode="datetime"
                        display="default"
                        onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
                        textColor="#F0F0F0"
                        style={styles.datePicker}
                    />
                </View>
                <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>End</Text>
                    <DateTimePicker
                        value={endDate}
                        mode="datetime"
                        display="default"
                        onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
                        textColor="#F0F0F0"
                        style={styles.datePicker}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={24} color="#F0F0F0" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Add Event Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#999999"
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="document-text-outline" size={24} color="#F0F0F0" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Add Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholderTextColor="#999999"
                />
            </View>
            <Text style={styles.sectionTitle}>Event Options</Text>
            <View style={styles.optionContainer}>
                <View style={styles.optionItem}>
                    <Ionicons name="ticket-outline" size={24} color="#F0F0F0" />
                    <Text style={styles.optionLabel}>Tickets</Text>
                </View>
                <TouchableOpacity onPress={() => setShowPriceModal(true)}>
                    <Text style={styles.optionValue}>{ticketPrice}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
                <View style={styles.optionItem}>
                    <Ionicons name="shield-checkmark-outline" size={24} color="#F0F0F0" />
                    <Text style={styles.optionLabel}>Require Approval</Text>
                </View>
                <Switch
                    value={requireApproval}
                    onValueChange={setRequireApproval}
                    trackColor={{ false: "#767577", true: "#4A7043" }}
                    thumbColor={requireApproval ? "#F0F0F0" : "#F4F3F4"}
                />
            </View>
            <View style={styles.optionContainer}>
                <View style={styles.optionItem}>
                    <Ionicons name="people-outline" size={24} color="#F0F0F0" />
                    <Text style={styles.optionLabel}>Capacity</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCapacityModal(true)}>
                    <Text style={styles.optionValue}>{capacity}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
            {renderPriceModal()}
            {renderCapacityModal()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2E4C2D',
    },
    imageUpload: {
        width: '100%',
        height: 200,
        backgroundColor: '#4A7043',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A7043',
        borderRadius: 10,
        marginBottom: 15,
        padding: 5,
    },
    inputIcon: {
        marginRight: 10,
        marginLeft: 5,
    },
    input: {
        flex: 1,
        color: '#F0F0F0',
        padding: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateItem: {
        flex: 1,
        backgroundColor: '#4A7043',
        borderRadius: 10,
        padding: 10,
        marginRight: 5,
    },
    dateLabel: {
        color: '#F0F0F0',
        marginBottom: 5,
    },
    datePicker: {
        backgroundColor: '#4A7043',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    sectionTitle: {
        color: '#F0F0F0',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4A7043',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionLabel: {
        color: '#F0F0F0',
        marginLeft: 10,
    },
    optionValue: {
        color: '#F0F0F0',
    },
    createButton: {
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    createButtonText: {
        color: '#2E4C2D',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#4A7043',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#F0F0F0',
    },
    modalInput: {
        backgroundColor: '#2E4C2D',
        color: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#2E4C2D',
        fontWeight: 'bold',
    },
});

export default EventCreationScreen;